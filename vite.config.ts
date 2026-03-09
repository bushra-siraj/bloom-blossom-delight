import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  // FIX: This ensures assets load from the correct GitHub folder
  base: '/bloom-blossom-delight/',
  server: {
    host: "::",
    port: 8080,
  },
  // FIX: Only use the tagger in development mode to avoid 'eval' errors in production
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // This helps ensure the final code is clean for GitHub Pages
    outDir: 'dist',
  }
}));
