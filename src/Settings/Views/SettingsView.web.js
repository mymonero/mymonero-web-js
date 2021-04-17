'use strict'

const View = require('../../Views/View.web')
const commonComponents_tables = require('../../MMAppUICommonComponents/tables.web')
const commonComponents_forms = require('../../MMAppUICommonComponents/forms.web')
const commonComponents_labeledRangeInputs = require('../../MMAppUICommonComponents/labeledRangeInputs.web')
const commonComponents_ccySelect = require('../../MMAppUICommonComponents/ccySelect.web')
const config__MyMonero = require('../../HostedMoneroAPIClient/config__MyMonero')

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
    layer.style.webkitUserSelect = 'none' // disable selection here but enable selectively
    layer.style.position = 'relative'
    layer.style.boxSizing = 'border-box'
    layer.style.width = '100%'
    layer.style.height = '100%' // we're also set height in viewWillAppear when in a nav controller
    layer.style.padding = `0 ${self.margin_h}px 0px ${self.margin_h}px` // actually going to change paddingTop in self.viewWillAppear() if navigation controller
    layer.style.overflowY = 'auto'
    layer.style.backgroundColor = '#272527' // so we don't get a strange effect when pushing self on a stack nav view
    layer.style.color = '#c0c0c0' // temporary
    layer.style.wordBreak = 'break-all' // to get the text to wrap
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
        const StackAndModalNavigationView = require('../../StackNavigation/Views/StackAndModalNavigationView.web')
        const ModalStandaloneAboutView = require('../../AboutWindow/Views/ModalStandaloneAboutView.web')
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
    const div = commonComponents_forms.New_fieldContainerLayer(self.context)
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

    const div = commonComponents_forms.New_fieldContainerLayer(self.context)
    {
      const labelLayer = commonComponents_forms.New_fieldTitle_labelLayer('DISPLAY CURRENCY', self.context)
      div.appendChild(labelLayer)
      //
      const selectContainerLayer = document.createElement('div')
      selectContainerLayer.style.position = 'relative' // to container pos absolute
      selectContainerLayer.style.left = '0'
      selectContainerLayer.style.top = '0'
      selectContainerLayer.style.width = '132px'
      selectContainerLayer.style.height = '32px'
      //
      const ccySelectLayer = commonComponents_ccySelect.new_selectLayer()
      self.displayCcySelectLayer = ccySelectLayer
      self._configure_displayCcySelectLayer_value()
      {
        const selectLayer = ccySelectLayer
        selectLayer.style.outline = 'none'
        selectLayer.style.color = '#FCFBFC'
        selectLayer.style.backgroundColor = '#383638'
        selectLayer.style.width = '132px'
        selectLayer.style.height = '32px'
        selectLayer.style.border = '0'
        selectLayer.style.padding = '0'
        selectLayer.style.borderRadius = '3px'
        selectLayer.style.boxShadow = '0 0.5px 1px 0 #161416, inset 0 0.5px 0 0 #494749'
        selectLayer.style.webkitAppearance = 'none' // apparently necessary in order to activate the following style.border…Radius
        selectLayer.style.MozAppearance = 'none'
        selectLayer.style.msAppearance = 'none'
        selectLayer.style.appearance = 'none'
        self.context.themeController.StyleLayer_FontAsMiddlingButtonContentSemiboldSansSerif(
          selectLayer,
          true // bright content, dark bg
        )
        if (typeof navigator !== 'undefined' && navigator && navigator.userAgent && navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
          selectLayer.style.textIndent = '4px'
        } else {
          selectLayer.style.textIndent = '11px'
        }
        // hover effects/classes
        selectLayer.classList.add('hoverable-cell')
        selectLayer.classList.add('utility')
        selectLayer.classList.add('disableable')
        //
        // observation
        ccySelectLayer.addEventListener(
          'change',
          function () {
            self._ccySelectLayer_did_change()
          }
        )
      }
      selectContainerLayer.appendChild(ccySelectLayer)
      {
        const layer = document.createElement('div')
        self.disclosureArrowLayer = layer
        layer.style.pointerEvents = 'none' // mustn't intercept pointer events
        layer.style.border = 'none'
        layer.style.position = 'absolute'
        layer.style.width = '10px'
        layer.style.height = '8px'
        layer.style.right = '13px'
        layer.style.top = '12px'
        layer.style.zIndex = '100' // above options_containerView
        layer.style.backgroundImage = 'url(./src/assets/img/dropdown-arrow-down@3x.png)' // borrowing this
        layer.style.backgroundRepeat = 'no-repeat'
        layer.style.backgroundPosition = 'center'
        layer.style.backgroundSize = '10px 8px'
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
    const titleText = self.context.isLiteApp ? 'LOG OUT' : 'DELETE EVERYTHING'
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

  _updateValidationErrorForAddressInputView (fn_orNil) {
    const self = this
    if (self.serverURLInputLayer == null || typeof self.serverURLInputLayer === 'undefined') {
      return // not included
    }
    //
    const fn = fn_orNil || function (didError, savableValue) {}
    let mutable_value = (self.serverURLInputLayer.value || '').replace(/^\s+|\s+$/g, '') // whitespace-stripped
    //
    let preSubmission_validationError = null
    {
      if (mutable_value != '') {
        if (mutable_value.indexOf('.') == -1 && mutable_value.indexOf(':') == -1 && mutable_value.indexOf('localhost') == -1) {
          preSubmission_validationError = `Please enter a valid URL authority, e.g. ${config__MyMonero.API__authority}.`
        } else { // important else in the absence of reorganizing this code
          // strip http:// and https:// prefix here.. there's got to be a better way to do this..
          // ... probably not a good idea to naively strip "*://" prefix ... or is it?
          const strippablePrefixes =
					[
					  'https://',
					  'http://',
					  '//' // we can strip it for https anyway
					]
          for (let i = 0; i < strippablePrefixes.length; i++) {
            const prefix = strippablePrefixes[i]
            if (mutable_value.indexOf(prefix) === 0) {
              mutable_value = mutable_value.slice(prefix.length, mutable_value.length)
            }
          }
        }
      }
    }
    if (preSubmission_validationError != null) {
      self.serverURL_setValidationMessage(preSubmission_validationError)
      self.serverURL_connecting_activityIndicatorLayer.style.display = 'none' // hide
      // BUT we're also going to save the value so that the validation error here is displayed to the user
      //
      fn(true, null)
      return
    }
    const final_value = mutable_value
    fn(false, final_value) // no error, save value
  }

  //
  // Runtime - Imperatives - UI config - Validation messages - Server URL
  serverURL_setValidationMessage (validationMessageString) {
    const self = this
    if (validationMessageString === '' || !validationMessageString) {
      self.ClearValidationMessage()
      return
    }
    self.serverURLInputLayer.style.border = '1px solid #f97777'
    self.serverURL_validationMessageLayer.style.display = 'block'
    self.serverURL_validationMessageLayer.innerHTML = validationMessageString
  }

  serverURL_clearValidationMessage () {
    const self = this
    self.serverURLInputLayer.style.border = '1px solid rgba(0,0,0,0)'// todo: factor this into method on component
    self.serverURL_validationMessageLayer.style.display = 'none'
    self.serverURL_validationMessageLayer.innerHTML = ''
  }

  //
  // Runtime - Delegation - Navigation/View lifecycle
  viewWillAppear () {
    const self = this
    super.viewWillAppear()
    if (typeof self.navigationController !== 'undefined' && self.navigationController !== null) {
      self.layer.style.paddingTop = `${self.navigationController.NavigationBarHeight()}px`
    }
    // config change pw btn text, app timeout slider, …
    if (self.changePasswordButtonView) {
      throw Error('Did not expect self.changePasswordButtonView')
    }
    self.appTimeoutSlider_messageLayer.innerHTML = 'Idle time before automatic log-out'
    if (self.changePasswordButtonView) {
      throw Error('Did not expect self.changePasswordButtonView')
    }
    if (self.serverURLInputLayer) {
      throw Error('Did not expect self.serverURLInputLayer')
    }
    const walletsExist = self.context.walletsListController.records.length > 0
    self.appTimeoutRangeInputView.SetEnabled(true)
    self.displayCcySelectLayer.disabled = false
    self.displayCcySelectLayer.classList.remove('disabled')
    self.deleteEverything_buttonView.SetEnabled(walletsExist) // cause this is actually the 'log out' btn
    if (self.serverURLInputLayer) {
      self.serverURLInputLayer.value = self.context.settingsController.specificAPIAddressURLAuthority || ''
    }
    // and now that the value is set…
    self._updateValidationErrorForAddressInputView() // so we get validation error from persisted but incorrect value, if necessary for user feedback
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

  //
  // Delegation - Interactions
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

  _serverURLInputLayer_did_keyUp () {
    const self = this
    function __teardown_timeout_toSave_serverURL () {
      if (self.timeout_toSave_serverURL != null && typeof self.timeout_toSave_serverURL !== 'undefined') {
        clearTimeout(self.timeout_toSave_serverURL)
        self.timeout_toSave_serverURL = null
      }
    }
    __teardown_timeout_toSave_serverURL()
    self.serverURL_clearValidationMessage()
    {
      const entered_serverURL_value = self.serverURLInputLayer.value || ''
      if (entered_serverURL_value == '') {
        self.serverURL_connecting_activityIndicatorLayer.style.display = 'none' // no need to show 'connecting…'
      } else {
        self.serverURL_connecting_activityIndicatorLayer.style.display = 'block' // show
      }
    }
    // now wait until user is really done typing…
    self.timeout_toSave_serverURL = setTimeout(
      function () {
        __teardown_timeout_toSave_serverURL() // zero timer pointer
        //
        self._updateValidationErrorForAddressInputView( // also called on init so we get validation error on load
          function (didError, savableValue) {
            if (didError) {
              return // not proceeding to save
            }
            const currentValue = self.context.settingsController.specificAPIAddressURLAuthority || ''
            if (savableValue == currentValue) {
              // do not clear/re-log-in on wallets if we're, e.g., resetting the password programmatically after the user has canceled deleting all wallets
              self.serverURL_connecting_activityIndicatorLayer.style.display = 'none' // hide
              return
            }
            self.context.settingsController.Set_settings_valuesByKey(
              {
                specificAPIAddressURLAuthority: savableValue
              },
              function (err) {
                if (err) { // write failed
                  self.serverURL_setValidationMessage('' + err)
                  // so, importantly, revert the input contents, b/c the write failed
                  self.serverURLInputLayer.value = self.context.settingsController.specificAPIAddressURLAuthority
                  // but don't exit before hiding the 'connecting…' indicator
                }
                self.serverURL_connecting_activityIndicatorLayer.style.display = 'none' // hide
              }
            )
          }
        )
      },
      600
    )
  }

  //
  // Delegation - Delete everything
  passwordController_DeleteEverything (
    fn // this MUST be called
  ) {
    const self = this
    self.layer.scrollTop = 0
    //
    fn() // this MUST get called
  }
}
module.exports = SettingsView
