module.exports = function (req, res, next) {
  res.locals.nols = +(req.cookies.nols == '1')
  res.locals.lsv = req.cookies.lsv
  next()
}
