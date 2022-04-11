'use strict'

class ExceptionAlerting {
  constructor (options, context) {
    const self = this
    //
    self.options = options
    self.context = context
    //
    self.setup()
  }

  setup () {
    const self = this
    self._startObserving()
  }

  _startObserving () {
    const self = this
    window.onerror = function (message, file, line, col, error) {
      self.alertErrMsg(error.message, 1)
      return false
    }
    window.addEventListener('error', function (e) {
      self.alertErrMsg(e.error.message, 2)
      return false
    })
    window.addEventListener('unhandledrejection', function (e) {
      self.alertErrMsg(e.reason.message, 3)
      return false
    })
  }

  //
  // Imperatives
  alertErrMsg (message, handlerId) {
    const self = this
    if (message.indexOf('undefined') !== -1 && message.indexOf('handler') !== -1) {
      return // most likely an error from webflow - can skip erroring these ; TODO: remove this when removing webflow
    }
    if (typeof message !== 'undefined' && message && message !== '') {
      self.doToastMessage('Unhandled error. Please inform MyMonero Support of this message: ' + message, message)
    } else {
      self.doToastMessage('Unrecognized error occured. Please contact Support with steps and browser informations.', undefined)
    }
  }

  doToastMessage (message, raw_message) {
    const el = document.createElement('div')
    el.classList.add('exceptiontoast')
    el.appendChild(document.createTextNode(message)) // safely escape content
    document.body.appendChild(el)
    setTimeout(function () {
      el.classList.add('show')
      setTimeout(function () {
        el.classList.remove('show') // just so we can get the visibility:hidden in place -- probably not necessary
        el.parentNode.removeChild(el)
      }, 20.5 * 1000)
    })
  }
}
module.exports = ExceptionAlerting
