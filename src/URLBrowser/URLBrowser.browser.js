'use strict'

class URLBrowser {
  constructor (options, context) {
    const self = this
    self.options = options
    self.context = context
  }

  OpenURLInSystemBrowser (urlString) {
    window.open(urlString, '_blank') // _system..?
  }
}
module.exports = URLBrowser
