'use strict'
const fs = require('fs')
const colors = require('colors')
const env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod'

/**
 * read proxy table according to HOSTALIAS
 */
const proxyTableConfig = require('./proxy-table.js')
const hostalias = process.env.HOSTALIAS || 'prod'
const table = proxyTableConfig[hostalias]

/**
 * Merge dev proxy table if exists
 */
const devProxyTablePath = './proxy-table.dev.js'
if (fs.existsSync(devProxyTablePath)) {
  console.log('Using proxy-table.dev.js'.green.bold)
  Object.assign(table, require(devProxyTablePath))
} else {
  if (env === 'dev') {
    setTimeout(function () {
      const errMsg = '   proxy-table.dev.js is require in development mode   '
      const bar = '!'.repeat(errMsg.length)
      console.error(bar.red.bold)
      console.error(errMsg.red.bold)
      console.error('   cp proxy-table.dev.example.js proxy-table.dev.js'.red.bold)
      console.error(bar.red.bold)
    }, 5000)
  }
  console.log('Host alias: %s'.green.bold, hostalias)
}

const proxy = require('express-http-proxy')

module.exports = function (app) {
  // add more proxy entries if needed
  app.use('/api/', proxy(table.portal))
}
