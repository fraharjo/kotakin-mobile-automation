# Requirements Directory 📋

Folder ini adalah **gerbang input (Stage 1)** untuk spesifikasi fitur yang akan diuji sebelum skenario otomatisasi dibuat.

## Format Input yang Didukung:
1. **Product Requirement Document (PRD)** dalam format Markdown (`.md`).
2. **User Story & Acceptance Criteria (AC)** dari Jira / linear.
3. **Catatan Alur UI / Link Figma**.

## Cara Penggunaan dengan AI Skill:
Letakkan dokumen spesifikasi fitur baru di folder ini (contoh: `requirements/box-sharing.md`), kemudian panggil agent:
```text
"Gunakan skill nexus-test-generator untuk merancang skenario pengujian berdasarkan requirements/box-sharing.md dengan target platform Android, simpan hasil draf ke generated/box-sharing/"
```
