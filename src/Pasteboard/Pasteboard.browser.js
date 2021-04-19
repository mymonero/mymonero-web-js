'use strict'

const ClipboardJS = require('clipboard')

class Pasteboard {
  constructor (options, context) {
    const self = this
    self.clipboard = new ClipboardJS('.copy-trigger') // must initialize this - and it will watch the DOM
  }

  CopyString (string, contentType_orText) {
    const self = this
    // nothing to do here since we are using ClipboardJS and relying on "data-clipboard-text"
  }

  CopyValuesByType (valuesByType) {
    const self = this
    // nothing to do here since we are using ClipboardJS and relying on "data-clipboard-text"
  }
}
module.exports = Pasteboard
