'use strict'

const View = require('../../Views/View.web')
const commonComponents_tables = require('../../MMAppUICommonComponents/tables.web')
const commonComponents_forms = require('../../MMAppUICommonComponents/forms.web')
const commonComponents_labeledRangeInputs = require('../../MMAppUICommonComponents/labeledRangeInputs.web')
const commonComponents_ccySelect = require('../../MMAppUICommonComponents/ccySelect.web')
const StackAndModalNavigationView = require('../../StackNavigation/Views/StackAndModalNavigationView.web')
const ModalStandaloneAboutView = require('../../AboutWindow/Views/ModalStandaloneAboutView.web')

class SettingsView extends View {
  constructor (options, context) {
    super(options, context) // call super before `this`
    //
    const self = this
    self.setup()
  }

  setup () {
    const self = this
    self.setup_views()
    self.startObserving()
  }

  setup_views () {
    const self = this
    // metrics / caches
    self.margin_h = 0
    self._setup_self_layer()
    self._setup_form_containerLayer()
    // self.DEBUG_BorderChildLayers()
  }

  _setup_self_layer () {
    const self = this

    const layer = self.layer
    layer.classList.add('settings-layer')
  }

  _setup_form_containerLayer () {
    const self = this
    const containerLayer = document.createElement('div')
    self.form_containerLayer = containerLayer
    self._setup_aboutAppButton()
    self._setup_form_field_appTimeoutSlider()
    self._setup_form_field_displayCcy()
    self._setup_deleteEverythingButton()

    containerLayer.style.paddingBottom = '64px'
    self.layer.appendChild(containerLayer)
  }

  _setup_aboutAppButton () {
    const self = this
    const div = document.createElement('div')
    div.style.padding = '12px 0 12px 33px'
    const buttonView = commonComponents_tables.New_clickableLinkButtonView(
      'ABOUT MYMONERO',
      self.context,
      function () {
        const options = {}
        const view = new ModalStandaloneAboutView(options, self.context)
        self.current_ModalStandaloneAboutView = view
        const navigationView = new StackAndModalNavigationView({}, self.context)
        navigationView.SetStackViews([view])
        self.navigationController.PresentView(navigationView, true)
      }
    )
    buttonView.layer.style.margin = '0'
    div.appendChild(buttonView.layer)
    self.form_containerLayer.appendChild(div)
  }

  _setup_form_field_appTimeoutSlider () {
    const self = this
    const div = document.createElement('div')
    div.className = 'form_field'
    div.style.paddingTop = '5px' // special case
    {
      const labelLayer = commonComponents_forms.New_fieldTitle_labelLayer('APP TIMEOUT', self.context)
      div.appendChild(labelLayer)
      //
      const min = 15
      const max = 60 * 25
      const view = commonComponents_labeledRangeInputs.New_fieldValue_timeBasedLabeledRangeInputView({
        min: min,
        max: max,
        step: 15, // 15s at a time
        slideSideLabelFor_min: '15s',
        slideSideLabelStyleWidthFor_min: '20px',
        slideSideLabelFor_max: 'Never',
        slideSideLabelStyleWidthFor_max: '34px',
        displayAsMinutesAtXMin: 1,
        isMaxInfinity: true,
        labelForInfinity: 'Never',
        //
        changed_fn: function (value) {
          let valueToSave = value
          if (value == max) {
            valueToSave = self.context.settingsController.AppTimeoutNeverValue()
          }
          self.context.settingsController.Set_settings_valuesByKey(
            {
              appTimeoutAfterS: valueToSave
            },
            function (err) {
              if (err) {
                throw err
              }
            }
          )
        }
      }, self.context)
      view.layer.style.margin = '0 5px'
      view.layer.style.width = 'calc(100% - 10px)'
      self.appTimeoutRangeInputView = view // NOTE: This must be torn down manually; see TearDown()
      div.appendChild(view.layer)
      //
      const messageLayer = commonComponents_forms.New_fieldAccessory_messageLayer(self.context)
      messageLayer.style.wordBreak = 'break-word'
      self.appTimeoutSlider_messageLayer = messageLayer
      div.appendChild(messageLayer)
    }
    self.form_containerLayer.appendChild(div)
  }

  _setup_form_field_displayCcy () {
    const self = this

    const div = document.createElement('div')
    div.className = 'form_field'
    {
      const labelLayer = commonComponents_forms.New_fieldTitle_labelLayer('DISPLAY CURRENCY', self.context)
      div.appendChild(labelLayer)
      //
      const selectContainerLayer = document.createElement('div')
      selectContainerLayer.classList.add('settings-dropdown-div')

      const ccySelectLayer = commonComponents_ccySelect.new_selectLayer()
      self.displayCcySelectLayer = ccySelectLayer
      self._configure_displayCcySelectLayer_value()
      {
        const selectLayer = ccySelectLayer
        selectLayer.classList.add('settings-dropdown')
        // hover effects/classes
        selectLayer.classList.add('hoverable-cell')
        selectLayer.classList.add('utility')
        selectLayer.classList.add('disableable')
        //
        // observation
        ccySelectLayer.addEventListener('change', function () {
          self._ccySelectLayer_did_change()
        })
      }
      selectContainerLayer.appendChild(ccySelectLayer)
      {
        const layer = document.createElement('div')
        self.disclosureArrowLayer = layer
        layer.classList.add('settings-dropdown-arrow')
        selectContainerLayer.appendChild(layer)
      }
      div.appendChild(selectContainerLayer)
    }
    self.form_containerLayer.appendChild(div)
  }

