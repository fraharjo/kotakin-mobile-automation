import { When, Then } from '@wdio/cucumber-framework';
import SettingsScreen from '../pages/settings.screen';

When('the user opens the Settings screen', async () => {
  await SettingsScreen.openSettings();
});

When('the user selects the language option {string}', async (language: string) => {
  await SettingsScreen.switchLanguage(language);
});

Then('the language option {string} should be selected', async (language: string) => {
  const isSelected = await SettingsScreen.isLanguageSelected(language);
  expect(isSelected).toBe(true);
});

When('the user taps the "About Kotakin" button', async () => {
  await SettingsScreen.openAboutKotakin();
});

Then('the About screen should display the app version details', async () => {
  const isDisplayed = await SettingsScreen.isAppVersionDisplayed();
  expect(isDisplayed).toBe(true);
});

When('the user taps the Go back button', async () => {
  await SettingsScreen.goBack();
});

Then('the user should see the Settings screen header', async () => {
  const isDisplayed = await SettingsScreen.isSettingsHeaderDisplayed();
  expect(isDisplayed).toBe(true);
});

Then('the backup action button {string} should be displayed', async (buttonName: string) => {
  const isDisplayed = await SettingsScreen.isActionButtonDisplayed(buttonName);
  expect(isDisplayed).toBe(true);
});

Then('the restore action button {string} should be displayed', async (buttonName: string) => {
  const isDisplayed = await SettingsScreen.isActionButtonDisplayed(buttonName);
  expect(isDisplayed).toBe(true);
});
