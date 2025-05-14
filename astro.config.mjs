import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import AutoImport from "astro-auto-import";
import { defineConfig } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import config from "./src/config/config.json";
import languagesJSON from "./src/config/language.json";
const { default_language } = config.settings;

const supportedLang = [...languagesJSON.map((lang) => lang.languageCode)];
const disabledLanguages = config.settings.disable_languages;
const filteredSupportedLang = supportedLang.filter(
  (lang) => !disabledLanguages.includes(lang)
);

let highlighterInstance;
async function getHighlighter() {
  if (!highlighterInstance) {
    const { getHighlighter } = await import("shiki");
    highlighterInstance = await getHighlighter({ theme: "one-dark-pro" });
  }
  return highlighterInstance;
}

export default defineConfig({
  site: config.site.base_url || "http://examplesite.com",
  base: config.site.base_path || "/",
  trailingSlash: config.site.trailing_slash ? "always" : "ignore",
  i18n: {
    locales: filteredSupportedLang,
    defaultLocale: default_language,
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      minify: false,
      cssMinify: false,
      sourcemap: true,
    },
    ssr: {
      // Ensure commonjs modules like react-lite-youtube-embed are bundled
      noExternal: ["react-lite-youtube-embed"],
    },
  },
  integrations: [
    react(),
    sitemap(),
    AutoImport({
      imports: [
        "@/shortcodes/Button",
        "@/shortcodes/Accordion",
        "@/shortcodes/Notice",
        "@/shortcodes/Video",
        "@/shortcodes/Youtube",
        "@/shortcodes/Tabs",
        "@/shortcodes/Tab",
      ],
    }),
    mdx(),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        { test: "Table of contents" },
      ],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
    extendDefaultPlugins: true,
    highlighter: getHighlighter,
  },
});
