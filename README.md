# Nexus Automation Platform 🚀

**Nexus Automation** adalah platform otomatisasi pengujian terpadu untuk **Web, Android, dan iOS** yang mengadopsi pendekatan **Multi-Stream Monorepo**, **Shift-Left BDD (Cucumber)**, dan **AI-Augmented QA**.

---

## 📁 Struktur Monorepo

```text
nexus-automation/
├── apps/                          # File APK Android / IPA iOS untuk testing
├── docs/
│   └── qa-prompt-guide.md         # Template prompt AI untuk QA generate test
├── shared/                        # Komponen yang dipakai bersama antar stream
│   ├── pages/base.screen.ts       # Base Screen Object (Universal Locator Web & Mobile)
│   └── steps/common.steps.ts      # Shared Steps (Login dasar, wait, dsb.)
├── features/                      # Domain masing-masing fitur aplikasi
│   ├── onboarding/                # Fitur Onboarding (@feature-onboarding)
│   ├── box/                       # Fitur Manajemen Box (@feature-box)
│   ├── item/                      # Fitur Manajemen Item (@feature-item)
│   ├── scanner/                   # Fitur QR Code Scanner (@feature-scanner)
│   └── settings/                  # Fitur Pengaturan (@feature-settings)
├── reports/                       # Hasil test & Allure report
├── .github/workflows/
│   └── test-runner.yml            # CI/CD GitHub Actions dengan parameter selector Stream
├── package.json
├── tsconfig.json
├── wdio.shared.conf.ts            # Konfigurasi global Cucumber & Allure
├── wdio.web.conf.ts               # Runner Web Browser (Chrome)
└── wdio.android.conf.ts           # Runner Android Emulator (Appium)
```

---

## 🛠️ Panduan Memulai (Quick Start)

### 1. Install Dependencies
Buka terminal di root direktori projek, lalu jalankan:
```bash
npm install
```

### 2. Menjalankan Automation Web
Jalankan semua test web yang ber-tag `@automated`:
```bash
npm run test:web
```

Menjalankan test khusus per stream:
```bash
# Jalankan hanya Stream Auth
npm run test:stream:auth

# Jalankan hanya Stream Catalog
npm run test:stream:catalog

# Jalankan hanya Stream Checkout
npm run test:stream:checkout
```

### 3. Menjalankan Automation Android (Emulator)
1. Siapkan file APK di `apps/my-demo-app.apk` (baca panduan di [apps/README.md](apps/README.md)).
2. Pastikan Android Emulator sudah aktif.
3. Jalankan command:
```bash
npm run test:android
```

---

## 📊 Melihat Laporan Pengujian (Allure Report)

Setelah test dijalankan, buka dashboard Allure interaktif dengan:
```bash
npm run report
```
Dashboard akan menampilkan:
- **Behaviors**: Pengelompokan berdasarkan Stream, Epic, dan Feature.
- **Failures & Blockers**: Tangkapan layar otomatis (*screenshot*) dan stack trace kegagalan.
- **Timeline & Categories**: Status `@smoke`, `@regression`, `@automated`, dan `@manual`.

---

## 🤖 AI-Augmented QA Workflow
QA cukup memberikan requirement PRD / Jira / Figma ke AI menggunakan template yang ada di:
👉 **[docs/qa-prompt-guide.md](docs/qa-prompt-guide.md)**
