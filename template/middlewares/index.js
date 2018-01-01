const $path = require('path')
const glob = require('glob')
require('colors')

module.exports = function (app) {
  // load middlewares
  glob.glob($path.join(__dirname, './*.middleware.js'), function (err, files) {
    if (err) {
      console.error('Load middleware failed!'.red.bold)
    } else {
      files.forEach(function (file) {
        console.log(('Loading middleware from ' + file).green.bold)
        app.use(require(file))
      })
    }
  })
}
