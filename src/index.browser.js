'use strict'

import './assets/css/styles.css'
import './assets/css/clear.browser.css'

window.BootApp = function () { // encased in a function to prevent scope being lost/freed on mobile
  const isDebug = false
  const app =
  { // implementing some methods to provide same API as electron
    getVersion: function () {
      return '1.1.21' // TODO: read from config.. don't want to ship package.json with app though
    },
    getName: function () {
      return 'MyMonero'
    },
    getDeviceManufacturer: function () {
      throw Error('app.getDeviceManufacturer(): Unsupported platform')
    },
    getPath: function (pathType) {
      throw Error('app.getPath(): Unsupported platform')
    }
  }
  const isTouchDevice = ('ontouchstart' in document.documentElement)
  const isMobile = isTouchDevice // an approximation for 'mobile'

  // context
  require('@mymonero/mymonero-app-bridge')({}).then(function (coreBridge_instance) {
    const context = require('./MainWindow/Models/index_context.browser').NewHydratedContext({
      nettype: require('@mymonero/mymonero-nettype').network_type.MAINNET, // critical setting
      app: app,
      isDebug: isDebug,
      isLiteApp: true, // used sparingly for to disable (but not redact) functionality
      isMobile: isMobile,
      TabBarView_thickness: isMobile ? 48 : 79,
      TabBarView_isHorizontalBar: isMobile,
      ThemeController_isMobileBrowser: isMobile,
      Tooltips_nonHoveringBehavior: isMobile, // be able to dismiss on clicks etc
      // TODO: detect if Mac … if so, render w/o native emoji (need holistic fallback solution though - see Gitlab post referenced by https://github.com/mymonero/mymonero-app-js/issues/194)
      appDownloadLink_domainAndPath: 'mymonero.com',
      HostedMoneroAPIClient_DEBUGONLY_mockSendTransactionSuccess: false,
      Views_selectivelyEnableMobileRenderingOptimizations: isMobile,
      CommonComponents_Forms_scrollToInputOnFocus: isMobile,
      monero_utils: coreBridge_instance
    })
    window.MyMonero_context = context
    // configure native UI elements
    document.addEventListener('touchstart', function () {}, true) // to allow :active styles to work in your CSS on a page in Mobile Safari:
    //
    if (isMobile) {
      // disable tap -> click delay on mobile browsers
      const attachFastClick = require('fastclick')
      attachFastClick.attach(document.body)
      //
      // when window resized on mobile (i.e. possibly when device rotated -
      // though we don't support that yet
      // if(/Android/.test(navigator.appVersion)) {
      const commonComponents_forms = require('./MMAppUICommonComponents/forms.web')
      window.addEventListener('resize', function () {
        console.log('💬  Window resized')
        commonComponents_forms.ScrollCurrentFormElementIntoView()
      })
      // }
    }
    { // root view
      const RootView = require('./MainWindow/Views/RootView.web')
      const rootView = new RootView({}, context) // hang onto reference
      rootView.superview = null // just to be explicit; however we will set a .superlayer
      // manually attach the rootView to the DOM and specify view's usual managed reference(s)
      const superlayer = document.body
      rootView.superlayer = superlayer
      superlayer.appendChild(rootView.layer) // the `layer` is actually the DOM element
    }
    { // and remove the loader (possibly fade this out)
      const el = document.getElementById('loading-spinner')
      el.parentNode.removeChild(el)
    }
  }).catch(function (e) {
    throw e
  })
}
window.BootApp()
