# Panduan Prompting AI untuk QA (Nexus Test Generator)

Gunakan template prompt ini setiap kali ada PRD, tiket Jira, atau desain Figma baru untuk stream Anda.

---

## 1. Prompt: Generate BDD & Screen Object Baru

```text
Halo, tolong buatkan BDD Cucumber (.feature), Screen Object TypeScript, dan Step Definition untuk Stream [NAMA_STREAM, misal: checkout] berdasarkan requirement berikut:

--- INFORMASI TIKET & DESAIN ---
Jira Ticket: [misal: JIRA-PAY-402]
Figma Screen: [misal: Screens/Payment/QRIS-v2]
Tipe Pengujian: [misal: Functional / Regression / E2E]

--- ACCEPTANCE CRITERIA / USER STORY ---
[Paste teks User Story & Acceptance Criteria dari Jira / PRD di sini]

--- KOMPONEN FIGMA / UI LOCATORS ---
[Paste daftar nama layer/komponen Figma, misal:
- Input QRIS Nominal: #input-nominal / ~input-nominal
- Tombol Bayar Sekarang: #btn-pay / ~btn-pay
- Status Dialog: #dialog-status / ~dialog-status]

--- KETENTUAN OUTPUT ---
1. Terapkan tagging standar:
   - Stream: @stream-[nama]
   - Eligibility: @automated atau @manual
   - Category: @smoke, @functional, @regression, atau @e2e
   - Platform: @web, @android, @ios
2. Buat file .feature Gherkin yang rapi (Given-When-Then).
3. Buat file Screen Object yang meng-extend BaseScreen dengan reserved locator untuk Web (#id/css) dan Mobile (~accessibility-id).
4. Buat file Step Definition TypeScript yang memanggil Screen Object tersebut.
```

---

## 2. Prompt: Self-Healing & Fix Failure Test

```text
Halo, test scenario [@JIRA-xxx] pada Stream [nama_stream] mengalami kegagalan (FAIL) pada platform [Web / Android].

--- LOG ERROR ALLURE ---
[Paste error log / stack trace dari Allure Report di sini]

--- PERUBAHAN UI / LOCATOR TERBARU ---
[Sebutkan jika ada perubahan ID atau struktur halaman dari Dev]

Tolong periksa file Screen Object dan Step Definition terkait, lalu berikan perbaikan kodenya agar test kembali passing (GREEN).
```