  _setup_deleteEverythingButton () {
    const self = this
    const div = document.createElement('div')
    div.style.paddingTop = '23px'
    const titleText = 'LOG OUT'
    const view = commonComponents_tables.New_redTextButtonView(titleText, self.context)
    self.deleteEverything_buttonView = view
    const layer = view.layer
    layer.addEventListener('click', function (e) {
      e.preventDefault()
      if (self.deleteEverything_buttonView.isEnabled !== true) {
        return false
      }
      self.context.windowDialogs.PresentQuestionAlertDialogWith('Log out?', 'Are you sure you want to log out?', 'Log Out', 'Cancel', function (err, didChooseYes) {
        if (err) {
          throw err
        }
        if (didChooseYes) {
          self.context.passwordController.InitiateDeleteEverything(function (err) {})
        }
      })
      return false
    })
    div.appendChild(layer)
    self.form_containerLayer.appendChild(div)
  }

  startObserving () {
    const self = this
    self.registrantForDeleteEverything_token = self.context.passwordController.AddRegistrantForDeleteEverything(self)
  }

  //
  // Lifecycle - Teardown - Overrides
  TearDown () {
    const self = this
    self.stopObserving()
    super.TearDown()
    //
    self.appTimeoutRangeInputView.TearDown() // must call this manually
    self.tearDownAnySpawnedReferencedPresentedViews()
  }

  tearDownAnySpawnedReferencedPresentedViews () {
    const self = this
    if (typeof self.current_ModalStandaloneAboutView !== 'undefined' && self.current_ModalStandaloneAboutView) {
      self.current_ModalStandaloneAboutView.TearDown()
      self.current_ModalStandaloneAboutView = null
    }
  }

  stopObserving () {
    const self = this
    self.context.passwordController.RemoveRegistrantForDeleteEverything(self.registrantForDeleteEverything_token)
    self.registrantForDeleteEverything_token = null
  }

  //
  // Runtime - Accessors - Navigation
  Navigation_Title () {
    return 'Preferences'
  }

  //
  // Runtime - Imperatives - UI config
  _configure_displayCcySelectLayer_value () {
    const self = this
    self.displayCcySelectLayer.value = self.context.settingsController.displayCcySymbol
  }

  //
  // Runtime - Delegation - Navigation/View lifecycle
  viewWillAppear () {
    const self = this
    super.viewWillAppear()
    if (typeof self.navigationController !== 'undefined' && self.navigationController !== null) {
      self.layer.style.paddingTop = `${self.navigationController.NavigationBarHeight()}px`
    }

    const walletsExist = self.context.walletsListController.records.length > 0
    self.appTimeoutRangeInputView.SetEnabled(true)
    self.displayCcySelectLayer.disabled = false
    self.displayCcySelectLayer.classList.remove('disabled')
    self.deleteEverything_buttonView.SetEnabled(walletsExist) // cause this is actually the 'log out' btn
    // and now that the value is set…
    self._configure_displayCcySelectLayer_value()
  }

  viewDidAppear () {
    const self = this
    super.viewDidAppear()
    { // reconstitute slider value… NOTE: we're doing this on VDA and not ideally on VWA because offsetWidth is nil before element is in DOM
      const appTimeoutAfterS = self.context.settingsController.appTimeoutAfterS
      if (appTimeoutAfterS == self.context.settingsController.AppTimeoutNeverValue()) {
        self.appTimeoutRangeInputView.SetValueMax()
      } else {
        self.appTimeoutRangeInputView.SetValue(self.context.settingsController.appTimeoutAfterS)
      }
    }
  }

  //
  // Runtime - Protocol / Delegation - Stack & modal navigation
  // We don't want to naively do this on VDA as else tab switching may trigger it - which is bad
  navigationView_didDismissModalToRevealView () {
    const self = this
    if (super.navigationView_didDismissModalToRevealView) {
      super.navigationView_didDismissModalToRevealView() // in case it exists
    }
    self.tearDownAnySpawnedReferencedPresentedViews()
  }

  navigationView_didPopToRevealView () {
    const self = this
    if (super.navigationView_didPopToRevealView) {
      super.navigationView_didPopToRevealView() // in case it exists
    }
    self.tearDownAnySpawnedReferencedPresentedViews()
  }

  _ccySelectLayer_did_change () {
    const self = this
    self.context.settingsController.Set_settings_valuesByKey(
      {
        displayCcySymbol: self.displayCcySelectLayer.value
      },
      function (err) {
        if (err) {
          throw err
        }
      }
    )
  }

  passwordController_DeleteEverything (fn) {
    const self = this
    self.layer.scrollTop = 0
    //
    fn() // this MUST get called
  }
}
module.exports = SettingsView
