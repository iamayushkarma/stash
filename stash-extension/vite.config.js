// vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0", // This allows external access
    port: 5000,
  },
  build: {
    rollupOptions: {
      // This is the only entry point Vite will build
      input: {
        content: resolve(__dirname, "src/index.jsx"),
      },
      output: {
        // Keep the output file names predictable
        entryFileNames: "[name].js",
        // Ensure CSS is also named predictably
        assetFileNames: "[name].[ext]",
      },
    },
    // Set to false to prevent minification, which can sometimes cause issues.
    minify: false,
  },
});
