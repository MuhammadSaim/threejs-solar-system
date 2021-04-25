const Encore = require("@symfony/webpack-encore");

Encore.setOutputPath("assets")
  .setPublicPath("/assets")
  .addEntry("app", "./src/js/app.js")
  .disableSingleRuntimeChunk()
  .enableSassLoader()
  .cleanupOutputBeforeBuild();

module.exports = Encore.getWebpackConfig();
