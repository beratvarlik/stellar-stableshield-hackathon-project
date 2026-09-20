export type Language = "tr" | "en";

export interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
  footerBadge: string;
}

export interface WhyMetric {
  title: string;
  subtitle: string;
  value: string;
  caption: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Translations {
  meta: {
    title: string;
    description: string;
  };
  common: {
    langToggleLabel: string;
  };
  header: {
    navHowItWorks: string;
    navSecurity: string;
    navWhy: string;
    navFaq: string;
    badgeAnchor: string;
    tagline: string;
    menuOpen: string;
    menuClose: string;
  };
  connectButton: {
    connect: string;
    connecting: string;
    goToDashboard: string;
    iconConnect: string;
    iconGoToDashboard: string;
    errorFreighterNotFound: string;
    errorModalClosed: string;
    errorRejected: string;
    errorNetwork: string;
    errorGeneric: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaLabel: string;
    feeBadge: string;
    anchorStatusLabel: string;
    anchorStatusValue: string;
    settlementLabel: string;
    settlementValue: string;
    reserveLabel: string;
    reserveValue: string;
    liveCardTitle: string;
    liveCardSubtitle: string;
    liveCardBadge: string;
    inputAmountLabel: string;
    inputAriaLabel: string;
    lockedUsdcLabel: string;
    protectionRatioLabel: string;
    protectionRatioValue: string;
    bridgeNote: string;
  };
  howItWorks: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: HowItWorksStep[];
  };
  why: {
    eyebrow: string;
    title: string;
    quote: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    ctaLabel: string;
    metricsTitle: string;
    metricsSubtitle: string;
    metrics: WhyMetric[];
    chartTitle: string;
    chartCaption: string;
    chartUnprotected: string;
    chartProtected: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Faq[];
  };
  cta: {
    title: string;
    subtitle: string;
    buttonLabel: string;
    buttonConnectedLabel: string;
  };
  footer: {
    title: string;
    description: string;
    auditBadge: string;
    copyright: string;
    contracts: string;
    networkStatus: string;
  };
  modal: {
    close: string;
  };
  dashboard: {
    footerNote: string;
  };
  topBar: {
    vaultBadge: string;
    testnetTooltip: string;
    homeAria: string;
    disconnectAria: string;
    disconnect: string;
  };
  balanceCard: {
    totalLabel: string;
    protectedLabel: string;
    unverified: string;
    balanceErrorText: string;
    retry: string;
    protectionBadge: string;
    depositButton: string;
    withdrawButton: string;
    dismissAlertAria: string;
  };
  transactions: {
    ariaLabel: string;
    title: string;
    period: string;
    empty: string;
    deposit: string;
    withdraw: string;
    failed: string;
    labels: Record<string, string>;
  };
  depositModal: {
    title: string;
    startingTitle: string;
    startingDesc: string;
    awaitingTitle: string;
    awaitingDesc: string;
    reopenTab: string;
    completedTitle: string;
    completedDesc: string;
    failedTitle: string;
    close: string;
    notConnected: string;
    genericStartError: string;
  };
  withdrawModal: {
    title: string;
    successTitle: string;
    successDesc: (amount: string) => string;
    description: string;
    amountLabel: string;
    amountAria: string;
    useAll: (amount: string) => string;
    vaultDeductLabel: string;
    submitButton: string;
    genericError: string;
  };
  walletErrors: {
    notConnected: string;
    invalidAmount: string;
    insufficientLockable: string;
    insufficientBalance: string;
    connectFailed: string;
    withdrawRolledBack: (error: string) => string;
  };
  sep24Status: Record<string, string>;
  sep24Errors: {
    unsupportedAnchor: string;
    challengeFailed: (status: number) => string;
    invalidChallenge: string;
    authRejected: (status: number) => string;
    noToken: string;
    depositInitFailed: (status: number) => string;
    invalidDepositResponse: string;
    statusFetchFailed: (status: number) => string;
    pollTimeout: string;
    popupBlocked: string;
  };
}

