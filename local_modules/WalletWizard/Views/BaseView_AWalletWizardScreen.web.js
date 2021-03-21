'use strict'

const View = require('../../Views/View.web')

class AddWallet_LandingScreenView extends View {
  constructor (options, context) {
    super(options, context)
    const self = this
    self.wizardController = self.options.wizardController
    if (self.wizardController == null || typeof self.wizardController === 'undefined') {
      throw Error(self.constructor.name + ' requires a self.wizardController')
    }
    self.setup()
  }

  setup () {
    const self = this
    self._setup_views()
    self._setup_startObserving()
  }

  _setup_views () {
    const self = this

    const layer = self.layer
    layer.style.webkitUserSelect = 'none' // disable selection here but enable selectively
    layer.style.position = 'relative'
    layer.style.boxSizing = 'border-box'
    layer.style.width = '100%'
    layer.style.height = '100%' // we're also set height in viewWillAppear when in a nav controller
    layer.style.padding = '0' // actually going to change paddingTop in self.viewWillAppear() if navigation controller
    layer.style.overflowY = 'auto'
    layer.classList.add('ClassNameForScrollingAncestorOfScrollToAbleElement')
    layer.style.backgroundColor = '#272527' // so we don't get a strange effect when pushing self on a stack nav view
    layer.style.color = '#c0c0c0' // temporary
    layer.style.wordBreak = 'break-all' // to get the text to wrap
  }

  _setup_startObserving () {
  }

  //
  //
  // Lifecycle - Teardown
  //
  TearDown () {
    const self = this
    super.TearDown()
    //
    self.wizardController = null // nil ref to ensure free
  }

  //
  //
  // Runtime - Accessors - Navigation
  //
  Navigation_Title () {
    const self = this
    throw Error('override Navigation_Title in ' + self.constructor.name)
  }

  //
  //
  // Runtime - Delegation - Navigation/View lifecycle
  //
  viewWillAppear () {
    const self = this
    super.viewWillAppear()
    if (typeof self.navigationController !== 'undefined' && self.navigationController !== null) {
      self.layer.style.paddingTop = `${self.navigationController.NavigationBarHeight()}px`
    }
  }
}
module.exports = AddWallet_LandingScreenView
