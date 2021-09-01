'use strict'

const View = require('../../Views/View.web')
const RootFooterView = require('./RootFooterView.web')
const ConnectivityMessageBarView = require('./ConnectivityMessageBarView.web')
const RootTabBarAndContentView = require('./RootTabBarAndContentView.web')
require("../../Exchange/Components/ExchangeLandingPage");


class RootView extends View {
  constructor (options, context) {
    super(options, context)

    const self = this
    self.setup_views()
  }

  setup_views () {
    const self = this
    //
    const layer = self.layer
    layer.classList.add('main-body')
    //
    const tabBarViewAndContentView = new RootTabBarAndContentView({}, self.context)
    self.tabBarViewAndContentView = tabBarViewAndContentView
    self.addSubview(tabBarViewAndContentView)

    const tabBarViewAndContentViewLayer = self.tabBarViewAndContentView.layer
    tabBarViewAndContentViewLayer.style.height = 'calc(100% - 32px)'

    const footerView = new RootFooterView({}, self.context)
    self.footerView = footerView
    self.addSubview(footerView)

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
}

module.exports = RootView
