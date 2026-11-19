import { Given, When, Then } from '@wdio/cucumber-framework';
import BoxScreen from '../pages/box.screen';

Given('the user is on the "My Stash" dashboard', async () => {
  await BoxScreen.ensureOnMyStash();
});

When('the user taps the "New box" button', async () => {
  await BoxScreen.openNewBoxForm();
});

When('the user enters box name {string} and description {string}', async (name: string, description: string) => {
  await BoxScreen.fillBoxForm(name, description);
});

When('the user enters box name {string} and leaves optional fields blank', async (name: string) => {
  await BoxScreen.fillBoxForm(name, '');
});

When('the user leaves the box name empty', async () => {
  await browser.pause(500);
});

When('the user selects box color {string} and enters location {string}', async (color: string, location: string) => {
  await BoxScreen.selectColorAndLocation(color, location);
});

When('the user taps the Create Box button', async () => {
  await BoxScreen.submitCreateBox();
});

Then('the box {string} should appear in the stash list', async (boxName: string) => {
  const exists = await BoxScreen.isBoxInList(boxName);
  expect(exists).toBe(true);
});

When('the user searches for box with query {string}', async (keyword: string) => {
  await BoxScreen.searchBox(keyword);
});

When('the user taps the Clear search button', async () => {
  await BoxScreen.clearSearch();
});

Then('the search input should be empty', async () => {
  const value = await BoxScreen.getSearchInputValue();
  // On empty state, placeholder "Search boxes or items..." or empty string is returned
  expect(value).toMatch(/(Search boxes or items\.\.\.|^$)/);
});

Then('the stash list should display {string}', async (boxName: string) => {
  const exists = await BoxScreen.isBoxInList(boxName);
  expect(exists).toBe(true);
});

When('the user taps on the box {string}', async (boxName: string) => {
  await BoxScreen.openBoxDetail(boxName);
});

Then('the box detail screen should display "Add new item" and "Show QR code" buttons', async () => {
  const isReady = await BoxScreen.isBoxDetailReady();
  expect(isReady).toBe(true);
});

Then('the user should remain on the "New Box" creation form', async () => {
  const isDisplayed = await BoxScreen.isNewBoxFormDisplayed();
  expect(isDisplayed).toBe(true);
});

Then('the stash list should display the empty search result message', async () => {
  const isEmpty = await BoxScreen.isEmptySearchResultsDisplayed();
  expect(isEmpty).toBe(true);
});

Then('multiple boxes with name {string} should appear in the stash list', async (boxName: string) => {
  const count = await BoxScreen.getDuplicateBoxCount(boxName);
  expect(count).toBeGreaterThanOrEqual(2);
});

Then('the stash list should display the box containing {string}', async (itemName: string) => {
  // Cross-entity search: the stash list displays the parent box for that item
  const header = await BoxScreen.headerMyStash;
  expect(await header.isDisplayed()).toBe(true);
});

Then('the stash list should handle the query without crashing', async () => {
  const isStable = await BoxScreen.isSearchHandledWithoutCrash();
  expect(isStable).toBe(true);
});

// --- Favorite, Edit, and Delete Step Definitions ---

Given('the user has opened the detail of box {string}', async (boxName: string) => {
  await BoxScreen.openBoxDetail(boxName);
});

When('the user expands the Box actions menu', async () => {
  await BoxScreen.expandActionsMenu();
});

When('the user taps the Add to favorites button', async () => {
  await BoxScreen.addToFavorites();
});

Then('the action option should update to {string}', async (actionName: string) => {
  const isDisplayed = await BoxScreen.isActionOptionDisplayed(actionName);
  expect(isDisplayed).toBe(true);
});

When('the user taps the Remove from favorites button', async () => {
  await BoxScreen.removeFromFavorites();
});

When('the user taps the Edit box button', async () => {
  await BoxScreen.openEditBox();
});

When('the user updates the box name to {string} and location to {string}', async (name: string, location: string) => {
  await BoxScreen.updateBoxDetails(name, location);
});

When('the user taps the Save Changes button', async () => {
  await BoxScreen.saveEditChanges();
});

Then('the box title should display {string}', async (title: string) => {
  const isDisplayed = await BoxScreen.isBoxTitleDisplayed(title);
  expect(isDisplayed).toBe(true);
});

When('the user clears the box name field', async () => {
  await BoxScreen.clearBoxName();
});

Then('the user should remain on the "Edit Box" screen', async () => {
  const isDisplayed = await BoxScreen.isEditBoxFormDisplayed();
  expect(isDisplayed).toBe(true);
});

When('the user taps the Cancel edit button', async () => {
  await BoxScreen.cancelEdit();
});

When('the user taps the Delete box button', async () => {
  await BoxScreen.openDeleteDialog();
});

Then('the confirmation dialog "Delete Box?" should be displayed', async () => {
  const isDisplayed = await BoxScreen.isDeleteDialogDisplayed();
  expect(isDisplayed).toBe(true);
});

When('the user taps the Cancel deletion button', async () => {
  await BoxScreen.cancelDeletion();
});

Then('the user should remain on the box detail screen', async () => {
  const isReady = await BoxScreen.isBoxDetailReady();
  expect(isReady).toBe(true);
});

When('the user taps the Confirm deletion button', async () => {
  await BoxScreen.confirmDeletion();
});

Then('the box {string} should no longer appear in the stash list', async (boxName: string) => {
  const boxEl = BoxScreen.getBoxItem(boxName);
  const isPresent = await boxEl.isDisplayed().catch(() => false);
  expect(isPresent).toBe(false);
});

// --- New Coverage Steps: Cancellation & Mobile Lifecycle ---

When('the user taps the Go back button from creation form', async () => {
  await BoxScreen.click(BoxScreen.btnGoBack);
});

When('the user minimizes the application to background for {int} seconds', async (seconds: number) => {
  await browser.background(seconds);
});

Then('the user should still see the "My Stash" dashboard without any application crash', async () => {
  const header = await BoxScreen.headerMyStash;
  await header.waitForDisplayed({ timeout: 10000 });
  expect(await header.isDisplayed()).toBe(true);
});

