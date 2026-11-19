# Generated Artifacts (Staging Area) 🚧

Folder ini adalah **area staging draf (Stage 2)** hasil keluaran AI Agent (`nexus-test-generator`).

## Mengapa Draf Disimpan di Sini?
Untuk mencegah artefak AI langsung masuk ke test suite utama tanpa verifikasi (*Anti-Hallucination Gate*).

## Struktur Output AI per Fitur:
```text
generated/<nama-fitur>/
├── test-matrix.md        # Matriks cakupan, edge cases, asumsi & open questions
├── <fitur>.feature       # Draf skenario BDD Gherkin dengan tag (@automated, @smoke, @p0, dll)
├── <fitur>.screen.ts     # Draf Screen Object (stub selector)
└── <fitur>.steps.ts      # Draf Step Definitions
```

## 🚪 Aturan Promosi ke Suite Utama (Human Gate):
1. **Verifikasi Asumsi:** QA Lead/SDET meninjau bagian *Open Questions & Asumsi* di `test-matrix.md`.
2. **Validasi Selector:** Pastikan selector pada Screen Object sesuai dengan aplikasi aktual (`adb shell uiautomator dump`).
3. **Cek Step Reuse:** Pastikan step Gherkin tidak menduplikasi step yang sudah ada di `shared/steps/` atau modul lain.
4. **Promosi:** Pindahkan file yang sudah divalidasi ke:
   - `<fitur>.feature` ➡️ `features/<fitur>/features/`
   - `<fitur>.screen.ts` ➡️ `features/<fitur>/pages/`
   - `<fitur>.steps.ts` ➡️ `features/<fitur>/steps/`
5. **Update Dokumentasi:** Jalankan `npm run docs:generate` untuk memperbarui spesifikasi dan RTM resmi.
