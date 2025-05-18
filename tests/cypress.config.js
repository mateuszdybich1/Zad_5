const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: "xxx",
  e2e: {
    baseUrl: 'http://localhost:8080',
    // Configure your E2E tests here
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts}"
  },
})