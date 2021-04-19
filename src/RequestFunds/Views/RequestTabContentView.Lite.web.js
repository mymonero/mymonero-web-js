'use strict'

const RequestsDownloadAppEmptyScreenView = require('./RequestsDownloadAppEmptyScreenView.Lite.web')
const StackAndModalNavigationView = require('../../StackNavigation/Views/StackAndModalNavigationView.web')
//
class RequestTabContentView extends StackAndModalNavigationView {
  setup () {
    const self = this
    super.setup() // we must call on super
    //
    const view = new RequestsDownloadAppEmptyScreenView({}, self.context)
    self.SetStackViews(
      [
        view
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
    return 'tabButton-fundRequest'
  }

  TabBarItem_icon_selected_customStyle () {
    return 'tabButton-fundRequest-selected'
  }

  // interactivity
  TabBarItem_shallDisable () {
    const self = this
    const wallets = self.context.walletsListController.records // figure it's ready by this point
    const numberOf_wallets = wallets.length
    const walletsExist = numberOf_wallets !== 0
    const shallDisable = walletsExist == false // no wallets? disable
    return shallDisable
  }
}
module.exports = RequestTabContentView
