'use strict'

const ContactsDownloadAppEmptyScreenView = require('./ContactsDownloadAppEmptyScreenView.Lite.web')
const StackAndModalNavigationView = require('../../StackNavigation/Views/StackAndModalNavigationView.web')

class ContactsTabContentView extends StackAndModalNavigationView {
  setup () {
    super.setup() // we must call on super
    const self = this
    const view = new ContactsDownloadAppEmptyScreenView({}, self.context)
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
    const self = this
    return 'tabButton-contacts'
  }

  TabBarItem_icon_selected_customStyle () {
    const self = this
    return 'tabButton-contacts-selected'
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
module.exports = ContactsTabContentView

