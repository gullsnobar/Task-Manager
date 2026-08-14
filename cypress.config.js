import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // Your Vite dev server URL
    baseUrl: "http://localhost:5173",

    // Viewport size (simulates a desktop browser)
    viewportWidth: 1280,
    viewportHeight: 720,

    // Timeout settings
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,

    // Don't record video by default (saves disk space)
    video: false,

    // Take screenshot only on failure
    screenshotOnRunFailure: true,

    setupNodeEvents() {
      // Node-level event listeners (if needed later)
    },
  },
});
