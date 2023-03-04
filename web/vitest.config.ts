import { fileURLToPath } from "url";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    reporters: "vitest-sonar-reporter",
    outputFile: "sonar-report.xml",
    exclude: [...configDefaults.exclude, "**/e2e/**"],
    alias: {
      "~/": fileURLToPath(new URL("./src/", import.meta.url)),
    },
  },
});
