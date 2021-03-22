'use strict'

class Locale {
  constructor (options, context) {
    const self = this
    self.options = options
    self.context = context
  }

  Locale (fn) {
    const self = this
    let language
    if (window.navigator.languages) {
      language = window.navigator.languages[0]
    } else {
      language = window.navigator.userLanguage || window.navigator.language
    }
    fn(null, language) // TODO: is language really locale name?
  }
}
module.exports = Locale
