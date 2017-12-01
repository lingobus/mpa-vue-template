module.exports = function (app) {
  // add more middlewares here
  app.use(require('./ls.js'))
  app.use(require('./i18n.js'))
}
