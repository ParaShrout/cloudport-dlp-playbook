import type { NextConfig } from "next";

// Set STATIC_EXPORT=1 (and optionally BASE_PATH=/repo-name) to build the
// static site that GitHub Pages serves. Plain `next dev` / `next build` are
// unaffected.
const staticExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.BASE_PATH?.replace(/\/$/, "") || undefined;

const nextConfig: NextConfig = {
  // Cache Components (PPR) needs a server, so the static export builds
  // without it. Every page is fully prerendered either way.
  ...(staticExport
    ? {
        output: "export",
        trailingSlash: true,
        basePath,
        images: { unoptimized: true },
      }
    : { cacheComponents: true, partialPrefetching: true }),
  env: { NEXT_PUBLIC_BASE_PATH: basePath ?? "" },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
