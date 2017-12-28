module.exports = function (req, res, next) {
  res.locals.locale = req.cookies.locale || 'en-US'
  next()
}
