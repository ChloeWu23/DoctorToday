import { defineVitestConfig } from "nuxt-vitest/config";
import Vue from "@vitejs/plugin-vue";

export default defineVitestConfig({
  //plugins: [Vue()],
  test: {
    globals: true,
    environment: "nuxt",
    root: ".", //Define the root
  },
});