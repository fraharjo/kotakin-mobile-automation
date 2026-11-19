# Kotakin Mobile Automation Framework 🚀

Production-grade Mobile Test Automation Framework for **Kotakin Android App** (`com.bmolab.kotakin`), built with **WebdriverIO v8**, **Appium 2**, **Cucumber BDD**, **TypeScript**, **Allure 2 Reports**, and **AI-Driven Quality Heuristics**.

[![Android Testing](https://img.shields.io/badge/Platform-Android%20Emulator-green.svg)](https://developer.android.com/)
[![WebdriverIO](https://img.shields.io/badge/WebdriverIO-v8-blue.svg)](https://webdriver.io/)
[![Appium](https://img.shields.io/badge/Appium-v2-purple.svg)](https://appium.io/)
[![Cucumber BDD](https://img.shields.io/badge/BDD-Cucumber-success.svg)](https://cucumber.io/)
[![Allure Report](https://img.shields.io/badge/Report-Allure%202-orange.svg)](https://allurereport.org/)
[![Test Status](https://img.shields.io/badge/Tests-49%2F49%20Passed-brightgreen.svg)]()

---

## 📊 Test Suite Coverage (100% Pass Rate)

Total **49 Skenario BDD** terotomatisasi secara penuh melintasi 5 modul aplikasi Kotakin:

| Modul | Total Skenario | Status | Fokus Pengujian |
| :--- | :---: | :---: | :--- |
| **Box Creation & Management** | 21 | 🟢 Passed | CRUD Box, BVA boundaries, Search & Filter, Sanitization, Lifecycle |
| **Item Management Inside Box** | 11 | 🟢 Passed | Photo capture, Stepper counter, Whitespace negative, Emojis, Long text |
| **Application Settings & Localization** | 5 | 🟢 Passed | Dual language (EN/ID), Version verification, Backup/Restore |
| **Onboarding & Walkthrough** | 4 | 🟢 Passed | Multi-slide progression, Skip actions, Feature guides verification |
| **Physical QR Code Scanner** | 3 | 🟢 Passed | Viewfinder launch, Camera permission denial, Safe return navigation |

---

## 📁 Struktur Project Monorepo

```text
kotakin-mobile-automation/
├── .agents/skills/                 # AI Agent Skills (Quality Auditor & Test Generator)
│   ├── nexus-test-generator/       # BDD Gherkin & POM code generator
│   └── app-quality-advisor/        # UX Heuristic Auditor & Dev advisor
├── apps/                           # Lokasi APK Kotakin (baca apps/README.md)
│   └── README.md                   # Panduan download APK via GitHub Releases
├── docs/                           # Dokumentasi & Spesifikasi Pengujian
│   ├── test-case-specification.md  # Spesifikasi 49 test cases lengkap
│   ├── test-cases.xlsx             # Export format Microsoft Excel (.xlsx)
│   └── test-cases.csv              # Export format Universal CSV (.csv)
├── features/                       # Fitur & Skenario BDD Cucumber
│   ├── box/                        # Fitur Manajemen Box (21 Skenario)
│   ├── item/                       # Fitur Manajemen Item (11 Skenario)
│   ├── onboarding/                 # Fitur Onboarding (4 Skenario)
│   ├── scanner/                    # Fitur QR Code Scanner (3 Skenario)
│   └── settings/                   # Fitur Settings & i18n (5 Skenario)
├── shared/                         # Komponen Reusable Framework
│   ├── constants/i18n.ts           # Centralized Type-Safe i18n Dictionary
│   └── pages/base.screen.ts        # Base Screen Object (Universal Locator Engine)
├── reports/                        # Allure results & HTML reports
├── wdio.android.conf.ts            # Konfigurasi Appium Android Emulator
├── wdio.shared.conf.ts             # Konfigurasi shared Cucumber & Allure
└── tsconfig.json                   # Konfigurasi TypeScript
```

---

## 🛠️ Panduan Memulai (Quick Start)

### 1. Prasyarat Sistem
* **Node.js** (v18+)
* **Java JDK** (v11+)
* **Android SDK** & **Android Emulator** aktif
* **Appium 2** dengan driver `uiautomator2`

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Unduh File APK Kotakin
Jalankan perintah ini di root folder untuk mengunduh APK langsung dari GitHub Releases:
```bash
curl -L -o apps/kotakin.apk https://github.com/fraharjo/kotakin-mobile-automation/releases/download/v1.0.0/kotakin.apk
```

---

## 🚀 Menjalankan Pengujian

```bash
# Menjalankan seluruh test suite (49 skenario)
npm run test:android

# Menjalankan test per fitur modul
npm run test:feature:box
npm run test:feature:item
npm run test:feature:settings
npm run test:feature:onboarding
npm run test:feature:scanner
```

---

## 📊 Melihat Laporan Pengujian (Allure Report)

Setelah pengujian selesai dijalankan, buka dashboard Allure interaktif dengan:
```bash
npm run report:open
```

Dashboard menampilkan grafik lulus 100%, durasi per test case, rekaman step Cucumber, dan tangkapan layar otomatis jika ada kegagalan.

---

## 📑 Spesifikasi Test Case (Excel & Dokumentasi)

Seluruh spesifikasi test case dan matriks keterlacakan (*Requirements Traceability Matrix / RTM*) tersedia di:
* 📄 **Markdown:** [docs/test-case-specification.md](docs/test-case-specification.md)
* 📊 **Excel (.xlsx):** [docs/test-cases.xlsx](docs/test-cases.xlsx)
* 📝 **CSV (.csv):** [docs/test-cases.csv](docs/test-cases.csv)
