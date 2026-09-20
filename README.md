# StableShield — Web3 Frontend

Türk lirasını Stellar ağı üzerinde USDC'ye demirleyen, enflasyona karşı koruyan gözetimsiz sermaye kalkanı. React + TypeScript + Vite + Tailwind CSS v4 ile kodlanmıştır.

## Sayfalar

- `/` — Landing page: hero (canlı TRY→USDC hesaplayıcı), Nasıl Çalışır, Güvenlik & Kalkan, Neden StableShield, SSS (accordion), CTA.
- `/dashboard` — Kullanıcı paneli: korunan bakiye, TRY yatır / TRY'ye çek modalları, son işlemler listesi.

## Cüzdan akışı

`src/lib/network.ts` — **tek ağ yapılandırma kaynağı.** Uygulama şu an uçtan uca **Testnet** üzerinde çalışıyor: cüzdan bağlantısı, Horizon bakiye okuma ve SEP-24 deposit akışının hepsi aynı ağı (`NETWORK_PASSPHRASE`, `HORIZON_URL`, `USDC_ISSUER`) kullanır. Daha önce Horizon mainnet'e bakarken SEP-24 akışı testnet'te çalışıyordu — tamamlanan bir test yatırması hiçbir zaman görünen bakiyeye yansımıyordu; bu artık düzeltildi. Dashboard header'ında (`TopBar.tsx`) küçük bir **"Testnet"** etiketi hangi ağda çalışıldığını gösterir. Mainnet'e geçiş için tek değiştirilecek yer bu dosya (+ `sep24.ts`'teki `ANCHOR_DOMAIN`, gerçek bir mainnet anchor'a işaret etmeli).

`src/lib/stellarWalletsKit.ts` — [Stellar Wallets Kit](https://github.com/Creit-Tech/Stellar-Wallets-Kit) ile Freighter cüzdan bağlantısı. "Bağlan" gerçek `authModal()`'ı açar, kullanıcı Freighter'da izin verir, gerçek public key `WalletContext`'e akar (kit adresi kendi içinde localStorage'a da yazar, sayfa yenilense bile bağlantı korunur). Bağlı değilken `/dashboard`'a girilirse otomatik olarak `/`'e yönlendirilir.

`src/lib/horizon.ts` — bağlı cüzdanın **gerçek USDC bakiyesini** Stellar SDK (`@stellar/stellar-sdk`, `Horizon.Server`) ile `network.ts`'te tanımlı Horizon'dan çeker. Dashboard'daki TL/USDC rakamları **tek gerçeklik kaynağı** olarak bu canlı veriden türetilir — hiçbir yerel işlem bunu doğrudan değiştirmez. Okuma başarısız olursa (hesap gerçekten boşsa değil, Horizon'a ulaşılamazsa) `balanceError` set edilir ve arayüzde "Tekrar dene" seçeneğiyle gösterilir; sessizce 0 gösterip gerçek bakiyeymiş gibi davranılmaz.

`src/lib/sep24.ts` — "TRY Yatır" butonu **gerçek bir SEP-24 interactive deposit akışı** çalıştırır: `@stellar/stellar-sdk`'nın yerleşik `StellarToml.Resolver` ve `WebAuth` yardımcılarıyla anchor'ın `stellar.toml`'ünü çözer, SEP-10 challenge'ını alıp doğrular (`WebAuth.readChallengeTx`), bağlı cüzdanla (`StellarWalletsKit.signTransaction`) imzalatıp JWT alır, `/transactions/deposit/interactive`'i tetikleyip dönen URL'i yeni sekmede açar ve işlem tamamlanana kadar durumunu polling ile izler; `completed` olduğunda hem `refreshBalance()` (artık `horizon.ts` ile aynı ağda — testnet — çalıştığı için bunu gerçekten değiştirir) hem de `recordDeposit()` çağrılır, işlem tutarı (`amount_out`/`amount_in`) anchor'ın kendi yanıtından okunup "Son İşlemler"e `confirmed` olarak eklenir.

**"TRY'ye Çek" (`WithdrawModal.tsx` + `WalletContext.withdraw`)** henüz gerçek bir anchor'a bağlı değil (SEP-24 withdraw entegrasyonu ayrı bir iş), ama **optimistic update deseniyle** çalışır: onaylanan tutar bakiyeden anında düşer ve işlem "Son İşlemler"e `pending` (dönen ikon) olarak eklenir. Arka planda `fetchUsdcBalance` ile Horizon'a gerçek bir okuma isteği tekrar atılır — bu isteğin **kendisi** genuine başarısız olursa (ağ/Horizon hatası) kayıt `failed` (kırmızı, üstü çizili) olarak işaretlenir, düşürülen tutar bakiyeye geri eklenir ve dashboard'da kısa süreli bir uyarı banner'ı gösterilir; okuma başarılıysa kayıt `confirmed`'e (yeşil tik) geçer. Gerçek bir SEP-24 withdraw entegre edildiğinde tek değişmesi gereken yer `WalletContext.tsx`'teki `setTimeout` bloğu — onun yerine anchor'ın gerçek tamamlanma/başarısızlık callback'i geçecek.

İşlem geçmişi listesi ayrı olarak localStorage'da tutulan bir demo listesidir; gerçek Horizon ödeme geçmişini yansıtmaz.

## Dil (TR/EN)

`src/i18n/translations.ts` — tüm arayüz metinlerinin tek kaynağı; `Translations` tipi ile `tr` ve `en` sözlükleri aynı şekle sahip olmaya TypeScript tarafından zorlanır (biri güncellenip diğeri unutulursa derleme hatası verir). `src/context/LanguageContext.tsx` + `src/hooks/useLanguage.ts` mevcut dili (`localStorage`'da `stableshield.lang` altında kalıcı), `toggleLanguage()`'ı ve o dile ait tüm metinleri (`t`) sağlar; `document.documentElement.lang` ve sayfa başlığı da dil değişince güncellenir. Header'daki (landing) ve TopBar'daki (dashboard) küçük **TR/EN** butonu `toggleLanguage()`'ı tetikler — tek tıkla tüm arayüz (başlıklar, butonlar, SSS, hata mesajları, SEP-24 durum metinleri) diğer dile geçer.

İşlem geçmişindeki kayıt etiketleri ("USDC Koruma Kasası" vb.) metin olarak değil `labelKey` olarak saklanır ve gösterim anında güncel dile çevrilir — böylece geçmişte oluşturulmuş bir işlem de dil değiştirince doğru dilde görünür.

## Geliştirme

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build (tsc -b && vite build)
npm run lint      # oxlint
```

## Yapı

```
src/
  context/WalletContext.tsx   # cüzdan bağlantısı, canlı bakiye, işlemler
  context/LanguageContext.tsx # TR/EN dil durumu
  i18n/translations.ts        # tüm arayüz metinleri (tr + en sözlükleri)
  lib/                         # stellarWalletsKit, horizon, format, wallet yardımcıları
  components/
    shared/                   # Modal, ShieldLogo, LanguageToggle — her iki sayfada ortak
    landing/                  # Header, Hero, HowItWorks, WhySection, FAQSection, CTASection, Footer
    dashboard/                # TopBar, BalanceCard, TransactionsList, DepositModal, WithdrawModal
  pages/                      # Landing.tsx, Dashboard.tsx
```

Tasarım tokenleri (renk/tipografi/radius/spacing) `src/index.css` içindeki `@theme` bloğunda tanımlıdır — Stitch tasarımındaki `DESIGN.md` ile birebir eşlenmiştir.
