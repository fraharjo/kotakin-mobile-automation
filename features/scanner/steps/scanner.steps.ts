import { When, Then } from '@wdio/cucumber-framework';
import ScannerScreen from '../pages/scanner.screen';

When('the user taps the "Scan" button on the dashboard', async () => {
  await ScannerScreen.openScanner();
});

Then('the QR scanner view or permission prompt should be displayed', async () => {
  const isDisplayed = await ScannerScreen.isScannerOrPermissionDisplayed();
  expect(isDisplayed).toBe(true);
});

Then('the app should display the permission prompt button "Grant camera permission"', async () => {
  const isDisplayed = await ScannerScreen.isPermissionPromptDisplayed();
  expect(isDisplayed).toBe(true);
});

When('the user dismisses the scanner view', async () => {
  await ScannerScreen.dismissScanner();
});
