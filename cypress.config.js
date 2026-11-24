const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1366,
  viewportHeight: 768,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,

  video: true,
  screenshotOnRunFailure: true,

  reporter: 'cypress-mochawesome-reporter',

  reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,
    reportPageTitle: 'QA Automation - E2E & API',
    reportTitle: 'SauceDemo & Swagger Petstore',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
  },
  e2e: {

    baseUrl: "https://www.saucedemo.com/",
    specPattern: "cypress/e2e/**/*.cy.js",
    testIsolation: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
});