const tr: Translations = {
  meta: {
    title: "StableShield — Kalkanının Altında Kal",
    description:
      "StableShield — Türk lirasını Stellar ağı üzerinde USDC'ye demirleyerek enflasyona karşı koruyan gözetimsiz sermaye kalkanı.",
  },
  common: {
    langToggleLabel: "Dili değiştir",
  },
  header: {
    navHowItWorks: "Nasıl Çalışır?",
    navSecurity: "Güvenlik & Kalkan",
    navWhy: "Neden StableShield",
    navFaq: "SSS",
    badgeAnchor: "USDC Anchor",
    tagline: "Stellar Network",
    menuOpen: "Menüyü aç",
    menuClose: "Menüyü kapat",
  },
  connectButton: {
    connect: "Bağlan",
    connecting: "Bağlanıyor...",
    goToDashboard: "Panele Git",
    iconConnect: "Cüzdanı bağla",
    iconGoToDashboard: "Panele git",
    errorFreighterNotFound: "Freighter bulunamadı, eklentiyi kurup tekrar deneyin.",
    errorModalClosed: "Bağlantı penceresi kapatıldı, tekrar deneyin.",
    errorRejected: "Bağlantı isteği reddedildi.",
    errorNetwork: "Ağ hatası oluştu, bağlantınızı kontrol edip tekrar deneyin.",
    errorGeneric: "Cüzdan bağlantısı tamamlanamadı, tekrar deneyin.",
  },
  hero: {
    badge: "Stellar Ekosisteminde Güvenli Anchor • TRY / USDC Sabit Coin Limanı",
    title: "PARAM CEBİMDE DEĞİL, KALKANIMIN ALTINDA.",
    subtitle:
      "Türk lirasını Stellar ağının hızıyla USDC sabit coinine demirleyin. Enflasyona ve kur dalgalanmalarına karşı paranızın alım gücünü saniyeler içinde zırhlandırın.",
    ctaLabel: "Hemen Bağlan",
    feeBadge: "Sıfır Komisyon • 3 Saniyede Stellar Güvencesi",
    anchorStatusLabel: "Anchor Durumu:",
    anchorStatusValue: "Sep-24 Aktif",
    settlementLabel: "Ortalama Mutabakat:",
    settlementValue: "2.8 sn",
    reserveLabel: "Rezerv Doğrulaması:",
    reserveValue: "1:1 Circle USDC",
    liveCardTitle: "Canlı Kalkan Durumu",
    liveCardSubtitle: "Stellar Anchored Vault",
    liveCardBadge: "KORUMADA",
    inputAmountLabel: "Giriş Tutarı",
    inputAriaLabel: "TRY giriş tutarı",
    lockedUsdcLabel: "Kilitlenen USDC",
    protectionRatioLabel: "Varlık Koruma Oranı",
    protectionRatioValue: "%100 Sabit Güvence",
    bridgeNote: "Anında Stellar SEP-24 Köprüsü ile Türk Bankalarına Açık",
  },
  howItWorks: {
    eyebrow: "Basit • Gözetimsiz • Şeffaf",
    title: "Nasıl Çalışır?",
    subtitle: "Üç basit adımda sermayenizi sabitleyin ve koruma altına alın.",
    steps: [
      {
        number: "01",
        title: "1. Yatır",
        description: "Cüzdanını bağla, TRY'yi gönder. Saniyeler içinde bakiyen stabilcoin'e dönüşür.",
        footerBadge: "SEP-24 Anchor",
      },
      {
        number: "02",
        title: "2. Koru",
        description: "Paran artık kur dalgalanmasından etkilenmez. İstediğin an, olduğu gibi orada durur.",
        footerBadge: "Tam Rezerv",
      },
      {
        number: "03",
        title: "3. Çek",
        description: "Ne zaman istersen tek tıkla TRY'ye çevir, hesabına geç.",
        footerBadge: "Anında İade",
      },
    ],
  },
  why: {
    eyebrow: "Egemen Sermaye Güvencesi",
    title: "Neden StableShield?",
    quote:
      "\"Türk lirasının değeri her gün değişiyor, ama senin emeğinin karşılığı değişmemeli. StableShield, TL'ni saniyeler içinde stabil bir varlığa çevirip koruma altına alır — kripto bilmene, borsa açmana gerek kalmadan. İstediğin an, olduğu gibi geri alırsın.\"",
    feature1Title: "Gözetimsiz Mimari",
    feature1Desc: "Fonlarınız platformumuzda değil, sizin Stellar cüzdanınızda kilitlidir.",
    feature2Title: "Denetimli Rezervler",
    feature2Desc: "Her USDC için bağımsız kuruluşlarca doğrulanmış nakit karşılık.",
    ctaLabel: "Hemen Kalkanını Oluştur",
    metricsTitle: "Stellar Mutabakat Ölçümleri",
    metricsSubtitle: "Geleneksel bankacılık vs. StableShield USDC Anchor",
    metrics: [
      {
        title: "Sabit Değer Koruması",
        subtitle: "USD-pegged 1:1 likidite",
        value: "%100",
        caption: "Tam Teminat",
      },
      {
        title: "İşlem Süresi",
        subtitle: "Stellar Consensus Protocol",
        value: "< 5 sn",
        caption: "Nihai Mutabakat",
      },
      {
        title: "Ağ Ücreti",
        subtitle: "Mikro transfer maliyeti",
        value: "< 0.001 TL",
        caption: "İşlem Başına",
      },
    ],
    chartTitle: "TL / USD Volatilite Seyri (Durgunlaşırılmış Kalkan)",
    chartCaption: "StableShield: Yatay & İmmütatif",
    chartUnprotected: "Korunmasız TRY",
    chartProtected: "StableShield USDC",
  },
  faq: {
    eyebrow: "Sıkça Sorulan Sorular",
    title: "Merak Edilenler",
    subtitle: "Kalkanınızı oluşturmadan önce bilmeniz gereken her şey.",
    items: [
      {
        question: "StableShield paramı gerçekten elimden alıyor mu?",
        answer:
          "Hayır. StableShield gözetimsizdir (non-custodial) — yatırdığınız TRY, Stellar ağı üzerinde sizin kontrolünüzdeki cüzdana bağlı bir USDC bakiyesine dönüşür. Fonlar hiçbir zaman şirketimizin bilançosunda tutulmaz.",
      },
      {
        question: "USDC'ye dönüşüm ne kadar sürüyor?",
        answer:
          "Stellar Consensus Protocol sayesinde işlemler ortalama 2-5 saniyede kesinleşir. SEP-24 anchor köprüsü Türk bankalarıyla doğrudan entegredir.",
      },
      {
        question: "Rezervler nasıl doğrulanıyor?",
        answer:
          "Her USDC, Circle tarafından ihraç edilen ve bağımsız denetim kuruluşlarınca aylık olarak doğrulanan 1:1 nakit/nakit benzeri rezervlerle desteklenir.",
      },
      {
        question: "Herhangi bir zamanda TRY'ye geri çekebilir miyim?",
        answer:
          "Evet. Dashboard üzerinden 'TRY'ye Çek' butonuyla istediğiniz an FAST/Havale yoluyla bakiyenizi Türk Lirası olarak banka hesabınıza aktarabilirsiniz.",
      },
      {
        question: "İşlem ücreti var mı?",
        answer:
          "Stellar ağı üzerindeki mikro transfer maliyeti işlem başına 0.001 TL'nin altındadır. StableShield yatırma ve çekme işlemlerinde komisyon almaz.",
      },
    ],
  },
  cta: {
    title: "Emeğinizi enflasyonun insafına bırakmayın.",
    subtitle: "Stellar mutabakat güvencesiyle paranızı bugün kalkanın altına alın.",
    buttonLabel: "Cüzdanı Bağla ve Koru",
    buttonConnectedLabel: "Panele Git",
  },
  footer: {
    title: "StableShield Sovereign Vault",
    description:
      "Stellar mutabakat mimarisi ve onaylanmış USDC likidite çıpası ile sermayenizi devalüasyon riskine karşı koruyan gözetimsiz kurumsal tasarruf katmanı.",
    auditBadge: "Stellar Consensus Protocol Denetlendi",
    copyright: "StableShield Protocol. Stellar Ledger Anchor Entegrasyonu.",
    contracts: "Sözleşmeler: GCS3...9TVA",
    networkStatus: "Ağ Durumu: Aktif (99.98%)",
  },
  modal: {
    close: "Kapat",
  },
  dashboard: {
    footerNote: "Stellar Network üzerinde 1:1 USDC ile teminatlandırılmıştır • SEP-24 FAST Anchor Koruması",
  },
  topBar: {
    vaultBadge: "Stellar USDC Vault",
    testnetTooltip: "Bu uygulama Stellar Testnet üzerinde çalışıyor — gerçek para hareket etmez",
    homeAria: "Ana sayfaya dön",
    disconnectAria: "Cüzdanı Ayır",
    disconnect: "Ayır",
  },
  balanceCard: {
    totalLabel: "Toplam Güvencedeki Varlık",
    protectedLabel: "Korunan Bakiye",
    unverified: "doğrulanamadı",
    balanceErrorText: "Bakiye Horizon'dan doğrulanamadı, bu gerçek bakiyeniz olmayabilir. Yatırma/çekme bu yüzden geçici olarak kapalı.",
    retry: "Tekrar dene",
    protectionBadge: "Son 30 günde TL karşısında %6,2 değer korundu",
    depositButton: "TRY Yatır",
    withdrawButton: "TRY'ye Çek",
    dismissAlertAria: "Uyarıyı kapat",
  },
  transactions: {
    ariaLabel: "Son Gerçekleşen İşlemler",
    title: "Son İşlemler",
    period: "Son 30 Gün",
    empty: "Henüz işlem bulunmuyor.",
    deposit: "Yatırım",
    withdraw: "Çekim",
    failed: "Başarısız",
    labels: {
      usdc_vault: "USDC Koruma Kasası",
      try_fast_transfer: "TRY FAST Transfer",
      initial_deposit: "İlk Açılış Depozitosu",
    },
  },
  depositModal: {
    title: "TRY Yatır",
    startingTitle: "Anchor'a bağlanılıyor",
    startingDesc: "Cüzdanınızdan bir SEP-10 kimlik doğrulama imzası istenecek — Freighter'daki isteği onaylayın.",
    awaitingTitle: "Yeni sekmede devam edin",
    awaitingDesc:
      "Anchor'ın yatırma formunu açtık. Tutarı ve bilgilerinizi orada tamamlayın; bu pencere işlem durumunu otomatik olarak izleyecek.",
    reopenTab: "Sekmeyi tekrar aç",
    completedTitle: "Yatırım tamamlandı",
    completedDesc: "Bakiyeniz güncellendi ve işlem \"Son İşlemler\"e eklendi.",
    failedTitle: "Yatırma işlemi tamamlanamadı",
    close: "Kapat",
    notConnected: "Cüzdan bağlı değil.",
    genericStartError: "Yatırma akışı başlatılamadı.",
  },
  withdrawModal: {
    title: "TRY'ye Çek",
    successTitle: "Çekim talebi alındı",
    successDesc: (amount) => `Bakiyeniz güncellendi, ${amount} ₺ FAST transfer için onay bekleniyor.`,
    description: "USDC kasanızdaki bakiyeyi anında Türk lirasına çevirip FAST/Havale ile hesabınıza gönderin.",
    amountLabel: "Tutar",
    amountAria: "Çekilecek TRY tutarı",
    useAll: (amount) => `Tümünü kullan · ${amount} ₺`,
    vaultDeductLabel: "Kasadan Düşecek USDC",
    submitButton: "Çekimi Onayla",
    genericError: "İşlem gerçekleştirilemedi.",
  },
  walletErrors: {
    notConnected: "Cüzdan bağlı değil.",
    invalidAmount: "Geçerli bir tutar girin.",
    insufficientLockable: "Cüzdanınızdaki USDC bakiyesinden fazlasını kilitleyemezsiniz.",
    insufficientBalance: "Bakiyenizden fazla tutar çekemezsiniz.",
    connectFailed: "Cüzdan bağlantısı tamamlanamadı.",
    withdrawRolledBack: (error) => `Çekim onaylanamadı, bakiyeniz geri yüklendi. (${error})`,
  },
  sep24Status: {
    incomplete: "Anchor ek bilgi bekliyor",
    pending_user_transfer_start: "Banka transferinizi başlatmanız bekleniyor",
    pending_anchor: "Anchor işleminizi işliyor",
    pending_stellar: "Stellar ağında onaylanıyor",
    pending_external: "Dış sistemde işleniyor",
    pending_trust: "USDC trustline'ı bekleniyor",
    completed: "Tamamlandı",
    refunded: "İade edildi",
    expired: "Süresi doldu",
    error: "Hata oluştu",
  },
  sep24Errors: {
    unsupportedAnchor: "Bu anchor SEP-10/SEP-24 desteklemiyor (stellar.toml eksik alanlar içeriyor).",
    challengeFailed: (status) => `SEP-10 challenge alınamadı (HTTP ${status}).`,
    invalidChallenge: "Anchor geçersiz bir SEP-10 challenge döndürdü.",
    authRejected: (status) => `SEP-10 doğrulaması reddedildi (HTTP ${status}).`,
    noToken: "Anchor kimlik doğrulama token'ı döndürmedi.",
    depositInitFailed: (status) => `Interactive deposit başlatılamadı (HTTP ${status}).`,
    invalidDepositResponse: "Anchor geçersiz bir interactive deposit yanıtı döndürdü.",
    statusFetchFailed: (status) => `İşlem durumu alınamadı (HTTP ${status}).`,
    pollTimeout: "İşlem durumu izlenirken zaman aşımına uğradı.",
    popupBlocked: "Anchor sekmesi açılamadı — tarayıcınız pop-up'ı engellemiş olabilir.",
  },
};

