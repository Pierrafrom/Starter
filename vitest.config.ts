import { mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(viteConfig, {
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup/setupTests.ts"],
    globals: true
  }
});
