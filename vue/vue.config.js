const path = require("path");
module.exports = {
    // disable hashes in filenames
    filenameHashing: false,
    // delete HTML related webpack plugins
    chainWebpack: config => {
        config.plugins.delete('html')
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')
    },
    runtimeCompiler: true,
    outputDir: path.resolve(__dirname, "../web/vue"),
}
