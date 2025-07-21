import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    react(),
    VitePWA({
      injectRegister: "script",
      registerType: "prompt",
      devOptions: {
        enabled: true,
        type: "module",
      },
      workbox: {
        cacheId: new Date().getTime().toString(),
        globPatterns: ["**/*.{js,css,html,ico,png,svg,ttf}"],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => {
              return url.pathname.includes("wishlist.json");
            },
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      includeAssets: [
        "favicon.ico",
        "favicon.svg",
        "favicon-96x96.png",
        "apple-touch-icon.png",
        "web-app-manifest-192x192.png",
        "web-app-manifest-512x512.png",
        "mask-icon.svg",
      ],
      manifest: {
        name: "Your Wishes",
        short_name: "Wishes",
        description: "A simple Wishlist PWA application",
        theme_color: "#e0dac0",
        background_color: "#ffffff",
        display: "standalone",
        start_url: ".",
        orientation: "portrait-primary",
        icons: [
          {
            src: "/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
