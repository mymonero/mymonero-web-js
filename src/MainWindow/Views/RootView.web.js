'use strict'

const View = require('../../Views/View.web')
const RootFooterView = require('./RootFooterView.web')
const ConnectivityMessageBarView = require('./ConnectivityMessageBarView.web')
const PlatformSpecificRootTabBarAndContentView = require('./RootTabBarAndContentView.web')
const commonComponents_assetPreloader = require('../../MMAppUICommonComponents/assetPreloader')

class RootView extends View {
  constructor (options, context) {
    super(options, context)
    //
    const self = this

    commonComponents_assetPreloader.PreLoadImages(self.context)
    self.setup_views()
  }

  setup_views () {
    const self = this
    //
    const layer = self.layer
    layer.style.background = '#272527'
    layer.style.position = 'absolute'
    layer.style.width = '100%'
    layer.style.height = '100%'
    layer.style.left = '0px'
    layer.style.top = '0px'
    layer.style.overflow = 'hidden' // prevent scroll bar
    //
    self.setup_tabBarAndContentView()

    const view = new ConnectivityMessageBarView({}, self.context)
    self.connectivityMessageBarView = view
    self.addSubview(view)

    // disable space bar to scroll in document
    window.onkeydown = function (e) {
      if (e.keyCode === 32 && e.target === document.body) {
        e.preventDefault()
      }
    }
  }

  setup_tabBarAndContentView () {
    const self = this
    const tabBarViewAndContentView = new PlatformSpecificRootTabBarAndContentView({}, self.context)
    self.tabBarViewAndContentView = tabBarViewAndContentView
    self.addSubview(tabBarViewAndContentView)

    const layer = self.tabBarViewAndContentView.layer
    layer.style.height = 'calc(100% - 32px)'

    const footerView = new RootFooterView({}, self.context)
    self.footerView = footerView
    self.addSubview(footerView)
  }
}

module.exports = RootView
