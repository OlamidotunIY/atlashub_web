// Run: pnpm openapi-ts
import { defineConfig } from "@hey-api/openapi-ts"
import { loadEnv } from "vite"

const { VITE_API_BASE_URL } = loadEnv("development", process.cwd(), "VITE_")

if (!VITE_API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL must be set in .env")
}

export default defineConfig({
  input: new URL("/v3/api-docs", VITE_API_BASE_URL).toString(),
  output: {
    path: "src/shared/api/generated",
    format: "prettier",
  },
  plugins: ["@hey-api/client-axios"],
})
