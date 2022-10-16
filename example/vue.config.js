const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  chainWebpack: (config) => {
    const tsRule = config.module.rule("ts");
    tsRule
      .use("infish-module-loader")
      .loader("../packages/module/webpack/loader.js")
      .options({
        include: [path.resolve(__dirname, "./src/modules")],
      })
      .before("ts-loader");
  },
});
