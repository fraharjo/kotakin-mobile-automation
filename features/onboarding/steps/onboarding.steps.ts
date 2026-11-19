import { Given, When, Then } from '@wdio/cucumber-framework';
import OnboardingScreen from '../pages/onboarding.screen';

Given('the user opens the Kotakin app', async () => {
  await browser.pause(1000);
});

When('the user advances through all onboarding steps using the Next button', async () => {
  await OnboardingScreen.advanceAllSteps();
});

When('the user advances one step forward using the Next button', async () => {
  await OnboardingScreen.advanceOneStep();
});

When('the user taps the Got it button on the final step', async () => {
  await OnboardingScreen.clickGotIt();
});

When('the user taps the Skip button on the current onboarding step', async () => {
  await OnboardingScreen.clickSkip();
});

Then('the onboarding header should display {string}', async (expectedTitle: string) => {
  const isDisplayed = await OnboardingScreen.isHeaderTitleDisplayed(expectedTitle);
  expect(isDisplayed).toBe(true);
});

Then('the user should be redirected to the "My Stash" dashboard', async () => {
  const isDisplayed = await OnboardingScreen.isMyStashDisplayed();
  expect(isDisplayed).toBe(true);
});
