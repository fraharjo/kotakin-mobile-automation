---
name: nexus-test-generator
description: >-
  Enterprise QA Lead & SDET Generator for Nexus Automation (Web, Android, iOS).
  Generates production-grade BDD Cucumber test cases, type-safe multi-platform Screen Objects,
  and step definitions with strict traceability, risk-based prioritization, and i18n resilience.
---

# Nexus Test Generator (Enterprise QA Lead & SDET Engine)

Gunakan skill ini untuk memandu proses perancangan pengujian, eksplorasi aplikasi (Web, Android, iOS), dan pembuatan otomatisasi test case terstruktur di platform **Nexus Automation**.

---

## 🎯 Prinsip Utama Framework (Core Principles)

1. **Anti-Hallucination Selectors:** Dilarang mengarang selector. Gunakan konvensi penamaan terstandarisasi, verifikasi via dump UI aktual (`adb shell uiautomator dump` / browser devtools), atau tandai eksplisit dengan `// TODO: verify with dev`.
2. **Multi-Platform Consistency:** Satu arsitektur modular yang kompatibel untuk Web, Android, dan iOS tanpa duplikasi logika bisnis.
3. **Strict Traceability & I/O Contract:** Setiap skenario wajib memetakan langsung ke Acceptance Criteria (`@AC-<ID>`) dan Jira Issue (`@JIRA-<KEY>`). Jika requirement ambigu, catat sebagai **Open Questions & Asumsi**, bukan mengarang alur.
4. **Risk-Based Prioritization & Applicability:** Hanya buat skenario yang relevan. Dimensi yang tidak berlaku wajib ditandai `N/A + alasan`. Klasifikasikan prioritas: `@p0` (Smoke), `@p1` (Regression), `@p2` (Edge-case).
5. **Standardized Tagging Taxonomy:** Runner otomatis memfilter test dengan presisi tinggi (`not @manual and @automated`).
6. **Step Reuse & Clean Code:** Cek library step yang sudah ada sebelum membuat step definition baru untuk mencegah duplikasi kode.

---

## 📋 Kontrak Input / Output (I/O Contract)

### 1. Format Input Minimum yang Diterima
Sebelum memulai perancangan test, pastikan informasi berikut terpenuhi:
* **Target Feature / Modul:** Nama modul (misal: `box`, `item`, `settings`, `auth`).
* **Target Platform:** `Web`, `Android`, `iOS`, atau `Cross-Platform`.
* **Acceptance Criteria (AC):** Daftar poin kriteria keberhasilan bernomor (`AC-01`, `AC-02`, dst.).
* **User Roles & Permissions:** Hak akses pengguna (e.g. Guest, Authenticated User, Admin).
* **UI Artifacts (Opsional tapi Direkomendasikan):** File APK di `apps/`, URL Web, atau konvensi Figma.

### 2. Aturan Penanganan Requirement Ambigu (Ambiguity Handling)
Jika requirement tidak lengkap atau ambigu:
* **DILARANG** mengasumsikan alur bisnis tanpa konfirmasi.
* Tulis daftar **Open Questions & Asumsi Kerja** di dokumen requirement (`requirements/<fitur>-prd.md`).
* Minta klarifikasi dari user sebelum mengunci skenario BDD.

---

## 📐 6 Dimensi Cakupan Pengujian (Test Coverage Checklist)

Setiap menganalisis requirement, evaluasi 6 dimensi berikut untuk menentukan skenario pengujian.
> [!IMPORTANT]
> **Aturan Applicability:** Jika suatu dimensi tidak relevan untuk fitur yang diuji (misal: hardware biometrik/kamera pada halaman Settings/About), tandai secara eksplisit: `N/A: <alasan>`, **JANGAN DIPAKSAKAN** membuat skenario fiktif.

### Dimensi 1: Happy Path & Core Business Logic (Positif)
* Alur ideal (*golden path*) dari awal hingga selesai sesuai Acceptance Criteria (`@AC-<ID>`).
* Tag: `@p0 @automated @positive`

### Dimensi 2: Boundary Value Analysis (BVA) & Equivalence Partitioning (EP)
* Batas nilai input: `Min - 1`, `Min`, `Max`, `Max + 1`.
* Partisi valid vs invalid: Format data, alfanumerik vs simbol, panjang teks ekstrem (150–500+ karakter).
* Karakter ekstrem & Sanitasi: Unicode, Emoji (⚡️, 📦), whitespace-only (`"   "`), zero-width space, injeksi SQL/XSS dasar (`<script>`, `' OR '1'='1`).
* Tag: `@p1 @automated @negative @boundary`

