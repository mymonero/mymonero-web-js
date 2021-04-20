'use strict'

const StackAndModalNavigationView = require('../../StackNavigation/Views/StackAndModalNavigationView.web')

class SendTabContentView extends StackAndModalNavigationView {
  setup () {
    super.setup() // we must call on super
    const self = this
    { // walletsListView
      const options = {}
      const SendFundsView = require('./SendFundsView.Lite.web')
      const view = new SendFundsView(options, self.context)
      self.sendFundsView = view
    }
    self.SetStackViews(
      [
        self.sendFundsView
      ]
    )
  }

  //
  //
  // Runtime - Accessors - Implementation of TabBarItem protocol - custom tab bar item styling
  //
  TabBarItem_layer_customStyle () {
    return false
  }

  TabBarItem_icon_customStyle () {
    return 'tabButton-send'
  }

  TabBarItem_icon_selected_customStyle () {
    return 'tabButton-send-selected'
  }

  // interactivity
  TabBarItem_shallDisable () {
    const self = this
    const wallets = self.context.walletsListController.records // figure it's ready by this point
    const numberOf_wallets = wallets.length
    const walletsExist = numberOf_wallets !== 0
    const shallDisable = walletsExist == false // no wallets? disable
    //
    return shallDisable
  }

  //
  //
  // Runtime - Delegation - Request URI string picking - Entrypoints - Proxied drag & drop
  //
  _proxied_ondragenter (e) {
    const self = this
    if (self.modalViews.length > 0) {
      // prevent this?
    }
    self.DismissModalViewsToView( // whether we should force-dismiss these is debatable… see check for nonzero modals just above
      null, // null -> to top stack view
      false // not animated
    )
    self.PopToRootView(false) // in case they're not on root
    //
    self.sendFundsView._proxied_ondragenter(e)
  }

  _proxied_ondragleave (e) {
    const self = this
    self.sendFundsView._proxied_ondragleave(e)
  }

  _proxied_ondrop (e) {
    const self = this
    self.sendFundsView._proxied_ondrop(e)
  }
}
module.exports = SendTabContentView
