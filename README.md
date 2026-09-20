## StableShield (EN)

Your Lira fluctuates, your value shouldn't.
StableShield is a wallet application that converts Turkish Lira into USDC within seconds on the Stellar network, protecting it against exchange rate volatility — with no crypto knowledge required. The user deposits TRY, their funds are automatically converted into a stable asset, and they can withdraw back to TRY at any time.

This project was built as part of the Rise In x Stellar Pro Hackathon 2026 (Istanbul, September 19-20, 2026), for the Genesis Track.

## Problem:
The Turkish Lira can lose value on a daily basis, yet for the average user the only way to protect against this is opening an account on a crypto exchange, going through KYC, and dealing with token management. For most people, this is an unnecessary technical barrier.

## Solution:
StableShield removes this barrier: the user simply connects their wallet and deposits TRY, and thanks to the anchor + Stellar flow running in the background, their money is converted into a stable asset. No exchange account, no separate registration system, and no database are needed — the user's identity is their own wallet address, and their history lives directly on the Stellar ledger.

## How It Works
Deposit — Connect your wallet, send your TRY. Within seconds your balance converts into a stablecoin. Protect — Your money is no longer affected by exchange rate fluctuations. It stays right where it is, whenever you want it. Withdraw — Convert back to TRY with a single click, whenever you want, straight to your account.

## Tech Stack

-> Frontend React + TypeScript + Vite 
-> Styling Tailwind CSS (with custom design tokens) 
-> Wallet Connection Stellar Wallets Kit (Freighter support) 
-> On-chain Data Stellar Horizon API 
-> Fiat Rail A SEP-24 compliant TRY anchor 
-> Network Stellar Testnet 
-> Deploy Vercel

Why there's no database: The user's balance and transaction history live directly on the Stellar ledger. The application only reads and displays this data via the Horizon API — there's no need to build a separate user account/login system, since the wallet address itself serves as the identity.

## Architecture
[User Interface — React]
        │
        ├─► Stellar Wallets Kit ──► Freighter wallet connection, transaction signing
        │
        ├─► Horizon API ──► balance reading, transaction history reading
        │
        └─► Anchor (SEP-24) ──► TRY → stablecoin (deposit)
                              ──► stablecoin → TRY (withdraw)
## Setup:
bash
git clone https://github.com/beratvarlik/stellar-stableshield-hackathon-project.git
cd stellar-stableshield-hackathon-project
npm install
npm run dev

To test the application, you'll need the Freighter browser extension installed and set to the Testnet network.

## Environment Variables
VITE_ANCHOR_URL=<the SEP-24 endpoint of the anchor being used>
VITE_HORIZON_URL=https://horizon-testnet.stellar.org
VITE_NETWORK_PASSPHRASE=Test SDF Network ; September 2015

## Getting Testnet Assets

XLM: Freighter's "Fund with Friendbot" feature, or Stellar Lab Fund USDC: Circle Testnet Faucet TRY: Not an actual on-chain asset; it is simulated through the sandbox/test mode of the anchor being used.

## Known Limitations (Honest Status)

This is a hackathon prototype, and the following points have been deliberately left limited:

-> Testnet only: The application has not been tested to work on mainnet; balance reading and the anchor flow are configured to work consistently on testnet. -> Withdraw flow partially simulated: While the deposit flow is connected to the real SEP-24 interactive flow, the withdraw side currently works via an optimistic update (an instant UI update, without waiting for on-chain confirmation in the background). Full SEP-24 withdraw integration needs to be completed before moving to production. 
-> Transaction history partially local: The "Recent Transactions" list is currently fed from in-app state; pulling the full history from Horizon's /accounts/{id}/payments endpoint is a separate scope of work. -> The "value protected" ratio against TRY is shown as a static example metric; it is not yet connected to a live exchange rate history (oracle/API). 
-> Single-anchor dependency: Currently supports only one TRY anchor; there's no routing between different anchors.

## Roadmap to a Real Product

-> Moving to a production environment through a licensed anchor/exchange partnership (in Turkey, foreign exchange/crypto services require MASAK registration; StableShield will operate through an existing licensed anchor rather than running money transfers on its own). 
-> Completing the withdraw flow with full SEP-24 integration. 
-> Making the "value protected" metric live with real-time TRY/USD exchange rate history. 
-> Evaluating a DeFindex vault integration for a yield layer (within the scope of an SCF/InstAward application). 
-> Security audit (clarifying the custodial/non-custodial architecture decision).

## Skill Files Used

Stellar's official anchor documentation for SEP-24 Anchor integration (skills.stellar.org — Anchors skill) Stellar Wallets Kit integration documentation

## Team
Rise In x Stellar Pro Hackathon 2026, Genesis Track — Istanbul. 
T61 - Berat Varlık, Mustafa Baha Faik

## License
This project is a prototype developed for the hackathon.
## ----------------------------------------------------------- 

## StableShield (TR)

TL dalgalanır, senin değerin dalgalanmasın.

StableShield, Türk lirasını Stellar ağı üzerinde saniyeler içinde USDC'ye çevirip kur dalgalanmasına karşı koruyan, kripto bilgisi gerektirmeyen bir cüzdan uygulamasıdır. Kullanıcı TRY yatırır, parası otomatik olarak stabil bir varlığa dönüşür, istediği an geri TRY olarak çekebilir.

Bu proje Rise In x Stellar Pro Hackathon 2026 (İstanbul, 19-20 Eylül 2026) kapsamında, Genesis Track için geliştirilmiştir.

## Problem:

Türk lirası günlük olarak değer kaybedebiliyor, ama ortalama bir kullanıcı için buna karşı korunmanın tek yolu bir kripto borsasında hesap açmak, KYC'den geçmek ve token yönetimiyle uğraşmak. Bu, çoğu insan için gereksiz bir teknik engel.