### Dimensi 3: State Transition & Alur Batal (User Journey)
* Transisi status entitas: Misal `Draft` → `Pending` → `Success` → `Cancelled` → `Expired`.
* Pembatalan & Interupsi Pengguna: Menekan tombol Back/Kembali, tombol Cancel, atau refresh halaman saat proses berlangsung.
* Tag: `@p1 @automated @negative @lifecycle`

### Dimensi 4: Negative & Backend Error Handling
* Respons error server / API: HTTP 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Server Error, 504 Timeout.
* Penanganan UI: Inline field validation error, toast message, atau error banner dialog.
* Tag: `@p1 @automated @negative`

### Dimensi 5: The 5 UI & UX States (Figma / UI Alignment)
1. **Ideal State:** Konten terisi lengkap dan normal.
2. **Empty State:** Layar saat data belum ada (ilustrasi, pesan kosong, dan CTA).
3. **Loading / Skeleton State:** Indikator progress / skeleton loading saat memuat data.
4. **Error State:** Tampilan saat komponen gagal dimuat dengan tombol retry.
5. **Partial / Overflow State:** Teks sangat panjang (elipsis `...`), multiline label tidak terpotong rusak.
* Tag: `@p1 @automated @regression` (atau `@manual` jika hanya verifikasi visual subjektif).

### Dimensi 6: Mobile Interruptions, Concurrency & Hardware
* **Concurrency / Idempotency:** Double-tap tombol submit/bayar secara cepat untuk memastikan request tidak diproses dua kali.
* **Network State:** Peralihan ke offline (Airplane Mode), koneksi lambat, atau reconnect saat request berjalan.
* **App Backgrounding:** Aplikasi di-minimize saat proses berjalan, lalu dibuka kembali (memastikan state aman).
* **Hardware & Physical Integration:** Scan kamera fisik, fingerprint/FaceID, SMS OTP eksternal.
* Tag: Skenario hardware fisik ditandai `@p2 @manual`. Skenario idempotency / backgrounding ditandai `@p2 @automated`.

---

## 🏷️ Standard Tagging Taxonomy (Wajib 1 Tag per Kategori)

Setiap skenario Gherkin WAJIB memiliki setidaknya 1 tag dari masing-masing 6 kategori berikut:

```gherkin
@feature-<name> @JIRA-<KEY> @AC-<ID>
@p0 @automated @android @positive
Scenario: Successful login with valid credentials
```

| Kategori | Tag yang Valid | Deskripsi |
| :--- | :--- | :--- |
| **1. Feature & Jira** | `@feature-<modul>` `@JIRA-<KEY>` | Scope fitur dan nomor tiket pelacak (e.g. `@feature-box @JIRA-KOT-101`) |
| **2. Traceability** | `@AC-01`, `@AC-02`, dst. | Pemetaan ke Acceptance Criteria spesifik di PRD |
| **3. Priority** | `@p0`, `@p1`, `@p2` | `@p0` = Smoke (Critical Path)<br>`@p1` = Regression (Happy & Negative Flow)<br>`@p2` = Edge-case / Stress |
| **4. Execution Mode** | `@automated`, `@manual` | `@automated` = Dieksekusi CI/CD runner<br>`@manual` = Uji manual (Hardware, SMS OTP, visual subjektif) |
| **5. Platform** | `@android`, `@ios`, `@web`, `@cross-platform` | Target environment pengujian |
| **6. Test Type** | `@positive`, `@negative`, `@boundary`, `@security`, `@lifecycle` | Klasifikasi jenis pengujian |

> [!IMPORTANT]
> **Aturan Eksekusi Test Runner:**
> Runner CI/CD dan local CLI WAJIB mengecualikan skenario manual dengan filter tag:
> `--cucumberOpts.tags="not @manual and @automated"`

---

## 🔍 Konvensi Selector & Strategi Multi-Platform

### 1. Konvensi Penamaan Selector ({screen}-{element}-{type})
Jika selector belum terverifikasi dari APK dump / DOM, gunakan konvensi standar berikut:
* Format: `<screen>-<element_name>-<element_type>`
* Contoh:
  * `login-email-input` (Input text field)
  * `box-create-btn` (Tombol aksi)
  * `dashboard-header-txt` (Text label / Header)
  * `settings-language-radio` (Radio button)
