import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    port: 3000, // Defines the development server port
  },
  plugins: [
    react(), // Enables React with SWC for fast builds
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Creates an alias for the src directory
    },
  },
});
