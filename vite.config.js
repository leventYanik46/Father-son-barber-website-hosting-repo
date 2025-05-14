// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  // …your existing Astro config…
  vite: {
    build: {
      // disable all minification (JS + CSS)
      minify: false,
      // explicitly disable CSS minification too
      cssMinify: false,
    },
  },
});