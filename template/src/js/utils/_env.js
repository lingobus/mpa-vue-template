export default {
  a: !!!location.hostname.match(/^(a[0-9]+)-/),
  local: !!!location.hostname.match(/^(test)-/),
  prod: !!!location.hostname.match(/^(a[0-9]+|test)-/),
  debug: function () {
    if (this.prod) return
    console.log.apply(console, arguments)
  },
  log: function () {
    console.log.apply(console, arguments)
  },
  isLangChinese: function (w) {
    if (!w) return false
    if (w.navigator.language) {
      return w.navigator.language.toLowerCase().indexOf('zh') !== -1
    } else if (w.navigator.browserLanguage) {
      return w.navigator.browserLanguage.toLowerCase().indexOf('zh') !== -1
    }
    return false
  },
  isInChina: function (w) {
    if (!w) return false
    var result = false
    const chnTimezones = ['asia/shanghai', 'asia/hong_kong', 'asia/hongkong', 'asia/taipei', 'asia/macau']
    if (typeof w.moment === 'function' && typeof moment.tz === 'function') {
      result = chnTimezones.indexOf(moment.tz.guess().toLowerCase()) >= 0
    }
    return result
  },
}
