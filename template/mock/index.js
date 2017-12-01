var router = require('express').Router()
function apiurl (url) { return '/api' + url}

// comment out lines when corresponding API is ready
// router.use(apiurl('/user'), require('./user'))


module.exports = router