const en: Translations = {
  meta: {
    title: "StableShield — Stay Under Your Shield",
    description:
      "StableShield — a non-custodial capital shield that pegs Turkish lira to USDC on the Stellar network to protect against inflation.",
  },
  common: {
    langToggleLabel: "Switch language",
  },
  header: {
    navHowItWorks: "How It Works",
    navSecurity: "Security & Shield",
    navWhy: "Why StableShield",
    navFaq: "FAQ",
    badgeAnchor: "USDC Anchor",
    tagline: "Stellar Network",
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },
  connectButton: {
    connect: "Connect",
    connecting: "Connecting...",
    goToDashboard: "Go to Dashboard",
    iconConnect: "Connect wallet",
    iconGoToDashboard: "Go to dashboard",
    errorFreighterNotFound: "Freighter not found — install the extension and try again.",
    errorModalClosed: "Connection window closed, try again.",
    errorRejected: "Connection request was rejected.",
    errorNetwork: "A network error occurred, check your connection and try again.",
    errorGeneric: "Wallet connection failed, try again.",
  },
  hero: {
    badge: "Secure Anchor on the Stellar Ecosystem • TRY / USDC Stablecoin Harbor",
    title: "MY MONEY ISN'T IN MY POCKET, IT'S UNDER MY SHIELD.",
    subtitle:
      "Peg your Turkish lira to the USDC stablecoin at Stellar network speed. Armor your purchasing power against inflation and exchange-rate swings in seconds.",
    ctaLabel: "Connect Now",
    feeBadge: "Zero Commission • Stellar-Backed in 3 Seconds",
    anchorStatusLabel: "Anchor Status:",
    anchorStatusValue: "Sep-24 Active",
    settlementLabel: "Avg. Settlement:",
    settlementValue: "2.8 s",
    reserveLabel: "Reserve Verification:",
    reserveValue: "1:1 Circle USDC",
    liveCardTitle: "Live Shield Status",
    liveCardSubtitle: "Stellar Anchored Vault",
    liveCardBadge: "PROTECTED",
    inputAmountLabel: "Input Amount",
    inputAriaLabel: "TRY input amount",
    lockedUsdcLabel: "Locked USDC",
    protectionRatioLabel: "Asset Protection Ratio",
    protectionRatioValue: "100% Fixed Coverage",
    bridgeNote: "Instantly Open to Turkish Banks via the Stellar SEP-24 Bridge",
  },
  howItWorks: {
    eyebrow: "Simple • Non-Custodial • Transparent",
    title: "How It Works",
    subtitle: "Peg and protect your capital in three simple steps.",
    steps: [
      {
        number: "01",
        title: "1. Deposit",
        description: "Connect your wallet, send TRY. Your balance converts to stablecoin within seconds.",
        footerBadge: "SEP-24 Anchor",
      },
      {
        number: "02",
        title: "2. Protect",
        description: "Your money is no longer exposed to exchange-rate swings. It stays exactly as it is, whenever you check.",
        footerBadge: "Full Reserve",
      },
      {
        number: "03",
        title: "3. Withdraw",
        description: "Convert back to TRY with a single tap whenever you want, straight to your account.",
        footerBadge: "Instant Refund",
      },
    ],
  },
  why: {
    eyebrow: "Sovereign Capital Assurance",
    title: "Why StableShield?",
    quote:
      "\"The value of the Turkish lira changes every day, but what your labor is worth shouldn't. StableShield converts your TRY into a stable asset and protects it within seconds — no need to learn crypto or open an exchange account. Whenever you want it back, you get it back exactly as it was.\"",
    feature1Title: "Non-Custodial Architecture",
    feature1Desc: "Your funds aren't on our platform — they're locked in your own Stellar wallet.",
    feature2Title: "Audited Reserves",
    feature2Desc: "Every USDC is backed by cash collateral verified by independent auditors.",
    ctaLabel: "Build Your Shield Now",
    metricsTitle: "Stellar Settlement Metrics",
    metricsSubtitle: "Traditional banking vs. StableShield USDC Anchor",
    metrics: [
      {
        title: "Fixed Value Protection",
        subtitle: "USD-pegged 1:1 liquidity",
        value: "100%",
        caption: "Full Collateral",
      },
      {
        title: "Settlement Time",
        subtitle: "Stellar Consensus Protocol",
        value: "< 5 s",
        caption: "Final Settlement",
      },
      {
        title: "Network Fee",
        subtitle: "Micro-transfer cost",
        value: "< $0.001",
        caption: "Per Transaction",
      },
    ],
    chartTitle: "TRY / USD Volatility Path (Shield-Flattened)",
    chartCaption: "StableShield: Flat & Immutable",
    chartUnprotected: "Unprotected TRY",
    chartProtected: "StableShield USDC",
  },
  faq: {
    eyebrow: "Frequently Asked Questions",
    title: "Curious About Something?",
    subtitle: "Everything you need to know before building your shield.",
    items: [
      {
        question: "Does StableShield actually take my money away?",
        answer:
          "No. StableShield is non-custodial — the TRY you deposit becomes a USDC balance tied to a wallet you control on the Stellar network. Funds are never held on our company's balance sheet.",
      },
      {
        question: "How long does converting to USDC take?",
        answer:
          "Thanks to the Stellar Consensus Protocol, transactions finalize in 2-5 seconds on average. The SEP-24 anchor bridge integrates directly with Turkish banks.",
      },
      {
        question: "How are the reserves verified?",
        answer:
          "Every USDC is backed by 1:1 cash and cash-equivalent reserves, issued by Circle and verified monthly by independent audit firms.",
      },
      {
        question: "Can I withdraw back to TRY at any time?",
        answer:
          "Yes. From the dashboard's 'Withdraw to TRY' button you can transfer your balance as Turkish lira to your bank account any time via FAST/wire transfer.",
      },
      {
        question: "Are there any transaction fees?",
        answer:
          "The micro-transfer cost on the Stellar network is under 0.001 TL per transaction. StableShield charges no commission on deposits or withdrawals.",
      },
    ],
  },
  cta: {
    title: "Don't leave your hard work at the mercy of inflation.",
    subtitle: "Put your money under the shield today with Stellar settlement assurance.",
    buttonLabel: "Connect Wallet & Protect",
    buttonConnectedLabel: "Go to Dashboard",
  },
  footer: {
    title: "StableShield Sovereign Vault",
    description:
      "A non-custodial institutional savings layer that protects your capital against devaluation risk with Stellar settlement architecture and an approved USDC liquidity anchor.",
    auditBadge: "Audited by Stellar Consensus Protocol",
    copyright: "StableShield Protocol. Stellar Ledger Anchor Integration.",
    contracts: "Contracts: GCS3...9TVA",
    networkStatus: "Network Status: Active (99.98%)",
  },
  modal: {
    close: "Close",
  },
  dashboard: {
    footerNote: "Collateralized 1:1 with USDC on the Stellar Network • SEP-24 FAST Anchor Protection",
  },
  topBar: {
    vaultBadge: "Stellar USDC Vault",
    testnetTooltip: "This app runs on the Stellar Testnet — no real money moves",
    homeAria: "Back to home",
    disconnectAria: "Disconnect wallet",
    disconnect: "Disconnect",
  },
  balanceCard: {
    totalLabel: "Total Protected Assets",
    protectedLabel: "Protected Balance",
    unverified: "unverified",
    balanceErrorText:
      "Your balance couldn't be verified from Horizon — this may not be your real balance, so deposits/withdrawals are temporarily disabled.",
    retry: "Retry",
    protectionBadge: "Retained 6.2% value against TL over the last 30 days",
    depositButton: "Deposit TRY",
    withdrawButton: "Withdraw to TRY",
    dismissAlertAria: "Dismiss alert",
  },
  transactions: {
    ariaLabel: "Recent Transactions",
    title: "Recent Transactions",
    period: "Last 30 Days",
    empty: "No transactions yet.",
    deposit: "Deposit",
    withdraw: "Withdrawal",
    failed: "Failed",
    labels: {
      usdc_vault: "USDC Protection Vault",
      try_fast_transfer: "TRY FAST Transfer",
      initial_deposit: "Initial Opening Deposit",
    },
  },
  depositModal: {
    title: "Deposit TRY",
    startingTitle: "Connecting to anchor",
    startingDesc: "Your wallet will be asked for a SEP-10 authentication signature — approve the request in Freighter.",
    awaitingTitle: "Continue in the new tab",
    awaitingDesc:
      "We've opened the anchor's deposit form. Complete the amount and your details there; this window will track the transaction status automatically.",
    reopenTab: "Reopen tab",
    completedTitle: "Deposit completed",
    completedDesc: "Your balance was updated and the transaction was added to \"Recent Transactions\".",
    failedTitle: "Deposit could not be completed",
    close: "Close",
    notConnected: "Wallet not connected.",
    genericStartError: "Could not start the deposit flow.",
  },
  withdrawModal: {
    title: "Withdraw to TRY",
    successTitle: "Withdrawal request received",
    successDesc: (amount) => `Your balance was updated — ₺${amount} is pending confirmation for FAST transfer.`,
    description: "Instantly convert the balance in your USDC vault to Turkish lira and send it to your account via FAST/wire transfer.",
    amountLabel: "Amount",
    amountAria: "TRY amount to withdraw",
    useAll: (amount) => `Use all · ₺${amount}`,
    vaultDeductLabel: "USDC to Deduct from Vault",
    submitButton: "Confirm Withdrawal",
    genericError: "The transaction could not be completed.",
  },
  walletErrors: {
    notConnected: "Wallet not connected.",
    invalidAmount: "Enter a valid amount.",
    insufficientLockable: "You can't lock more than your wallet's USDC balance.",
    insufficientBalance: "You can't withdraw more than your balance.",
    connectFailed: "Wallet connection failed.",
    withdrawRolledBack: (error) => `Withdrawal couldn't be confirmed, your balance was restored. (${error})`,
  },
  sep24Status: {
    incomplete: "Anchor is waiting for more info",
    pending_user_transfer_start: "Waiting for you to start the bank transfer",
    pending_anchor: "Anchor is processing your transaction",
    pending_stellar: "Confirming on the Stellar network",
    pending_external: "Processing on an external system",
    pending_trust: "Waiting for the USDC trustline",
    completed: "Completed",
    refunded: "Refunded",
    expired: "Expired",
    error: "An error occurred",
  },
  sep24Errors: {
    unsupportedAnchor: "This anchor doesn't support SEP-10/SEP-24 (its stellar.toml is missing required fields).",
    challengeFailed: (status) => `Couldn't fetch the SEP-10 challenge (HTTP ${status}).`,
    invalidChallenge: "The anchor returned an invalid SEP-10 challenge.",
    authRejected: (status) => `SEP-10 verification was rejected (HTTP ${status}).`,
    noToken: "The anchor didn't return an authentication token.",
    depositInitFailed: (status) => `Couldn't start the interactive deposit (HTTP ${status}).`,
    invalidDepositResponse: "The anchor returned an invalid interactive deposit response.",
    statusFetchFailed: (status) => `Couldn't fetch the transaction status (HTTP ${status}).`,
    pollTimeout: "Timed out while tracking the transaction status.",
    popupBlocked: "Couldn't open the anchor tab — your browser may have blocked the pop-up.",
  },
};

export const translations: Record<Language, Translations> = { tr, en };
