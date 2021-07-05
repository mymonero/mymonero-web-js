'use strict'

const async = require('async')
const EventEmitter = require('events')
const uuidV1 = require('uuid/v1')

const CollectionName = 'PasswordMeta'
const _userSelectedTypesOfPassword =
{
  FreeformStringPW: 'FreeformStringPW', // this goes first as it's recommended to users
  SixCharPIN: 'SixCharPIN'
}
const _humanReadable_AvailableUserSelectableTypesOfPassword =
{
  FreeformStringPW: 'password',
  SixCharPIN: 'PIN'
}
//
//
// Controller
//
class PasswordController_Base extends EventEmitter {
  /// /////////////////////////////////////////////////////////////////////////////
  // Lifecycle - Initialization

  constructor (options, context) {
    super()
    // ^--- have to call super before can access `this`
    //
    const self = this
    self.options = options
    self.context = context
    //
    self.deleteEverythingRegistrants = {}
    self.changePasswordRegistrants = {}
    self._whenBooted_fns = []
    //
    self.hasBooted = false
    self.password = undefined // it's not been obtained from the user yet - we only store it in memory
    //
    self.setupAndBoot()
  }

  _setBooted () {
    const self = this
    if (self.hasBooted == true) {
      throw Error('code fault: _setBooted called while self.hasBooted=true')
    }
    self.hasBooted = true
    const fns_length = self._whenBooted_fns.length
    for (let i = 0; i < fns_length; i++) {
      const fn = self._whenBooted_fns[i]
      setTimeout(function () {
        fn() // so it's on 'next tick'
      })
    }
    self._whenBooted_fns = [] // flash for next time
  }

  //
  //
  // Setup - Called on post-whole-context-boot (see Delegation below)
  //
  _startObserving_userIdleInWindowController () {
    const self = this
    const controller = self.context.userIdleInWindowController
    if (typeof controller === 'undefined' || controller === null) {
      throw Error('nil self.context.userIdleInWindowController')
    }
    controller.on(
      controller.EventName_userDidBecomeIdle(),
      function () {
        if (self.hasUserSavedAPassword !== true) {
          // nothing to do here because the app is not unlocked and/or has no data which would be locked
          console.log('💬  User became idle but no password has ever been entered/no saved data should exist.')
          return
        } else if (self.HasUserEnteredValidPasswordYet() !== true) {
          // user has saved data but hasn't unlocked the app yet
          console.log("💬  User became idle and saved data/pw exists, but user hasn't unlocked app yet.")
          return
        }
        self._didBecomeIdleAfterHavingPreviouslyEnteredPassword()
      }
    )
  }

  /// /////////////////////////////////////////////////////////////////////////////
  // Runtime - Accessors - Public

  // either
  EventName_SetFirstPasswordDuringThisRuntime () {
    return 'EventName_SetFirstPasswordDuringThisRuntime'
  }

  // or
  EventName_ChangedPassword () {
    return 'EventName_ChangedPassword'
  }

  //
  //
  EventName_ObtainedNewPassword () {
    return 'EventName_ObtainedNewPassword'
  }

  EventName_ObtainedCorrectExistingPassword () {
    return 'EventName_ObtainedCorrectExistingPassword'
  }

  EventName_ErroredWhileSettingNewPassword () {
    return 'EventName_ErroredWhileSettingNewPassword'
  }

  EventName_ErroredWhileGettingExistingPassword () {
    return 'EventName_ErroredWhileGettingExistingPassword'
  }

  EventName_canceledWhileEnteringExistingPassword () {
    return 'EventName_canceledWhileEnteringExistingPassword'
  }

  EventName_canceledWhileEnteringNewPassword () {
    return 'EventName_canceledWhileEnteringNewPassword'
  }

  EventName_canceledWhileChangingPassword () {
    return 'EventName_canceledWhileChangingPassword'
  }

  EventName_errorWhileChangingPassword () {
    return 'EventName_errorWhileChangingPassword'
  }

  EventName_errorWhileAuthorizingForAppAction () {
    return 'EventName_errorWhileAuthorizingForAppAction'
  }

