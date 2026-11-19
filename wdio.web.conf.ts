import { config as sharedConfig } from './wdio.shared.conf';

export const config: WebdriverIO.Config = {
  ...sharedConfig,
  baseUrl: 'https://www.saucedemo.com',
  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: [
          '--no-sandbox',
          '--disable-infobars',
          '--disable-dev-shm-usage',
          '--window-size=1440,900'
          // Uncomment for headless mode in CI:
          // '--headless',
          // '--disable-gpu'
        ]
      }
    }
  ]
};
