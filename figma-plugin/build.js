// build.js — bundles the Figma plugin for development and production
// Run: node build.js          → single build
//      node build.js --watch  → watch mode

const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

const watch = process.argv.includes("--watch");

// Inline ui.html as __html__ string into the plugin bundle
const uiHtml = fs.readFileSync(path.join(__dirname, "src/ui.html"), "utf8");

const buildOptions = {
  entryPoints: ["src/plugin.ts"],
  bundle: true,
  outfile: "dist/plugin.js",
  platform: "browser",
  target: ["es6"],
  define: {
    __html__: JSON.stringify(uiHtml),
  },
  logLevel: "info",
};

if (watch) {
  esbuild.context(buildOptions).then((ctx) => {
    ctx.watch();
    console.log("Watching for changes…");
  });
} else {
  esbuild.build(buildOptions).then(() => {
    console.log("Build complete → dist/plugin.js");
  });
}