  EventName_successfullyAuthenticatedForAppAction () {
    return 'EventName_successfullyAuthenticatedForAppAction'
  }

  EventName_SingleObserver_getUserToEnterExistingPasswordWithCB () {
    return 'EventName_SingleObserver_getUserToEnterExistingPasswordWithCB'
  }

  EventName_SingleObserver_getUserToEnterNewPasswordAndTypeWithCB () {
    return 'EventName_SingleObserver_getUserToEnterNewPasswordAndTypeWithCB'
  }

  //
  EventName_willDeconstructBootedStateAndClearPassword () {
    return 'EventName_willDeconstructBootedStateAndClearPassword'
  }

  EventName_didDeconstructBootedStateAndClearPassword () {
    return 'EventName_didDeconstructBootedStateAndClearPassword'
  }

  EventName_havingDeletedEverything_didDeconstructBootedStateAndClearPassword () {
    return 'EventName_havingDeletedEverything_didDeconstructBootedStateAndClearPassword'
  }
  //

  //
  AvailableUserSelectableTypesOfPassword () {
    return _userSelectedTypesOfPassword
  }

  HumanReadable_AvailableUserSelectableTypesOfPassword () {
    return _humanReadable_AvailableUserSelectableTypesOfPassword
  }

  Capitalized_HumanReadable_AvailableUserSelectableTypeOfPassword (passwordType) {
    const humanReadable_passwordType = _humanReadable_AvailableUserSelectableTypesOfPassword[passwordType]
    function __capitalizedString (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
    //
    return __capitalizedString(humanReadable_passwordType)
  }

  //
  DetectedPasswordTypeFromPassword (password) {
    const self = this
    {
      if (/^\d+$/.test(password) === true) { // and contains only numbers
        return self.AvailableUserSelectableTypesOfPassword().SixCharPIN
      }
    }
    return self.AvailableUserSelectableTypesOfPassword().FreeformStringPW
  }

  /// /////////////////////////////////////////////////////////////////////////////
  // Runtime - Imperatives - Private - Requesting password from user

  unguard_getNewOrExistingPassword () {
    const self = this
    self.isAlreadyGettingExistingOrNewPWFromUser = false
  }

  _changePassword_tellRegistrants_doTaskFn (task_fn, end_fn) {
    const self = this
    const tokens = Object.keys(self.changePasswordRegistrants)
    async.each( // parallel; waits till all subscribers finished writing data successfully
      tokens,
      function (token, registrant_cb) {
        const registrant = self.changePasswordRegistrants[token]
        task_fn(registrant, function (err) {
          registrant_cb(err)
        })
      },
      function (err) {
        end_fn(err) // must be called
      }
    )
  }

  //
  //
  // Runtime - Imperatives - Delete everything
  //
  InitiateDeleteEverything (fn) { // this is used as a central initiation/sync point for delete everything like user idle
    // maybe it should be moved, maybe not.
    // And note we're assuming here the PW has been entered already.
    const self = this
    if (self.hasUserSavedAPassword !== true) {
      const errStr = 'InitiateDeleteEverything called but hasUserSavedAPassword !== true. This should be disallowed in the UI'
      throw errStr
    }
    self._deconstructBootedStateAndClearPassword(
      true, // yes, is for a 'delete everything'
      function (cb) {
        // reset state cause we're going all the way back to pre-boot
        self.hasBooted = false // require this pw controller to boot
        self.password = undefined // this is redundant but is here for clarity
        self.hasUserSavedAPassword = false
        self._id = undefined
        self.encryptedMessageForUnlockChallenge = undefined
        self._initial_waitingForFirstPWEntryDecode_passwordModel_doc = undefined
        // first have all registrants delete everything
        const tokens = Object.keys(self.deleteEverythingRegistrants)
        async.each( // parallel; waits till all finished
          tokens,
          function (token, registrant_cb) {
            const registrant = self.deleteEverythingRegistrants[token]
            registrant.passwordController_DeleteEverything(function (err) {
              registrant_cb(err)
            })
          },
          function (err) {
            if (err) {
              cb(err)
              return // will travel back to the 'throw' below
            }
            //
            // then delete pw record - after registrants in case any of them fail and user still needs to be able to delete some of them on next boot
            self.context.persister.RemoveAllDocuments(
              CollectionName,
              function (err) {
                if (err) {
                  cb(err)
                  return
                }
                console.log('🗑  Deleted password record.')
                self.setupAndBoot() // now trigger a boot before we call cb (tho we could do it after - consumers will wait for boot)
                //
                cb(err)
              }
            )
          }
        )
      },
      function (err) {
        if (err) {
          fn(err)
          throw err // throwing because self's runtime is not in a good state given un-setting of instance props like .password
        }
        self.emit(self.EventName_havingDeletedEverything_didDeconstructBootedStateAndClearPassword())
        fn()
      }
    )
  }

  AddRegistrantForDeleteEverything (registrant) {
    const self = this
    // console.log("Adding registrant for 'DeleteEverything': ", registrant.constructor.name)
    const token = uuidV1()
    self.deleteEverythingRegistrants[token] = registrant
    return token
  }

  AddRegistrantForChangePassword (registrant) {
    const self = this
    // console.log("Adding registrant for 'ChangePassword': ", registrant.constructor.name)
    const token = uuidV1()
    self.changePasswordRegistrants[token] = registrant
    return token
  }

  RemoveRegistrantForDeleteEverything (registrant) {
    const self = this
    // console.log("Removing registrant for 'DeleteEverything': ", registrant.constructor.name)
    delete self.deleteEverythingRegistrants[token]
  }

  RemoveRegistrantForChangePassword (registrant) {
    const self = this
    // console.log("Removing registrant for 'ChangePassword': ", registrant.constructor.name)
    delete self.changePasswordRegistrants[token]
  }

  //
  //
  // Runtime - Imperatives - App lock down interface (special case usage only)
  //
  LockDownAppAndRequirePassword () { // just a public interface for this - special-case-usage only! (so far. see index.cordova.js.)
    const self = this
    if (self.HasUserEnteredValidPasswordYet() === false) { // this is fine, but should be used to bail
      console.warn('⚠️  Asked to LockDownAppAndRequirePassword but no password entered yet.')
      return
    }
    console.log('💬  Will LockDownAppAndRequirePassword')
    self._deconstructBootedStateAndClearPassword(
      false // not for a 'delete everything'
    )
  }

  //
  //
  // Runtime - Imperatives - Boot-state deconstruction/teardown
  //
  _deconstructBootedStateAndClearPassword (
    optl_isForADeleteEverything,
    hasFiredWill_fn, // (cb) -> Void; cb: (err?) -> Void
    fn
  ) {
    const self = this
    //
    const isForADeleteEverything = optl_isForADeleteEverything === true
    hasFiredWill_fn = hasFiredWill_fn || function (cb) { cb() }
    fn = fn || function (err) {}
    // TODO:? do we need to cancel any waiting functions here? not sure it would be possible to have any (unless code fault)…… we'd only deconstruct the booted state and pop the enter pw screen here if we had already booted before - which means there theoretically shouldn't be such waiting functions - so maybe assert that here - which requires hanging onto those functions somehow
    { // indicate to consumers they should tear down and await the "did" event to re-request
      const params =
			{
			  isForADeleteEverything: isForADeleteEverything
			}
      self.emit(self.EventName_willDeconstructBootedStateAndClearPassword(), params)
    }
    setTimeout(function () { // on next tick…
      hasFiredWill_fn(
        function (err) {
          if (err) {
            fn(err)
            return
          }
          { // trigger deconstruction of booted state and require password
            self.password = undefined
          }
          { // we're not going to call WhenBootedAndPasswordObtained_PasswordAndType because consumers will call it for us after they tear down their booted state with the "will" event and try to boot/decrypt again when they get this "did" event
            self.emit(self.EventName_didDeconstructBootedStateAndClearPassword())
          }
          fn()
        }
      )
    }, 2)
  }

  //
  //
  // Runtime - Delegation - Post-instantiation hook
  //
  RuntimeContext_postWholeContextInit_setup () {
    const self = this
    // We have to wait until post-whole-context-init to guarantee all controllers exist
    self._startObserving_userIdleInWindowController()
  }
}
module.exports = PasswordController_Base
