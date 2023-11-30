const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://event-organization-n2w5.onrender.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
