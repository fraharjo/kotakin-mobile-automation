# Mobile Apps Directory 📱

Direktori ini digunakan untuk menyimpan file aplikasi Android (`.apk`) atau iOS (`.ipa` / `.app`) yang akan diuji oleh framework automasi.

> [!NOTE]
> File binary `.apk` sengaja diabaikan (*ignored*) dari riwayat Git agar ukuran repository tetap ringan, cepat di-clone, dan mematuhi batas rekomendasi file GitHub (< 50 MB).

---

## 📥 Download File APK Kotakin

Untuk menjalankan pengujian otomasi, unduh file APK resmi **Kotakin** yang telah disediakan di GitHub Releases:

* **Halaman Rilis:** 👉 [GitHub Releases v1.0.0](https://github.com/fraharjo/kotakin-mobile-automation/releases/tag/v1.0.0)
* **Direct Download Link:** 👉 [Download kotakin.apk](https://github.com/fraharjo/kotakin-mobile-automation/releases/download/v1.0.0/kotakin.apk)

### Cara Cepat via Terminal (One-Liner):
Jalankan perintah ini di root folder project:
```bash
curl -L -o apps/kotakin.apk https://github.com/fraharjo/kotakin-mobile-automation/releases/download/v1.0.0/kotakin.apk
```

Pastikan file tersimpan di path:  
`apps/kotakin.apk`

---

## 🚀 Menjalankan Pengujian di Android Emulator

1. Pastikan **Android Emulator** sudah aktif (`adb devices`).
2. Jalankan seluruh test suite (49 skenario):
   ```bash
   npm run test:android
   ```
3. Atau jalankan per fitur modul:
   ```bash
   npm run test:feature:box
   npm run test:feature:item
   npm run test:feature:settings
   npm run test:feature:onboarding
   npm run test:feature:scanner
   ```
