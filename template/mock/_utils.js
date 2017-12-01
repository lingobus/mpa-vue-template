module.exports = function json_with_testcase_404_500_200 (router, url, json) {
  router.get(url, function (req, res) {
    res.set('Content-Type', 'application/json')
    const tc = req.query.testcase
    switch (tc) {
      case '404':
        res.status(404).end()
        break
      case '500':
        res.status(500).end()
        break
      case '0':
        res.send({
          success: true,
          data: null
        })
        break
      default:
        res.send(json)
    }
  })
}
