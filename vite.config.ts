import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: "https://julianromana.github.io/find-my-kanji",
  plugins: [vue()],
});
