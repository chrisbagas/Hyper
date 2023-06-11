import { fileURLToPath } from "url";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      reporter: ["text", "lcov"]
    },
    exclude: [...configDefaults.exclude],
    alias: {
      "~/": fileURLToPath(new URL("./src/", import.meta.url)),
    },
  },
});
