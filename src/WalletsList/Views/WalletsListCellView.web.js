'use strict'

const ListCellView = require('../../Lists/Views/ListCellView.web')
const WalletCellContentsView = require('../../Wallets/Views/WalletCellContentsView.web')
const commonComponents_tables = require('../../MMAppUICommonComponents/tables.web')

class WalletsListCellView extends ListCellView {
  // Setup / Configure
  setup_views () {
    const self = this
    { // self.cellContentsView: set this up /before/ calling _cmd on super
      // so that it's avail in overridable_layerToObserveForTaps
      const view = new WalletCellContentsView({
        wantsNoSecondaryBalances: false, // we do want secondary balances, specifically, here
        wantsOnlySpendableBalance: false // just to be explicit, when there are no secondary balances, display the whole balance
      }, self.context)
      self.cellContentsView = view
      // though this `add…` could be deferred til after…
      self.addSubview(view)
    }
    // now call on super…
    super.setup_views()
    const margin_h = 16
    {
      const layer = self.layer
      layer.style.position = 'relative'
      layer.style.left = `${margin_h}px`
      layer.style.top = '0'
      layer.style.width = `calc(100% - ${2 * margin_h}px)`
      layer.style.height = '80px'
      layer.style.background = '#383638'
      if (self.context.isMobile !== true) {
        layer.style.boxShadow = '0 0.5px 1px 0 #161416, inset 0 0.5px 0 0 #494749'
      } else { // avoiding shadow
        layer.style.boxShadow = 'inset 0 0.5px 0 0 #494749'
      }
      layer.style.borderRadius = '5px'
      layer.style.overflow = 'hidden' // clip bg in contents escaping corners
      layer.style.margin = '0 0 12px 0' // for cell spacing & scroll bottom inset
      // layer.style.border = "1px solid yellow"
    }
    {
      const layer = document.createElement('img')
      layer.src = './src/assets/img/list_rightside_chevron@3x.png'
      layer.style.position = 'absolute'
      layer.style.pointerEvents = 'none' // b/c we actually don't want to pick up pointer events nor prevent them from being received by the cell
      layer.style.width = '7px'
      layer.style.height = '12px'
      layer.style.right = '16px'
      layer.style.top = 'calc(50% - 6px)'
      self.accessoryChevronLayer = layer
      self.layer.appendChild(layer)
    }
    {
      const loader_innerHTML =
      '<div class="loader">' +
        '<div class="block block1"></div>' +
        '<div class="block block2"></div>' +
        '<div class="block block3"></div>' +
      '</div>'

      const layer = document.createElement('div')
      layer.classList.add('graphicOnly')
      layer.classList.add('activityIndicators')
      layer.classList.add('on-accent-background')
      layer.innerHTML = loader_innerHTML
      layer.style.position = 'absolute'
      layer.style.pointerEvents = 'none' // b/c we actually don't want to pick up pointer events nor prevent them from being received by the cell
      layer.style.width = '16px'
      layer.style.height = '14px'
      layer.style.right = '16px'
      layer.style.top = 'calc(50% - 7px)'
      layer.style.display = 'none'
      self.accessoryActivityIndicatorLayer = layer
      self.layer.appendChild(layer)
    }
  }

  overridable_layerToObserveForTaps () {
    const self = this
    if (!self.cellContentsView || typeof self.cellContentsView === 'undefined') {
      throw Error('self.cellContentsView was nil in ' + self.constructor.name + ' overridable_layerToObserveForTaps')
      // return self.layer
    }
    return self.cellContentsView.layer
  }

  //
  //
  // Lifecycle - Teardown/Recycling
  //
  TearDown () {
    super.TearDown()
    const self = this
    self.cellContentsView.TearDown()
  }

  prepareForReuse () {
    super.prepareForReuse()
    const self = this
    self.cellContentsView.PrepareForReuse()
  }

  //
  //
  // Runtime - Imperatives - Cell view - Config with record
  //
  overridable_configureUIWithRecord () {
    super.overridable_configureUIWithRecord()
    //
    const self = this
    self.cellContentsView.ConfigureWithRecord(self.record)
    //
    if (self.record.IsFetchingAnyUpdates()) {
      self.accessoryChevronLayer.style.display = 'none'
      self.accessoryActivityIndicatorLayer.style.display = 'block'
    } else {
      self.accessoryChevronLayer.style.display = 'block'
      self.accessoryActivityIndicatorLayer.style.display = 'none'
    }
  }

  overridable_startObserving_record () {
    const self = this
    super.overridable_startObserving_record()
    //
    if (typeof self.record === 'undefined' || self.contact === null) {
      throw Error('self.record undefined in start observing')
      // return
    }
    // here, we're going to store a bunch of functions as instance properties
    // because if we need to stopObserving we need to have access to the listener fns
    const emitter = self.record
    self.wallet_EventName_isFetchingUpdatesChanged_listenerFunction = function () {
      self.configureUI() // calls overridable_configureUIWithRecord
    }
    emitter.on(
      emitter.EventName_isFetchingUpdatesChanged(),
      self.wallet_EventName_isFetchingUpdatesChanged_listenerFunction
    )
  }

  overridable_stopObserving_record () {
    const self = this
    super.overridable_stopObserving_record()
    //
    if (typeof self.record === 'undefined' || !self.record) {
      return
    }
    const emitter = self.record
    function doesListenerFunctionExist (fn) {
      if (typeof fn !== 'undefined' && fn !== null) {
        return true
      }
      return false
    }
    if (doesListenerFunctionExist(self.wallet_EventName_isFetchingUpdatesChanged_listenerFunction) === true) {
      emitter.removeListener(
        emitter.EventName_isFetchingUpdatesChanged(),
        self.wallet_EventName_isFetchingUpdatesChanged_listenerFunction
      )
    }
  }
}
module.exports = WalletsListCellView
