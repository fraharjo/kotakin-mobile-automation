import { BaseScreen } from '../../../shared/pages/base.screen';
import { i18n } from '../../../shared/constants/i18n';

class BoxScreen extends BaseScreen {
  // --- Dashboard Locators ---
  get btnNewBox() {
    return this.getByI18n(i18n.dashboard.btnNewBox);
  }

  get inputSearch() {
    return $('~Search boxes');
  }

  get btnClearSearch() {
    return this.getByI18n(i18n.dashboard.clearSearch);
  }

  get headerMyStash() {
    return this.getByI18n(i18n.dashboard.header);
  }

  get textNoResults() {
    return this.getByI18n(i18n.dashboard.noResults);
  }

  get textNoItemsMatch() {
    return this.getByI18n(i18n.dashboard.noItemsMatch);
  }

  // --- Creation Form Locators ---
  get formTitleNewBox() {
    return this.getByI18n(i18n.box.formTitleNew);
  }

  get inputBoxName() {
    return $('~Box name');
  }

  get inputDescription() {
    return $('~Description');
  }

  get inputLocation() {
    return $('~Location');
  }

  get btnCreateBox() {
    return this.getByI18n(i18n.box.btnCreateBox);
  }

  get btnGoBack() {
    return this.getByI18n(i18n.common.goBack);
  }

  // --- Detail Screen Locators ---
  get btnAddNewItem() {
    return this.getByI18n(i18n.box.btnAddNewItem);
  }

  get btnShowQRCode() {
    return this.getByI18n(i18n.box.btnShowQRCode);
  }

  get btnExpandActions() {
    return this.getByI18n(i18n.box.btnExpandActions);
  }

  get btnCollapseActions() {
    return this.getByI18n(i18n.box.btnCollapseActions);
  }

  get btnAddToFavorites() {
    return this.getByI18n(i18n.box.btnAddToFavorites);
  }

  get btnRemoveFromFavorites() {
    return this.getByI18n(i18n.box.btnRemoveFromFavorites);
  }

  get btnEditBox() {
    return this.getByI18n(i18n.box.btnEditBox);
  }

  get btnDeleteBox() {
    return this.getByI18n(i18n.box.btnDeleteBox);
  }

  get btnSaveChanges() {
    return this.getByI18n(i18n.common.saveChanges);
  }

  get btnCancelEdit() {
    return this.getByI18n(i18n.common.cancel);
  }

  get dialogDeleteBox() {
    return this.getByI18n(i18n.box.dialogDeleteTitle);
  }

  get btnCancelDeletion() {
    return this.getByI18n(i18n.common.cancel);
  }

  get btnConfirmDeletion() {
    return this.getByI18n(i18n.common.delete);
  }

  get headerFormEditBox() {
    return this.getByI18n(i18n.box.formTitleEdit);
  }

  getColorButton(colorName: string) {
    return $(`~${colorName}`);
  }

  getBoxItem(boxName: string) {
    return $(`//android.widget.TextView[@text="${boxName}"]`);
  }

  // --- Actions ---
  async ensureOnMyStash(): Promise<void> {
    const skipBtn = await this.getByI18n(i18n.common.skip);
    const isSkipVisible = await skipBtn.isDisplayed().catch(() => false);
    if (isSkipVisible) {
      await skipBtn.click();
      await browser.pause(500);
    }
    const myStash = await this.headerMyStash;
    await myStash.waitForDisplayed({ timeout: 10000 });
  }

  async openNewBoxForm(): Promise<void> {
    await this.click(this.btnNewBox);
  }

  async fillBoxForm(name: string, description: string): Promise<void> {
    await this.setValue(this.inputBoxName, name);
    if (description) {
      await this.setValue(this.inputDescription, description);
    }
  }

  async selectColorAndLocation(color: string, location: string): Promise<void> {
    if (color) {
      const colorBtn = this.getColorButton(color);
      if (await colorBtn.isDisplayed()) {
        await colorBtn.click();
      }
    }
    if (location) {
      await this.setValue(this.inputLocation, location);
    }
  }

  async submitCreateBox(): Promise<void> {
    if (await browser.isKeyboardShown()) {
      await browser.hideKeyboard();
    }
    await this.click(this.btnCreateBox);
  }

  async searchBox(keyword: string): Promise<void> {
    await this.setValue(this.inputSearch, keyword);
  }

  async clearSearch(): Promise<void> {
    await this.click(this.btnClearSearch);
  }

  async getSearchInputValue(): Promise<string> {
    return await this.getText(this.inputSearch);
  }

  async openBoxDetail(boxName: string): Promise<void> {
    const boxEl = this.getBoxItem(boxName);
    await this.click(boxEl);
  }

  async isBoxInList(boxName: string): Promise<boolean> {
    const boxEl = this.getBoxItem(boxName);
    return await boxEl.waitForDisplayed({ timeout: 10000 }).then(() => true).catch(() => false);
  }

