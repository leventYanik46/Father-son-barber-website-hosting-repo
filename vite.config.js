// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // disable esbuild’s CSS minification
    cssMinify: false,
    // (optional) produce sourcemaps so you can trace source of color-mix()
    sourcemap: true,
  },
});