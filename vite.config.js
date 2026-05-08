import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative URLs in production fix GitHub Pages white screens (scripts load from ./assets/...).
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === "build" ? "./" : "/",
}));
