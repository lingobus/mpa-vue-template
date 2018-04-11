const $path = require('path')
const glob = require('glob')
require('colors')

module.exports = function (app) {
  // load middlewares
  glob.sync($path.join(__dirname, './*.middleware.js')).forEach(function (file) {
    console.log(('Loading middleware from ' + file).green.bold)
    app.use(require(file))
  })
}
