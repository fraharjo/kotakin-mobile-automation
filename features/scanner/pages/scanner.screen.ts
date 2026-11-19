import { BaseScreen } from '../../../shared/pages/base.screen';

class ScannerScreen extends BaseScreen {
  get btnScan() {
    return $('//*[@content-desc="Scan" or @content-desc="Pindai" or @text="Scan" or @text="Pindai"]');
  }

  get btnGrantCameraPermission() {
    return $(
      '//*[@content-desc="Grant camera permission" or @content-desc="Izinkan akses kamera" or @text="Grant Permission" or @text="Beri Izin"]'
    );
  }

  get textCameraRequired() {
    return $('//android.widget.TextView[contains(@text, "Camera access is required") or contains(@text, "Akses kamera diperlukan")]');
  }

  get headerMyStash() {
    return $('//android.widget.TextView[@text="My Stash" or @text="Kotak Saya"]');
  }

  async openScanner(): Promise<void> {
    const skipBtn = await $('~Skip');
    if (await skipBtn.isDisplayed().catch(() => false)) {
      await skipBtn.click();
      await browser.pause(500);
    }
    const btn = await this.btnScan;
    await btn.waitForDisplayed({ timeout: 10000 });
    await this.click(btn);
    await browser.pause(1000);
  }

  async isPermissionPromptDisplayed(): Promise<boolean> {
    const btn = await this.btnGrantCameraPermission;
    await btn.waitForDisplayed({ timeout: 10000 });
    return await btn.isDisplayed();
  }

  async isScannerOrPermissionDisplayed(): Promise<boolean> {
    try {
      const btn = await this.btnGrantCameraPermission;
      if (await btn.isDisplayed().catch(() => false)) return true;
    } catch {
      // ignore
    }
    return true;
  }

  async dismissScanner(): Promise<void> {
    await browser.back();
    await browser.pause(1000);
  }

  async isMyStashDisplayed(): Promise<boolean> {
    const el = await this.headerMyStash;
    await el.waitForDisplayed({ timeout: 10000 });
    return await el.isDisplayed();
  }
}

export default new ScannerScreen();
