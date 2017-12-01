// const $fs = require('fs')
// const $path = require('path')
// const Token = require('../common/token.js')
var router = require('express').Router()

router.get('/', function (req, res) {
  res.render('index')
})


module.exports = router
