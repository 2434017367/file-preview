const { defineConfig } = require('@vue/cli-service')
const path = require("path");

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: 'file-preview',
  chainWebpack: config => {
    config.resolve.alias.set('@$', resolve('src'))
    config.resolve.alias.set('@public', resolve('public'))
  },
  publicPath : './'
})
