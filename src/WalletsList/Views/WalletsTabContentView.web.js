'use strict'

const StackAndModalNavigationView = require('../../StackNavigation/Views/StackAndModalNavigationView.web')

class WalletsTabContentView extends StackAndModalNavigationView {

  setup () {
    super.setup() // we must call on super
    const self = this
    { // walletsListView
      const options = {}
      const WalletsListView = require('./WalletsListView.web')
      const view = new WalletsListView(options, self.context)
      self.walletsListView = view
    }
    {
      self.SetStackViews(
        [
          self.walletsListView
        ]
      )
    }
  }

  //
  //
  // Runtime - Accessors - Implementation of TabBarItem protocol
  // custom tab bar item styling
  TabBarItem_layer_customStyle () {
    return false
  }

  TabBarItem_icon_customStyle () {
    return 'tabButton-wallets'
  }

  TabBarItem_icon_selected_customStyle () {
    return 'tabButton-wallets-selected'
  }

  // interactivity
  TabBarItem_shallDisable () {
    return false
  }
}
module.exports = WalletsTabContentView
