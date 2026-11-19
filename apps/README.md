# Mobile Apps Directory 📱

Direktori ini digunakan untuk menyimpan file binary aplikasi Android (`kotakin.apk`) yang akan diuji oleh framework automasi.

> [!NOTE]
> File binary `.apk` sengaja diabaikan (*ignored*) dari riwayat Git (`.gitignore`) agar ukuran repository tetap bersih, ringan, dan tidak menyimpan binary aplikasi pihak ketiga.

---

## 📥 Sumber Resmi File APK Kotakin

Sesuai anjuran dari pengembang resmi Kotakin (**BmoLab**), silakan dapatkan file APK langsung melalui website resmi atau program closed testing pengembang:

* 🌐 **Website Resmi:** 👉 [https://bmolab.web.id/kotakin](https://bmolab.web.id/kotakin)
* 🧪 **Program Testing:** 👉 [Gabung Closed Testing](https://bmolab.web.id/kotakin/join)
* ✉️ **Kontak Developer:** `bmo.techdev@gmail.com`

---

## 📂 Cara Menempatkan APK di Project

1. Unduh file APK dari website pengembang di atas.
2. Letakkan file tersebut di dalam folder `apps/` dengan nama:
   ```text
   apps/kotakin.apk
   ```
3. File ini **tidak akan ter-commit ke Git** karena sudah terdaftar di `.gitignore`.

---

## 🚀 Menjalankan Pengujian di Android Emulator

Setelah `apps/kotakin.apk` diletakkan di folder ini:

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
