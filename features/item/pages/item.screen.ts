import { BaseScreen } from '../../../shared/pages/base.screen';

class ItemScreen extends BaseScreen {
  // --- Box Screen Trigger ---
  get btnAddNewItem() {
    return $('~Add new item');
  }

  // --- Photo Capture Screen ---
  get btnTakePhoto() {
    return $('~Take photo');
  }

  get btnDonePhotos() {
    return $('~Done adding photos');
  }

  get btnCloseCamera() {
    return $('~Close camera');
  }

  // --- Item Details Form ---
  get headerAddItemDetails() {
    return $('//android.widget.TextView[@text="Add Item Details" or contains(@text, "Item Details") or contains(@text, "Detail Barang")]');
  }

  get inputItemTitle() {
    return $('~Item title');
  }

  get inputItemDescription() {
    return $('~Item description');
  }

  get btnIncreaseQuantity() {
    return $('~Increase quantity');
  }

  get btnDecreaseQuantity() {
    return $('~Decrease quantity');
  }

  get inputQuantity() {
    return $('//android.widget.EditText[contains(@content-desc, "Quantity")]');
  }

  get btnSaveItem() {
    return $('~Save item');
  }

  get btnCancel() {
    return $('~Cancel');
  }

  get btnRemovePhoto() {
    return $('~Remove photo');
  }

  lastMaxLengthTitle: string = '';

  getItemElement(itemName: string) {
    return $(`//android.widget.TextView[@text="${itemName}"]`);
  }

  async fillLongItemDetails(titleLength: number, descLength: number): Promise<void> {
    const title = 'A'.repeat(titleLength);
    const desc = 'Description paragraph with details. '.repeat(Math.ceil(descLength / 36)).slice(0, descLength);
    this.lastMaxLengthTitle = title;
    await this.fillItemDetails(title, desc);
  }

  async isMaxLengthItemInBox(): Promise<boolean> {
    // Check if an item starting with AAAAA exists in the box
    const el = $('//android.widget.TextView[starts-with(@text, "AAAAA")]');
    await el.waitForDisplayed({ timeout: 10000 });
    return await el.isDisplayed();
  }

  async openAddItem(): Promise<void> {
    await this.click(this.btnAddNewItem);
  }

  async capturePhotoAndProceed(): Promise<void> {
    const takeBtn = await this.btnTakePhoto;
    await takeBtn.waitForDisplayed({ timeout: 10000 });
    await takeBtn.click();
    await browser.pause(1000);
    const doneBtn = await this.btnDonePhotos;
    await doneBtn.waitForDisplayed({ timeout: 10000 });
    await doneBtn.click();
    const detailsHeader = await this.headerAddItemDetails;
    await detailsHeader.waitForDisplayed({ timeout: 10000 });
  }

  async fillItemDetails(title: string, description: string): Promise<void> {
    if (title) {
      await this.setValue(this.inputItemTitle, title);
    }
    if (description) {
      await this.setValue(this.inputItemDescription, description);
    }
  }

  async adjustQuantity(amount: number, operation: 'increase' | 'decrease'): Promise<void> {
    const targetBtn = operation === 'increase' ? this.btnIncreaseQuantity : this.btnDecreaseQuantity;
    for (let i = 0; i < amount; i++) {
      await this.click(targetBtn);
      await browser.pause(300);
    }
  }

  async getQuantityValue(): Promise<number> {
    const qEl = await this.inputQuantity;
    const text = await qEl.getText();
    return parseInt(text, 10);
  }

  async submitSaveItem(): Promise<void> {
    if (await browser.isKeyboardShown()) {
      await browser.hideKeyboard();
    }
    await this.click(this.btnSaveItem);
  }

  async clickCancel(): Promise<void> {
    await this.click(this.btnCancel);
    // If confirmation dialog "Discard changes?" appears, confirm discard
    const discardBtn = $(
      '//*[@text="DISCARD" or @text="Discard" or @text="BUANG" or @text="Buang" or @resource-id="android:id/button1"]'
    );
    if (await discardBtn.waitForDisplayed({ timeout: 3000 }).catch(() => false)) {
      await discardBtn.click();
      await browser.pause(500);
    }
  }

  async removePhoto(): Promise<void> {
    await this.click(this.btnRemovePhoto);
  }

  async isPhotoRemoved(): Promise<boolean> {
    const removeBtn = await this.btnRemovePhoto;
    return !(await removeBtn.isDisplayed());
  }

  async isItemInBox(itemName: string): Promise<boolean> {
    const itemEl = this.getItemElement(itemName);
    await itemEl.waitForDisplayed({ timeout: 10000 });
    return await itemEl.isDisplayed();
  }

  async isAddItemDetailsFormDisplayed(): Promise<boolean> {
    // Check if validation alert dialog (e.g. "Please enter a title") is displayed
    const alertTitle = $(
      '//android.widget.TextView[@text="Please enter a title" or contains(@text, "title") or contains(@text, "judul") or @resource-id="android:id/alertTitle" or @resource-id="android:id/message"]'
    );
    const okBtn = $('//android.widget.Button[@text="OK" or @resource-id="android:id/button1"]');

    if (await alertTitle.waitForDisplayed({ timeout: 3000 }).catch(() => false)) {
      // Dismiss the validation alert to re-focus the form
      if (await okBtn.isDisplayed().catch(() => false)) {
        await okBtn.click();
        await browser.pause(500);
      }
    }

    const header = await this.headerAddItemDetails;
    await header.waitForDisplayed({ timeout: 5000 });
    return await header.isDisplayed();
  }
}

export default new ItemScreen();
