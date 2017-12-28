require('colors')
const glob = require('glob')
const $path = require('path')
var router = require('express').Router()

router.get('/', function (req, res) {
  res.render('index')
})

glob.glob($path.join(__dirname, './*.controller.js'), function (err, files) {
  if (err) {
    console.error('Load controlelrs failed!'.red.bold)
  } else {
    files.forEach(function (file) {
      console.log(('Loading controller from ' + file).green.bold)
      const fn = require(file)
      fn(router)
    })
  }
})


module.exports = router
