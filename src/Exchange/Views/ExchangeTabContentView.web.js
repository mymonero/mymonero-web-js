'use strict'
const StackAndModalNavigationView = require('../../StackNavigation/Views/StackAndModalNavigationView.web')
const ExchangeContentView = require('./ExchangeContentView.web')

class ExchangeTabContentView extends StackAndModalNavigationView {
  setup () {
    super.setup() // we must call on super
    const self = this
    {
      const options = {}

      const view = new ExchangeContentView(options, self.context)
      //console.log(view)
      self.exchangeContentView = view
    }
    self.SetStackViews(
      [
        self.exchangeContentView
      ]
    )
  }

  TabBarItem_layer_customStyle () {
    return false
  }

  TabBarItem_icon_customStyle () {
    return 'tabButton-exchange'
  }

  TabBarItem_icon_selected_customStyle () {
    return 'tabButton-exchange-selected'
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
module.exports = ExchangeTabContentView
