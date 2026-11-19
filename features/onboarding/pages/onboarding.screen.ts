import { BaseScreen } from '../../../shared/pages/base.screen';
import { i18n } from '../../../shared/constants/i18n';

class OnboardingScreen extends BaseScreen {
  get btnNext() {
    return $('~Next');
  }

  get btnSkip() {
    return this.getByI18n(i18n.common.skip);
  }

  get btnGotIt() {
    return this.getByI18n(i18n.common.gotIt);
  }

  get headerMyStash() {
    return this.getByI18n(i18n.dashboard.header);
  }

  getStepHeader(expectedTitle: string) {
    return $(`//android.widget.TextView[@text="${expectedTitle}"]`);
  }

  async advanceAllSteps(): Promise<void> {
    for (let i = 0; i < 3; i++) {
      const nextBtn = await this.btnNext;
      if (await nextBtn.isDisplayed()) {
        await nextBtn.click();
        await browser.pause(500);
      }
    }
  }

  async advanceOneStep(): Promise<void> {
    await this.click(this.btnNext);
    await browser.pause(500);
  }

  async clickGotIt(): Promise<void> {
    await this.click(this.btnGotIt);
  }

  async clickSkip(): Promise<void> {
    await this.click(this.btnSkip);
  }

  async isHeaderTitleDisplayed(expectedTitle: string): Promise<boolean> {
    const headerEl = this.getStepHeader(expectedTitle);
    await headerEl.waitForDisplayed({ timeout: 10000 });
    return await headerEl.isDisplayed();
  }

  async isMyStashDisplayed(): Promise<boolean> {
    const el = await this.headerMyStash;
    await el.waitForDisplayed({ timeout: 10000 });
    return await el.isDisplayed();
  }
}

export default new OnboardingScreen();
