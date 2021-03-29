'use strict'
//
const renderer_setup_utils = require('./renderer_setup_utils')
//
module.exports = function (params) {
  params = params || {}
  //
  renderer_setup_utils.HardenRuntime({
    isBrowserBuild: true
  })
  renderer_setup_utils.IdentifyRuntime('IsBrowserRendererProcess') // set key-value to `true` on `window` -- not really using this under Cordova
}
