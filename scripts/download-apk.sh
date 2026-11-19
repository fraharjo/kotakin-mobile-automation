#!/usr/bin/env bash
# ==============================================================================
# Kotakin APK Secure Downloader with SHA-256 Checksum Verification
# ==============================================================================

set -e

APK_VERSION="v1.0.0"
APK_FILENAME="kotakin.apk"
APK_URL="https://github.com/fraharjo/kotakin-mobile-automation/releases/download/${APK_VERSION}/${APK_FILENAME}"
EXPECTED_SHA256="8498588707f80bc4698bd5ba8591ff5cb1ba84b9dee22ee9ba9b0f6fa5188994"
TARGET_DIR="./apps"
TARGET_FILE="${TARGET_DIR}/${APK_FILENAME}"

mkdir -p "${TARGET_DIR}"

echo "📦 Mengunduh Kotakin APK (${APK_VERSION})..."
curl -L --fail --progress-bar -o "${TARGET_FILE}" "${APK_URL}"

echo "🔍 Memverifikasi integritas SHA-256 checksum..."
if command -v shasum >/dev/null 2>&1; then
  ACTUAL_SHA256=$(shasum -a 256 "${TARGET_FILE}" | awk '{print $1}')
elif command -v sha256sum >/dev/null 2>&1; then
  ACTUAL_SHA256=$(sha256sum "${TARGET_FILE}" | awk '{print $1}')
else
  echo "⚠️ Warning: shasum / sha256sum tidak ditemukan. Melewati verifikasi checksum."
  exit 0
fi

if [ "${ACTUAL_SHA256}" = "${EXPECTED_SHA256}" ]; then
  echo "✅ Checksum valid: ${ACTUAL_SHA256}"
  echo "🚀 APK siap digunakan di ${TARGET_FILE}"
else
  echo "❌ Error: Checksum mismatch!"
  echo "   Expected: ${EXPECTED_SHA256}"
  echo "   Actual:   ${ACTUAL_SHA256}"
  rm -f "${TARGET_FILE}"
  exit 1
fi
