'use strict'

const commonComponents_navigationBarButtons = require('../MMAppUICommonComponents/navigationBarButtons.web')

class ThemeController {
  constructor (options, context) {
    const self = this
    self.options = options
    self.context = context
  }

  //
  // Accessors - UI - Metrics - Layout
  TabBarView_thickness () {
    const self = this
    return self.context.TabBarView_thickness
  }

  TabBarView_isHorizontalBar () {
    const self = this
    return self.context.TabBarView_isHorizontalBar
  }

  //
  // Accessors - Internal
  _shouldDisableChromeDesktopSpecificTextRendering () {
    const self = this
  }

  //
  // Imperatives - Centralizations of element styling (for, e.g. cross-platform support)
  StyleLayer_FontAsSmallRegularSansSerif (layer) {
    const self = this
    layer.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
    layer.style.fontSize = '12px'
    layer.style.fontWeight = '500'
    if (self.context.ThemeController_isMobileBrowser === true) {
      //
    } else {
      layer.style.webkitFontSmoothing = 'subpixel-antialiased' // for chrome browser
      layer.style.letterSpacing = '0.5px'
    }
  }

  StyleLayer_FontAsSmallRegularMonospace (layer) {
    const self = this
    if (self.context.ThemeController_isMobileBrowser === true) {
      layer.style.fontFamily = 'Native-Regular, input, menlo, monospace'
      layer.style.fontSize = '11px'
      layer.style.fontWeight = 'lighter'
    } else {
      layer.style.fontFamily = 'Native-Light, input, menlo, monospace'
      layer.style.webkitFontSmoothing = 'subpixel-antialiased' // for chrome browser
      layer.style.fontSize = '10px'
      layer.style.letterSpacing = '0.5px'
      if (typeof process !== 'undefined' && process.platform === 'linux') {
        layer.style.fontWeight = '700' // surprisingly does not render well w/o this… not linux thing but font size thing. would be nice to know which font it uses and toggle accordingly. platform is best guess for now
      } else {
        layer.style.fontWeight = '300'
      }
    }
  }

  StyleLayer_FontAsMiddlingRegularMonospace (layer) {
    const self = this
    layer.style.fontFamily = 'Native-Regular, input, menlo, monospace'
    layer.style.fontSize = '13px'
    layer.style.fontWeight = 'normal'
  }

  StyleLayer_FontAsSubMiddlingRegularMonospace (layer) {
    const self = this
    layer.style.fontFamily = 'Native-Regular, input, menlo, monospace'
    layer.style.fontSize = '12px'
    layer.style.fontWeight = 'normal'
  }

  StyleLayer_FontAsMessageBearingSmallLightMonospace (layer) {
    const self = this
    layer.style.fontSize = '11px' // we need this to visually stand out slightly more given how it's used
    if (self.context.ThemeController_isMobileBrowser === true) {
      layer.style.fontFamily = 'Native-Regular, input, menlo, monospace'
      layer.style.fontWeight = 'lighter'
    } else {
      layer.style.fontFamily = 'Native-Light, input, menlo, monospace'
      layer.style.fontWeight = '100' // instead of 500, cause this color, white, is rendered strong
    }
  }

  StyleLayer_FontAsSmallPillLightMonospace (layer) {
    const self = this
    if (self.context.ThemeController_isMobileBrowser === true) {
      layer.style.fontFamily = 'Native-Regular, input, menlo, monospace'
      layer.style.fontSize = '11px'
      layer.style.fontWeight = 'lighter'
    } else {
      layer.style.fontFamily = 'Native-Light, input, menlo, monospace'
      layer.style.fontSize = '10px'
      layer.style.letterSpacing = '0.8px'
      layer.style.fontWeight = '100'
    }
  }

  StyleLayer_FontAsMiddlingBoldSansSerif (layer) {
    const self = this
    layer.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
    if (self.context.ThemeController_isMobileBrowser === true) {
      layer.style.fontSize = '13px'
      layer.style.fontWeight = 'bold'
    } else {
      layer.style.fontSize = '12px' // design says 13 but chrome/webkit/electron renders oddly, simulating with…
      layer.style.fontWeight = '500'
      layer.style.letterSpacing = '0.5px'
    }
  }

  StyleLayer_FontAsMiddlingSemiboldSansSerif (layer) {
    const self = this
    layer.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
    if (self.context.ThemeController_isMobileBrowser === true) {
      layer.style.fontSize = '13px'
      layer.style.fontWeight = '600' // semibold desired but "semibold" doesn't apparently work
    } else {
      layer.style.webkitFontSmoothing = 'subpixel-antialiased'
      layer.style.fontSize = '12px' // design says 13 but chrome/desktop renders it too large
      layer.style.fontWeight = '400' // semibold desired
      layer.style.letterSpacing = '0.5px'
    }
  }

  StyleLayer_FontAsSmallSemiboldSansSerif (layer) {
    const self = this
    layer.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
    if (self.context.ThemeController_isMobileBrowser === true) {
      layer.style.fontSize = '11px'
      layer.style.fontWeight = '600' // semibold desired but "semibold" doesn't apparently work
    } else {
      layer.style.webkitFontSmoothing = 'subpixel-antialiased'
      layer.style.fontSize = '11px'
      layer.style.fontWeight = '400' // semibold desired
      layer.style.letterSpacing = '0.5px'
    }
  }

  StyleLayer_FontAsMiddlingNormalSansSerif (layer) {
    const self = this
    layer.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
    layer.style.letterSpacing = '0'
    layer.style.fontSize = '13px'
    if (self.context.ThemeController_isMobileBrowser === true) {
      layer.style.fontWeight = 'normal'
    } else {
      layer.style.webkitFontSmoothing = 'subpixel-antialiased'
      layer.style.fontWeight = '300'
    }
  }

  StyleLayer_FontAsMiddlingButtonContentSemiboldSansSerif (
    layer,
    isContentBrightNotDark
  ) {
    const self = this
    layer.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
    if (self.context.ThemeController_isMobileBrowser === true) {
      layer.style.fontSize = '13px'
      layer.style.letterSpacing = '0'
      layer.style.fontWeight = '600'
    } else { // chrome/desktop/electron:
      layer.style.webkitFontSmoothing = 'subpixel-antialiased'
      if (isContentBrightNotDark == true) {
        layer.style.fontSize = '12px' // appears slightly too small but 13 is far to big
        layer.style.letterSpacing = '0.5px'
        layer.style.fontWeight = '400'
      } else {
        layer.style.fontSize = '13px' // appears /slightly/ too bug but waygd
        layer.style.letterSpacing = '0'
        layer.style.fontWeight = '600'
      }
    }
  }

  //
  // Delegation/Accessors/Protocol - Navigation Bar View - Buttons - Back button
  NavigationBarView__New_back_leftBarButtonView (clicked_fn) {
    const self = this
    const view = commonComponents_navigationBarButtons.New_LeftSide_BackButtonView(self.context)
    const layer = view.layer
    layer.addEventListener(
      'click',
      function (e) {
        e.preventDefault()
        if (view.isEnabled !== false) { // button is enabled
          clicked_fn()
        }
        return false
      }
    )
    return view
  }
}
module.exports = ThemeController
