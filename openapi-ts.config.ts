// Run: pnpm openapi-ts
import { defineConfig } from "@hey-api/openapi-ts"

export default defineConfig({
  input: "http://localhost:8080/v3/api-docs",
  output: {
    path: "src/shared/api/generated",
    format: "prettier",
  },
  plugins: ["@hey-api/client-axios"],
})
