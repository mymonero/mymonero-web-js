'use strict'

const commonComponents_navigationBarButtons = require('../../MMAppUICommonComponents/navigationBarButtons.web')
const commonComponents_actionButtons = require('../../MMAppUICommonComponents/actionButtons.web')

const BaseView_AWalletWizardScreen = require('./BaseView_AWalletWizardScreen.web')

class PickCreateOrUseExisting_Landing_View extends BaseView_AWalletWizardScreen {
  _setup_views () {
    const self = this
    super._setup_views()
    self._setup_emptyStateMessageContainerView()
    self._setup_actionButtonsContainerView()
    { // update empty state message container to accommodate
      const margin_v = self.emptyStateMessageContainerView.__EmptyStateMessageContainerView_margin_v
      self.emptyStateMessageContainerView.layer.style.height = `calc(100% - ${2 * margin_v}px + 3px - ${self.actionButtonsContainerView.layer.style.height/* no'px' */})`
    }
  }

  _setup_emptyStateMessageContainerView () {
    const self = this
    const margin_h = 16
    const margin_v = 19
    const view = new View({}, self.context)
    view.__EmptyStateMessageContainerView_margin_h = margin_h
    view.__EmptyStateMessageContainerView_margin_v = margin_v
  
    const layerEmpty = view.layer
    layerEmpty.classList.add('emptyScreens')
    layerEmpty.style.width = `calc(100% - 32px - 2px)` // -2px for border
    layerEmpty.style.height = `calc(100% - 38px - 2px)` // -2px for border
    layerEmpty.style.margin = `19px 16px`
  
    const contentContainerLayer = document.createElement('div')
    contentContainerLayer.classList.add('content-container')
    contentContainerLayer.style.display = 'table-cell'
    contentContainerLayer.style.verticalAlign = 'middle'
    const translateY_px = -16
    contentContainerLayer.style.transform = 'translateY(' + translateY_px + 'px)' // pull everything up per design
    view.layer.appendChild(contentContainerLayer)
  
    const emojiLayer = document.createElement('div')
    emojiLayer.classList.add('emoji-label')
    emojiLayer.innerHTML = '🤔'
    contentContainerLayer.appendChild(emojiLayer)
  
    const messageLayer = document.createElement('div')
    messageLayer.classList.add('message-label')
    messageLayer.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
    messageLayer.style.letterSpacing = '0'
    messageLayer.style.fontSize = '13px'
    if (self.context.ThemeController_isMobileBrowser === true) {
      messageLayer.style.fontWeight = 'normal'
    } else {
      messageLayer.style.webkitFontSmoothing = 'subpixel-antialiased'
      messageLayer.style.fontWeight = '300'
    }
    messageLayer.innerHTML = 'How would you like to</br>add a wallet?'
  
    contentContainerLayer.appendChild(messageLayer)

    const layer = view.layer
    layer.style.marginBottom = '0' // not going to use margin on the btm because action bar is there
    self.emptyStateMessageContainerView = view
    self.addSubview(view)
  }

  _setup_actionButtonsContainerView () {
    const self = this
    const margin_h = self.emptyStateMessageContainerView.__EmptyStateMessageContainerView_margin_h
    const margin_v = self.emptyStateMessageContainerView.__EmptyStateMessageContainerView_margin_v
    const view = commonComponents_actionButtons.New_Stacked_ActionButtonsContainerView(
      margin_h,
      margin_h,
      margin_v - 3, // top
      self.context
    )
    self.actionButtonsContainerView = view
    self._setup_actionButton_useExistingWallet()
    self._setup_actionButton_createNewWallet()
    self.addSubview(view)
  }

  _setup_actionButton_useExistingWallet () {
    const self = this
    const buttonView = commonComponents_actionButtons.New_ActionButtonView(
      'Use existing wallet',
      null, // no image
      false,
      function (layer, e) {
        self.wizardController.PatchToDifferentWizardTaskMode_byPushingScreen(
          self.wizardController.WizardTask_Mode_AfterPick_UseExisting(),
          1 // first screen after 0 - maintain ability to hit 'back'
        )
      },
      self.context
    )
    self.actionButtonsContainerView.addSubview(buttonView)
  }

  _setup_actionButton_createNewWallet () {
    const self = this
    const buttonView = commonComponents_actionButtons.New_ActionButtonView(
      'Create new wallet',
      null, // no image
      true,
      function (layer, e) {
        self.wizardController.PatchToDifferentWizardTaskMode_byPushingScreen(
          self.wizardController.WizardTask_Mode_AfterPick_CreateWallet(),
          1 // first screen after 0 - maintain ability to hit 'back'
        )
      },
      self.context,
      undefined,
      'blue'
    )
    self.actionButtonsContainerView.addSubview(buttonView)
  }

  _setup_startObserving () {
    super._setup_startObserving()
  }

  //
  //
  // Lifecycle - Teardown
  //
  TearDown () {
    super.TearDown()
  }

  //
  //
  // Runtime - Accessors - Navigation
  //
  Navigation_Title () {
    return 'Add Wallet'
  }

  Navigation_New_LeftBarButtonView () {
    const self = this
    const view = commonComponents_navigationBarButtons.New_LeftSide_CancelButtonView(self.context)
    const layer = view.layer
    layer.addEventListener('click', function (e) {
      e.preventDefault()
      self.wizardController._fromScreen_userPickedCancel()
      return false
    })
    return view
  }
  //
  //
  // Runtime - Imperatives -
  //
}
module.exports = PickCreateOrUseExisting_Landing_View