  async expandActionsMenu(): Promise<void> {
    const expandBtn = await this.btnExpandActions;
    await expandBtn.waitForDisplayed({ timeout: 10000 });
    await expandBtn.click();
    await browser.pause(500);
  }

  async addToFavorites(): Promise<void> {
    await this.click(this.btnAddToFavorites);
  }

  async removeFromFavorites(): Promise<void> {
    await this.click(this.btnRemoveFromFavorites);
  }

  async isActionOptionDisplayed(actionName: string): Promise<boolean> {
    const option = $(`~${actionName}`);
    await option.waitForDisplayed({ timeout: 10000 });
    return await option.isDisplayed();
  }

  async openEditBox(): Promise<void> {
    await this.click(this.btnEditBox);
  }

  async updateBoxDetails(name: string, location: string): Promise<void> {
    if (name) {
      await this.setValue(this.inputBoxName, name);
    }
    if (location) {
      await this.setValue(this.inputLocation, location);
    }
  }

  async clearBoxName(): Promise<void> {
    const input = await this.inputBoxName;
    await input.click();
    await input.clearValue();
    await input.setValue('');
  }

  async saveEditChanges(): Promise<void> {
    if (await browser.isKeyboardShown()) {
      await browser.hideKeyboard();
    }
    await this.click(this.btnSaveChanges);
  }

  async cancelEdit(): Promise<void> {
    await this.click(this.btnCancelEdit);
  }

  async isEditBoxFormDisplayed(): Promise<boolean> {
    const alertTitle = this.getByI18n(i18n.box.nameRequiredAlert);
    const isAlertVisible = await alertTitle.waitForDisplayed({ timeout: 3000 }).then(() => true).catch(() => false);
    if (isAlertVisible) {
      const okBtn = this.getByI18n(i18n.common.ok);
      if (await okBtn.isDisplayed().catch(() => false)) {
        await okBtn.click();
      }
      return true;
    }

    const isHeaderVisible = await this.headerFormEditBox.waitForDisplayed({ timeout: 5000 }).then(() => true).catch(() => false);
    const isSaveBtnVisible = await this.btnSaveChanges.isDisplayed().catch(() => false);
    return isHeaderVisible || isSaveBtnVisible;
  }

  async openDeleteDialog(): Promise<void> {
    await this.click(this.btnDeleteBox);
  }

  async cancelDeletion(): Promise<void> {
    await this.click(this.btnCancelDeletion);
  }

  async confirmDeletion(): Promise<void> {
    await this.click(this.btnConfirmDeletion);
  }

  async isDeleteDialogDisplayed(): Promise<boolean> {
    const dialog = await this.dialogDeleteBox;
    await dialog.waitForDisplayed({ timeout: 10000 });
    return await dialog.isDisplayed();
  }

  async isBoxTitleDisplayed(title: string): Promise<boolean> {
    const titleEl = $(`//android.widget.TextView[@text="${title}"]`);
    await titleEl.waitForDisplayed({ timeout: 10000 });
    return await titleEl.isDisplayed();
  }

  async isBoxDetailReady(): Promise<boolean> {
    const addBtn = await this.btnAddNewItem;
    const qrBtn = await this.btnShowQRCode;
    await addBtn.waitForDisplayed({ timeout: 10000 });
    return (await addBtn.isDisplayed()) && (await qrBtn.isDisplayed());
  }

  async isNewBoxFormDisplayed(): Promise<boolean> {
    const alertTitle = this.getByI18n(i18n.box.nameRequiredAlert);
    const isAlertVisible = await alertTitle.waitForDisplayed({ timeout: 3000 }).then(() => true).catch(() => false);
    if (isAlertVisible) {
      const okBtn = this.getByI18n(i18n.common.ok);
      if (await okBtn.isDisplayed().catch(() => false)) {
        await okBtn.click();
      }
      return true;
    }

    const isTitleVisible = await this.formTitleNewBox.waitForDisplayed({ timeout: 5000 }).then(() => true).catch(() => false);
    const isBtnVisible = await this.btnCreateBox.isDisplayed().catch(() => false);
    return isTitleVisible || isBtnVisible;
  }

  async getDuplicateBoxCount(boxName: string): Promise<number> {
    const boxes = await $$(`//android.widget.TextView[@text="${boxName}"]`);
    return boxes.length;
  }

  async isSearchHandledWithoutCrash(): Promise<boolean> {
    const header = await this.headerMyStash;
    return await header.isDisplayed();
  }

  async isEmptySearchResultsDisplayed(): Promise<boolean> {
    const noResults = await this.textNoResults;
    const noItems = await this.textNoItemsMatch;
    await noResults.waitForDisplayed({ timeout: 10000 });
    return (await noResults.isDisplayed()) || (await noItems.isDisplayed());
  }
}

export default new BoxScreen();