* Beri komentar `// TODO: verify with dev` jika selector merupakan inferensi desain.

### 2. Karakteristik Selector Antar-Platform
* **Android:** Mencocokkan `content-desc` (Accessibility ID) atau `text` (Visible Label).
* **iOS:** Mencocokkan `accessibilityIdentifier` (ID stabil) atau `label`.
* **Web:** Mencocokkan `data-testid`, `id`, atau CSS selector.

### 3. Unified Multi-Platform Pattern di `BaseScreen`
Gunakan helper di `shared/pages/base.screen.ts`:
```typescript
// Multi-Platform Static Selector
get btnSubmit() {
  return this.getSelector('#submit-btn', 'login-submit-btn');
}

// Multi-Language Resilient Selector (EN, ID, etc.)
get headerDashboard() {
  return this.getByI18n(i18n.dashboard.header);
}
```

---

## 🌐 Enterprise Multi-Language (i18n) Architecture

Semua teks antarmuka yang dipengaruhi bahasa WAJIB mengikuti arsitektur terpusat:
1. **Centralized i18n Dictionary (`shared/constants/i18n.ts`):** Single Source of Truth (SSoT) dengan `as const`.
2. **Resilient Locator Engine:** Menggunakan `this.getByI18n(variants)` yang mencocokkan `@content-desc` dan `@text` sekaligus.
3. **React Native State Sync:** Selalu chaining `click()`, `clearValue()`, dan `setValue('')` untuk mereset input React Native.
4. **Native Dialog Resiliency:** Tangani native `AlertDialog` (e.g. `"Name required"`) sebelum memeriksa status form.

---

## 🧭 Alur Kerja 5 Tahap (5-Stage Workflow)

```
[Tahap 1: Wawancara I/O & Open Questions] 
       ⬇
[Tahap 2: Eksplorasi APK / Web DOM Dinamis] 
       ⬇
[Tahap 3: Sintesis Matriks, Traceability AC & Review Manusia (Checkpoint)] 
       ⬇
[Tahap 4: Generasi Kode Modular (features/)] 
       ⬇
[Tahap 5: Validasi Kompilasi TypeScript & Test Runner]
```

---

## Tahap 1: Wawancara Bertahap (I/O & Requirement Contract)

Ajukan pertanyaan **satu per satu**:
1. **Pertanyaan 1 - Modul & Platform:** Fitur apa yang ingin dibuat dan apa target platformnya (`Android`, `iOS`, `Web`)?
2. **Pertanyaan 2 - Acceptance Criteria (AC):** Sebutkan daftar AC bernomor (`AC-01`, `AC-02`) atau paste dokumen user story.
3. **Pertanyaan 3 - Negative & Edge Cases:** Apa validasi error, batasan input, atau alur pembatalan yang diharapkan?
4. **Pertanyaan 4 - UI / APK Source:** Apakah ada file APK di `apps/` untuk di-dump selector aslinya?

---

## Tahap 2: Eksplorasi Selector Dinamis (Anti-Hallucination)

Jika APK tersedia di `apps/`:
```bash
# 1. Cek Activity & Package
~/Library/Android/sdk/build-tools/36.0.0/aapt dump badging apps/<app>.apk | grep -E "package: name|launchable-activity"

# 2. Dump XML Hierarchy Aktual
adb shell uiautomator dump /sdcard/window_dump.xml
adb pull /sdcard/window_dump.xml /tmp/window_dump.xml
```
Ekstrak `content-desc`, `resource-id`, dan `text` asli langsung dari dump XML.

---

## Tahap 3: Sintesis Matriks, Traceability, & Checkpoint Review

> [!IMPORTANT]
> **CHECKPOINT REVIEW MANUSIA:**
> Wajib menyajikan artefak Matriks & Rancangan Skenario BDD kepada pengguna terlebih dahulu. **DILARANG membuat file kode di Tahap 4 sebelum pengguna menyetujui rancangan ini.**

### Format Matriks Rancangan:
| ID Skenario | AC Mapping | Prioritas | Tipe | Platform | Ringkasan Skenario | Status Eksekusi |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `TC-BOX-001` | `AC-01` | `@p0` | `@positive` | `@android` | Sukses membuat kotak baru dengan data valid | `@automated` |
| `TC-BOX-002` | `AC-02` | `@p1` | `@negative` | `@android` | Gagal membuat kotak jika nama kosong | `@automated` |
| `TC-BOX-003` | `AC-03` | `@p2` | `@edge-case` | `@android` | Cek integrasi kamera QR scanner fisik | `@manual` |

