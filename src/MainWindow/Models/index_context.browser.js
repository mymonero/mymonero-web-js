'use strict'

function NewHydratedContext (initialContext) {
  initialContext = initialContext || {}
  const app = initialContext.app
  if (!app) {
    throw Error('app required')
  }

  return require('../../runtime_context/runtime_context').NewHydratedContext(initialContext)
}
module.exports.NewHydratedContext = NewHydratedContext
