'use strict'
class WindowDialogs {
  constructor (options, context) {
    const self = this
    self.options = options
    self.context = context
  }
  //
  // Runtime - Imperatives - Dialogs
  PresentQuestionAlertDialogWith (
    title,
    message,
    okButtonTitle,
    cancelButtonTitle,
    fn // (err?, didChooseYes?) -> Void
  ) {
    const self = this
    const trueIfUserClickedOK_notCancel = confirm(message) // add: title, buttons
    fn(null, trueIfUserClickedOK_notCancel)
  }
}
module.exports = WindowDialogs