*Catatan: Dimensi yang tidak berlaku ditandai `N/A: <alasan>` (misal: "Hardware biometric N/A untuk modul About").*

---

## Tahap 4: Generasi Kode Modular (`features/`)

Buat 4 file per fitur dengan struktur bersih:
```text
features/<nama_fitur>/
├── requirements/<nama_fitur>-prd.md    # PRD, AC Mapping, Open Questions
├── features/<nama_fitur>.feature       # BDD Gherkin dengan Tag Lengkap
├── pages/<nama_fitur>.screen.ts        # Screen Object (POM)
└── steps/<nama_fitur>.steps.ts         # Step Definitions (Cek reuse dulu)
```

### Aturan Step Reuse:
Sebelum membuat step definition baru, periksa file step yang sudah ada di modul lain (`features/*/steps/*.steps.ts`) atau `shared/`. Gunakan kembali step yang sudah ada (misal: `Given the user is on the "My Stash" dashboard`).

---

## 💡 Concrete Few-Shot Example

### 1. Feature File (`features/box/features/box.feature`):
```gherkin
@feature-box @JIRA-KOT-101
Feature: Box Management
  As a Kotakin user
  I want to create, edit, and organize storage boxes
  So that I can keep track of my physical belongings

  @p0 @automated @android @positive @AC-01
  Scenario: Successfully create a new box with valid details
    Given the user is on the "My Stash" dashboard
    When the user opens the New Box form
    And the user fills the box name with "Kitchen Box" and description "Utensils"
    And the user submits the box creation form
    Then the box "Kitchen Box" should be displayed on the dashboard

  @p1 @automated @android @negative @boundary @AC-02
  Scenario Outline: Fail to create box when mandatory name is invalid
    Given the user is on the "My Stash" dashboard
    When the user opens the New Box form
    And the user fills the box name with "<input_name>" and description "Invalid Test"
    And the user submits the box creation form
    Then the user should remain on the New Box form

    Examples:
      | input_name |
      |            |
      |            |
```

### 2. Screen Object (`features/box/pages/box.screen.ts`):
```typescript
import { BaseScreen } from '../../../shared/pages/base.screen';
import { i18n } from '../../../shared/constants/i18n';

class BoxScreen extends BaseScreen {
  // i18n Resilient Locators
  get btnNewBox() {
    return this.getByI18n(i18n.dashboard.btnNewBox);
  }

  get headerMyStash() {
    return this.getByI18n(i18n.dashboard.header);
  }

  get btnCreateBox() {
    return this.getByI18n(i18n.box.btnCreateBox);
  }

  // Standardized Conventions
  get inputBoxName() {
    return $('~Box name'); // Verified from UI Dump
  }

  get inputDescription() {
    return $('~Description'); // Verified from UI Dump
  }

  async openNewBoxForm(): Promise<void> {
    await this.click(this.btnNewBox);
  }

  async fillBoxForm(name: string, description: string): Promise<void> {
    await this.setValue(this.inputBoxName, name);
    if (description) {
      await this.setValue(this.inputDescription, description);
    }
  }
}

export default new BoxScreen();
```

### 3. Step Definition (`features/box/steps/box.steps.ts`):
```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import boxScreen from '../pages/box.screen';

Given('the user is on the {string} dashboard', async (dashboardTitle: string) => {
  await boxScreen.ensureOnMyStash();
});

When('the user opens the New Box form', async () => {
  await boxScreen.openNewBoxForm();
});

When('the user fills the box name with {string} and description {string}', async (name: string, desc: string) => {
  await boxScreen.fillBoxForm(name, desc);
});
```

---

## Tahap 5: Validasi Kompilasi & Kesiapan Eksekusi

1. **Verifikasi Kompilasi TypeScript:**
   ```bash
   npx tsc --noEmit
   ```
   Wajib exit code 0 tanpa error.
2. **Perintah Eksekusi Otomatis (Aman dari Skenario Manual):**
   ```bash
   # Eksekusi seluruh automated test Android
   npm run test:android

   # Eksekusi per fitur
   npm run test:feature:<nama>

   # Eksekusi dengan filter Allure Report
   npm run report
   ```