## Çözüm:

StableShield bu engeli kaldırıyor: kullanıcı sadece cüzdanını bağlıyor, TRY yatırıyor, arka planda gerçekleşen anchor + Stellar akışı sayesinde parası stabil bir varlığa dönüşüyor. Ne borsa hesabı, ne ayrı bir kayıt sistemi, ne de veritabanı gerekiyor — kullanıcının kimliği kendi cüzdan adresi, geçmişi ise doğrudan Stellar ledger'ının kendisi.

## Nasıl Çalışır?
Yatır — Cüzdanını bağla, TRY'yi gönder. Saniyeler içinde bakiyen stabilcoin'e dönüşür.
Koru — Paran artık kur dalgalanmasından etkilenmez. İstediğin an, olduğu gibi orada durur.
Çek — Ne zaman istersen tek tıkla TRY'ye çevir, hesabına geç.
## Teknoloji Yığını
Frontend	React + TypeScript + Vite
-> Stil	Tailwind CSS (özel tasarım tokenları ile)
-> Cüzdan Bağlantısı	Stellar Wallets Kit (Freighter desteği)
-> Zincir Verisi	Stellar Horizon API
-> Fiat Rail	SEP-24 uyumlu bir TRY anchor
-> Ağ	Stellar Testnet
-> Deploy	Vercel

Neden veritabanı yok: Kullanıcının bakiyesi ve işlem geçmişi doğrudan Stellar ledger'ında tutuluyor. Uygulama sadece Horizon API üzerinden bu veriyi okuyup gösteriyor — ayrı bir kullanıcı hesabı/login sistemi kurmaya gerek kalmıyor, cüzdan adresi kimliğin kendisi.

## Mimari
[Kullanıcı Arayüzü — React]
        │
        ├─► Stellar Wallets Kit ──► Freighter cüzdan bağlantısı, işlem imzalama
        │
        ├─► Horizon API ──► bakiye okuma, işlem geçmişi okuma
        │
        └─► Anchor (SEP-24) ──► TRY → stabilcoin (deposit)
                              ──► stabilcoin → TRY (withdraw) 
                              
## Kurulum:
bash
git clone https://github.com/beratvarlik/stellar-stableshield-hackathon-project.git
cd stellar-stableshield-hackathon-project
npm install
npm run dev

Uygulamayı test etmek için tarayıcınızda Freighter eklentisinin kurulu ve Testnet ağına ayarlı olması gerekir.

## Ortam Değişkenleri
VITE_ANCHOR_URL=<kullanılan anchor'ın SEP-24 endpoint'i>
VITE_HORIZON_URL=https://horizon-testnet.stellar.org
VITE_NETWORK_PASSPHRASE=Test SDF Network ; September 2015
Test İçin Testnet Varlık Alma
XLM: Freighter'ın "Fund with Friendbot" özelliği veya Stellar Lab Fund
USDC: Circle Testnet Faucet
TRY: Gerçek bir zincir varlığı değildir; kullanılan anchor'ın sandbox/test modu üzerinden simüle edilir.
Bilinen Sınırlamalar (Dürüst Durum)

## Bu bir hackathon prototipidir, aşağıdaki noktalar bilinçli olarak sınırlı bırakılmıştır:

-> Sadece Testnet: Uygulama mainnet'te çalışacak şekilde denenmemiştir; bakiye okuma ve anchor akışı testnet üzerinde tutarlı çalışacak şekilde yapılandırılmıştır.
-> Withdraw akışı kısmen simüle: Deposit akışı gerçek SEP-24 interactive flow'una bağlıyken, withdraw tarafı şu an optimistic update (arayüzde anlık güncelleme, arka planda zincir onayı beklenmeden) ile çalışıyor. Üretime geçmeden önce tam SEP-24 withdraw entegrasyonu tamamlanmalı.
-> İşlem geçmişi kısmen yerel: "Son İşlemler" listesi şu an uygulama içi state'ten besleniyor; Horizon'un /accounts/{id}/payments endpoint'inden tam geçmiş çekimi ayrı bir geliştirme kapsamında.
-> TL karşısında "korunan değer" oranı statik bir örnek metrik olarak gösteriliyor; canlı bir döviz kuru geçmişine (oracle/API) henüz bağlı değil.
Tek anchor'a bağımlılık: Şu an tek bir TRY anchor'ı destekliyor; farklı anchor'lar arasında yönlendirme yok.

## Gerçek Ürüne Dönüşüm Yol Haritası
-> Lisanslı bir anchor/borsa ortaklığıyla üretim ortamına geçiş (Türkiye'de kambiyo/kripto hizmetleri MASAK kaydı gerektirir; StableShield kendi başına para transferi işletmek yerine mevcut lisanslı bir anchor üzerinden çalışacaktır).
-> Withdraw akışının tam SEP-24 entegrasyonu ile tamamlanması.
-> Gerçek zamanlı TL/USD kur geçmişiyle "korunan değer" metriğinin canlı hale getirilmesi.
-> Getiri katmanı için DeFindex vault entegrasyonu değerlendirmesi (SCF/InstAward başvurusu kapsamında).
->Güvenlik denetimi (custodial/non-custodial mimari kararının netleştirilmesi).

## Kullanılan Skill Dosyaları
SEP-24 Anchor entegrasyonu için Stellar resmi anchor dokümantasyonu (skills.stellar.org — Anchors skill)
Stellar Wallets Kit entegrasyon dokümantasyonu

## Ekip
Rise In x Stellar Pro Hackathon 2026, Genesis Track — İstanbul.
T61 - Berat Varlık, Mustafa Baha Faik

Lisans

Bu proje hackathon kapsamında geliştirilmiş bir prototiptir.
