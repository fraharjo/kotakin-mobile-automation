import { Given, When, Then } from '@wdio/cucumber-framework';
import ItemScreen from '../pages/item.screen';
import BoxScreen from '../../box/pages/box.screen';

Given('the user has opened an existing box detail screen', async () => {
  await BoxScreen.ensureOnMyStash();
  // Ensure at least one box exists
  const boxExists = await BoxScreen.isBoxInList('Elektronik');
  if (boxExists) {
    await BoxScreen.openBoxDetail('Elektronik');
  } else {
    await BoxScreen.openNewBoxForm();
    await BoxScreen.fillBoxForm('Default Box', 'Auto generated');
    await BoxScreen.submitCreateBox();
    await BoxScreen.openBoxDetail('Default Box');
  }
});

When('the user taps the "Add new item" button', async () => {
  await ItemScreen.openAddItem();
});

When('the user captures a photo and proceeds to item details', async () => {
  await ItemScreen.capturePhotoAndProceed();
});

When('the user enters item title {string} and description {string}', async (title: string, description: string) => {
  await ItemScreen.fillItemDetails(title, description);
});

When('the user enters item title {string} and leaves description blank', async (title: string) => {
  await ItemScreen.fillItemDetails(title, '');
});

When('the user leaves the item title empty', async () => {
  await browser.pause(500);
});

When('the user increases the item quantity by {int}', async (count: number) => {
  await ItemScreen.adjustQuantity(count, 'increase');
});

When('the user decreases the item quantity by {int}', async (count: number) => {
  await ItemScreen.adjustQuantity(count, 'decrease');
});

Then('the item quantity indicator should display {int}', async (expectedQuantity: number) => {
  const actualQuantity = await ItemScreen.getQuantityValue();
  expect(actualQuantity).toBe(expectedQuantity);
});

When('the user taps the Save Item button', async () => {
  await ItemScreen.submitSaveItem();
});

Then('the item {string} should be listed inside the box', async (itemName: string) => {
  const exists = await ItemScreen.isItemInBox(itemName);
  expect(exists).toBe(true);
});

Then('the user should remain on the "Add Item Details" screen', async () => {
  const isDisplayed = await ItemScreen.isAddItemDetailsFormDisplayed();
  expect(isDisplayed).toBe(true);
});

When('the user taps the Cancel button', async () => {
  await ItemScreen.clickCancel();
});

Then('the user should be returned to the box detail screen without saving', async () => {
  const isReady = await BoxScreen.isBoxDetailReady();
  expect(isReady).toBe(true);
});

When('the user taps the Remove photo button', async () => {
  await ItemScreen.removePhoto();
});

When('the user enters maximum boundary title of {int} characters and a multiline description of {int} characters', async (titleLen: number, descLen: number) => {
  await ItemScreen.fillLongItemDetails(titleLen, descLen);
});

Then('the maximum length item should be listed inside the box', async () => {
  const exists = await ItemScreen.isMaxLengthItemInBox();
  expect(exists).toBe(true);
});

Then('the photo should be removed from the item draft', async () => {
  const isRemoved = await ItemScreen.isPhotoRemoved();
  expect(isRemoved).toBe(true);
});
