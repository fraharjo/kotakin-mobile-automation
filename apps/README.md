# Mobile Apps Directory 📱

Direktori ini digunakan untuk menyimpan file binary aplikasi Android (`.apk`) yang akan diuji oleh framework automasi.

> [!NOTE]
> File binary `.apk` sengaja diabaikan (*ignored*) dari riwayat Git (`.gitignore`) agar ukuran repository tetap ringan, cepat di-clone, dan mematuhi batas rekomendasi file GitHub (< 50 MB).

---

## 📥 Unduh File APK Kotakin (Aman & Terverifikasi)

Untuk menjalankan pengujian otomasi, unduh file APK resmi **Kotakin** (`v1.0.0`):

* **Halaman Rilis:** 👉 [GitHub Releases v1.0.0](https://github.com/fraharjo/kotakin-mobile-automation/releases/tag/v1.0.0)
* **Direct Download Link:** 👉 [Download kotakin.apk](https://github.com/fraharjo/kotakin-mobile-automation/releases/download/v1.0.0/kotakin.apk)
* **SHA-256 Checksum:** `8498588707f80bc4698bd5ba8591ff5cb1ba84b9dee22ee9ba9b0f6fa5188994`

### Cara 1: Menggunakan Script Otomatis (Direkomendasikan)
Script ini otomatis mengunduh APK dan memverifikasi integritas file menggunakan SHA-256 checksum:
```bash
npm run apk:download
```

### Cara 2: Manual via Curl & Verifikasi Checksum
```bash
# 1. Unduh APK
curl -L -o apps/kotakin.apk https://github.com/fraharjo/kotakin-mobile-automation/releases/download/v1.0.0/kotakin.apk

# 2. Verifikasi Checksum (macOS / Linux)
shasum -a 256 apps/kotakin.apk
# Pastikan output cocok dengan: 8498588707f80bc4698bd5ba8591ff5cb1ba84b9dee22ee9ba9b0f6fa5188994
```

---

## 🚀 Menjalankan Pengujian di Android Emulator

1. Pastikan **Android Emulator** sudah aktif (`adb devices`).
2. Jalankan seluruh test suite otomatis:
   ```bash
   npm run test:android
   ```
3. Atau jalankan berdasarkan tag prioritas:
   ```bash
   npm run test:smoke       # Menjalankan skenario kritis P0 (@smoke)
   npm run test:regression  # Menjalankan seluruh skenario regresi (@regression)
   ```
