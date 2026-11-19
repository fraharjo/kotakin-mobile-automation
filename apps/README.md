# Mobile Apps Directory 📱

This directory is used to store the Android application binary (`kotakin.apk`) tested by the automation framework.

> [!NOTE]
> Application binary files (`.apk`) are intentionally excluded from Git history via `.gitignore` to keep the repository lightweight, clean, and compliant with third-party binary distribution policies.

---

## 📥 Official Kotakin APK Source

As instructed by the official Kotakin developer (**BmoLab**), please download the APK directly from the official website or the developer's closed testing program:

* 🌐 **Official Website:** 👉 [https://bmolab.web.id/kotakin](https://bmolab.web.id/kotakin)
* 🧪 **Testing Program:** 👉 [Join Closed Testing](https://bmolab.web.id/kotakin/join)
* ✉️ **Developer Contact:** `bmo.techdev@gmail.com`

---

## 📂 Placing the APK in the Project

1. Download the APK file from the developer website linked above.
2. Place the file inside the `apps/` directory named as:
   ```text
   apps/kotakin.apk
   ```
3. This file **will not be committed to Git** as it is listed in `.gitignore`.

---

## 🚀 Running Tests on Android Emulator

After `apps/kotakin.apk` is placed in this directory:

1. Ensure the **Android Emulator** is running and detected (`adb devices`).
2. Run the full automated test suite:
   ```bash
   npm run test:android
   ```
3. Or run by priority tag:
   ```bash
   npm run test:smoke       # Run P0 critical scenarios (@smoke)
   npm run test:regression  # Run full regression scenarios (@regression)
   ```
