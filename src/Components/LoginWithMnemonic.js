import {html, css, LitElement} from 'lit';
import NavigationController from './NavigationController';

export class LoginWithMnemonicView extends NavigationController(LitElement) {
  static get styles() {
    return css`

    `;
  }

  connectedCallback() {
    super.connectedCallback();
    console.log("Page Template view connected to DOM");
    console.log(this);
    console.log(typeof(this));
    const textarea = this.querySelector("textarea");
    console.log(textarea);
  }

  constructor() {
    super();
    this.mnemonicString = "";
  }

  static get properties() {
    return {
      mnemonicString: { type: String, hasChanged: this.hasChangedHandler }
    }
  }

  hasChangedHandler() {
    console.log("Has changed");
  }

  loginWithMnemonic() {
    console.log("Test test 123");
    console.log(this);
    console.log(this.mnemonicString);
    const self = this
    // {
    //   self.isDisabledFromSubmission = true
    //   self.context.userIdleInWindowController.TemporarilyDisable_userIdle()
    //   //
    //   self.validationMessageLayer.ClearAndHideMessage()
    //   //
    //   self.rightBarButtonView.layer.innerHTML = commonComponents_activityIndicators.New_Graphic_ActivityIndicatorLayer_htmlString({ 'margin-top': '3px' })
    //   self.disable_submitButton()
    //   self.rightBarButtonView.layer.style.backgroundColor = 'rgba(0,0,0,0)' // special case / slightly fragile
    //   self.navigationController.navigationBarView.leftBarButtonView.SetEnabled(false)
    //   //
    //   self.toggleLoginModeButtonATagLayerView.SetEnabled(false)
    //   if (self.walletColorPickerInputView) {
    //     self.walletColorPickerInputView.SetEnabled(false)
    //   }
    //   if (self.walletNameInputLayer) {
    //     self.walletNameInputLayer.disabled = true
    //   }
    //   self.mnemonicTextAreaView.layer.disabled = true
    //   self.addrTextAreaView.layer.disabled = true
    //   self.viewKeyTextAreaView.layer.disabled = true
    //   self.spendKeyTextAreaView.layer.disabled = true
    //   self.addrAndKeysFieldsContainerLayer.disabled = true
    // }
    function ____reEnable_userIdleAndScreenSleepFromSubmissionDisable () { // factored because we would like to call this on successful submission too!
      self.context.userIdleInWindowController.ReEnable_userIdle()
    }
    function ___reEnableFormFromSubmissionDisable () {
      self.isDisabledFromSubmission = false
      ____reEnable_userIdleAndScreenSleepFromSubmissionDisable()
      //
      self.rightBarButtonView.layer.innerHTML = 'Next'
      self.enable_submitButton()
      self.navigationController.navigationBarView.leftBarButtonView.SetEnabled(true)
      //
      self.toggleLoginModeButtonATagLayerView.SetEnabled(true)
      if (self.walletColorPickerInputView) {
        self.walletColorPickerInputView.SetEnabled(true)
      }
      if (self.walletNameInputLayer) {
        self.walletNameInputLayer.disabled = undefined
      }
      self.mnemonicTextAreaView.layer.disabled = undefined
      self.addrTextAreaView.layer.disabled = undefined
      self.viewKeyTextAreaView.layer.disabled = undefined
      self.spendKeyTextAreaView.layer.disabled = undefined
      self.addrAndKeysFieldsContainerLayer.disabled = undefined
    }
    function __trampolineFor_failedWithErrStr (errStr) {
      self.layer.scrollTop = 0 // because we want to show the validation err msg
      self.validationMessageLayer.SetValidationError(errStr)
      ___reEnableFormFromSubmissionDisable()
    }
    function __trampolineFor_didAddWallet () {
      console.log("Logged in, yay");
      console.log(this);
      ____reEnable_userIdleAndScreenSleepFromSubmissionDisable() // we must call this manually as we are not re-enabling the form (or it will break user idle!!)
      self.selfNavigate("fundRequest") // will dismiss
    }
    //

    const walletsListController = this.context.walletsListController
    const walletName = "Test"
    const colorHexString = "DDDDDD";
    //self.mode_loginWith = Modes_LoginWith.MnemonicSeed;
    const mnemonicSeed = this.mnemonicString;
    console.log(mnemonicSeed);
      walletsListController.WhenBooted_ObtainPW_AddExtantWalletWith_MnemonicString(
        walletName,
        colorHexString,
        mnemonicSeed,
        function (err, walletInstance, wasWalletAlreadyInserted) {
          if (err) {
            __trampolineFor_failedWithErrStr(err)
            return
          }
          if (wasWalletAlreadyInserted === true) {
            __trampolineFor_failedWithErrStr('That wallet has already been added.')
            return // consider a 'fail'
          }
          // success
          __trampolineFor_didAddWallet()
        },
        function () { // user canceled password entry
          ___reEnableFormFromSubmissionDisable()
        }
      )

    // if (self.mode_loginWith == Modes_LoginWith.MnemonicSeed) {
    //   const mnemonicSeed = this.getSeed();
    //   walletsListController.WhenBooted_ObtainPW_AddExtantWalletWith_MnemonicString(
    //     walletName,
    //     colorHexString,
    //     mnemonicSeed,
    //     function (err, walletInstance, wasWalletAlreadyInserted) {
    //       if (err) {
    //         __trampolineFor_failedWithErrStr(err)
    //         return
    //       }
    //       if (wasWalletAlreadyInserted === true) {
    //         __trampolineFor_failedWithErrStr('That wallet has already been added.')
    //         return // consider a 'fail'
    //       }
    //       // success
    //       __trampolineFor_didAddWallet()
    //     },
    //     function () { // user canceled password entry
    //       ___reEnableFormFromSubmissionDisable()
    //     }
    //   )
    // } else if (self.mode_loginWith == Modes_LoginWith.AddrAndPrivKeys) {
    //   const addr = self.lookup__addr()
    //   const viewKey = self.lookup__viewKey()
    //   const spendKey = self.lookup__spendKey()
    //   walletsListController.WhenBooted_ObtainPW_AddExtantWalletWith_AddressAndKeys(
    //     walletName,
    //     colorHexString,
    //     addr,
    //     viewKey,
    //     spendKey,
    //     function (err, walletInstance, wasWalletAlreadyInserted) {
    //       if (err) {
    //         __trampolineFor_failedWithErrStr(err)
    //         return
    //       }
    //       if (wasWalletAlreadyInserted === true) {
    //         __trampolineFor_failedWithErrStr('That wallet has already been added.')
    //         return // consider a 'fail'
    //       }
    //       // success
    //       __trampolineFor_didAddWallet()
    //     },
    //     function () { // user canceled password entry
    //       ___reEnableFormFromSubmissionDisable()
    //     }
    //   )
    // } else {
    //   throw Error('unrecognized self.mode_loginWith')
    // }
  }
  
  logShit(event) {
    console.log(event);
    console.log(this);
    console.log(this.mnemonicString);
  }

  updateMnemonic(event) {
    console.log(event);
    console.log(this);
    this.mnemonicString = event.path[0].value;
  }

  render() {
    return html`
        <div style="overflow: hidden; position: absolute; top: 0px; left: 79px; width: calc(100% - 79px); height: 100%; background: rgb(39, 37, 39);"><div style="position: relative; left: 0px; top: 0px; width: 100%; height: 100%; overflow: hidden;"><div class="NavigationBarView" style="position: absolute; top: 0%; z-index: 9; width: 100%; height: 41px; background-color: rgb(39, 37, 39); -webkit-app-region: drag; user-select: none; box-shadow: none;"><div style="position: absolute; width: 100%; height: 41px; background-color: rgb(39, 37, 39);"></div><span class="title-label" style="color: rgb(252, 251, 252); position: absolute; top: -1px; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.5px; box-sizing: border-box; left: calc(15% + 16px); width: calc((70% - 32px) - 0px); padding-left: 0px; height: 41px; text-align: center; line-height: 41px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"><a href="https://mymonero.com" target="_blank" style="text-decoration: none; color: rgb(252, 251, 252); "><span style="width: 30px; height: 20px; display: inline-block; margin-right: 6px;"><span class="title-logo">&nbsp;</span></span>MyMonero v1.1.22</a></span><div style="position: absolute; left: 16px; width: 15%; min-width: 41px; height: 41px;"></div><div style="position: absolute; right: 16px; width: 15%; min-width: 41px; height: 41px;"></div></div><div style="z-index: 1; position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; overflow: hidden;"><div style="overflow-y: hidden; box-sizing: border-box; width: 100%; height: 100%; padding: 41px 0px 0px; user-select: none; word-break: break-all; background-color: rgb(39, 37, 39); color: rgb(192, 192, 192);"><div style="margin-top: 19px; margin-left: 16px; width: calc(100% - 32px); height: calc(100% - 19px); display: block;"><div class="emptyScreens" style="width: calc((100% - 0px) - 2px); height: calc(100% - 56px); margin: 0px;"><div class="content-container" style="display: table-cell; vertical-align: middle; transform: translateY(-16px);"><div class="emoji-label"><div class="smiley"></div></div><div class="message-label" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; letter-spacing: 0px; font-size: 13px; -webkit-font-smoothing: subpixel-antialiased; font-weight: 300;">Welcome to MyMonero!<br>Let's get started.</div></div></div><div style="position: fixed; top: calc(((100% - 32px) - 8px) - 32px); width: calc((100% - 95px) - 16px); height: 32px; z-index: 1000;"><a href="#" class="hoverable-cell disableable utility" style="opacity: 1; display: inline-block; width: calc(50% - 4.5px); height: 32px; box-sizing: border-box; border-radius: 3px; color: rgb(252, 251, 252); background-color: rgb(56, 54, 56); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; -webkit-font-smoothing: subpixel-antialiased; font-size: 12px; letter-spacing: 0.5px; font-weight: 400; line-height: 34px; box-shadow: rgb(22, 20, 22) 0px 0.5px 1px 0px, rgb(73, 71, 73) 0px 0.5px 0px 0px inset; text-decoration: none; text-align: center; margin-right: 9px;">Use existing wallet</a><a href="#" class="hoverable-cell disableable action" style="opacity: 1; display: inline-block; width: calc(50% - 4.5px); height: 32px; box-sizing: border-box; border-radius: 3px; color: rgb(22, 20, 22); background-color: rgb(0, 198, 255); box-shadow: rgba(255, 255, 255, 0.2) 0px 0.5px 0px 0px inset; -webkit-font-smoothing: subpixel-antialiased; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 13px; letter-spacing: 0px; font-weight: 600; transform: none; line-height: 32px; text-decoration: none; text-align: center;">Create new wallet</a></div></div><div style="display: none;"></div></div></div><div style="position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; overflow: hidden; z-index: 10;" class=""><div class="NavigationBarView" style="position: absolute; top: 0%; z-index: 9; width: 100%; height: 41px; background-color: rgb(39, 37, 39); -webkit-app-region: drag; user-select: none; box-shadow: none;"><div style="position: absolute; width: 100%; height: 41px; background-color: rgb(39, 37, 39);"></div><span class="title-label" style="color: rgb(252, 251, 252); position: absolute; top: -1px; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.5px; box-sizing: border-box; left: calc(15% + 16px); width: calc((70% - 32px) - 0px); padding-left: 0px; height: 41px; text-align: center; line-height: 41px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Log Into Your Wallet</span><div style="position: absolute; left: 16px; width: 15%; min-width: 41px; height: 41px;"><div class="hoverable-cell utility disableable" style="cursor: default; border-radius: 3px; height: 24px; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; text-align: center; border: none; text-decoration: none; line-height: 24px; box-sizing: border-box; width: auto; padding: 0px 8px; background-color: rgb(56, 54, 56); color: rgb(252, 251, 252); box-shadow: rgb(22, 20, 22) 0px 0.5px 1px 0px, rgb(73, 71, 73) 0px 0.5px 0px 0px inset; -webkit-font-smoothing: subpixel-antialiased; font-size: 12px; font-weight: 400; letter-spacing: 0.5px; display: block; float: left; margin-top: 10px; -webkit-app-region: no-drag; position: absolute; left: 0px;">Cancel</div></div>
        
        <div @click=${this.loginWithMnemonic} style="position: absolute; right: 16px; width: 15%; min-width: 41px; height: 41px;"><div class="hoverable-cell action disabled" style="cursor: default; border-radius: 3px; height: 24px; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; text-align: center; border: none; text-decoration: none; line-height: 24px; box-sizing: border-box; width: auto; padding: 0px 8px; background-color: rgb(56, 54, 56); box-shadow: none; color: rgb(107, 105, 107); font-weight: 600; -webkit-font-smoothing: subpixel-antialiased; font-size: 12px; letter-spacing: 0.5px; float: right; margin-top: 10px; -webkit-app-region: no-drag; position: absolute; right: 0px;">Next</div>

      </div>
      </div>
        <div style="z-index: 1; position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; overflow: hidden;">
        <div class="ClassNameForScrollingAncestorOfScrollToAbleElement" style="user-select: none; position: relative; box-sizing: border-box; width: 100%; height: 100%; padding: 41px 0px 0px; overflow-y: auto; background-color: rgb(39, 37, 39); color: rgb(192, 192, 192); word-break: break-all;">
        <div class="inlineMessageDialogLayer wantsCloseButton" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; display: none; width: calc(100% - 48px); margin-left: 24px;">
        <span>

        </span>
        <a href="#" class="close-btn">

        </a>
      </div>
        <div>
          <div class="form_field" style="padding-bottom: 0px;">
        <span class="field_title field-title-label">SECRET MNEMONIC<a class="clickableLinkButton" data-id="10" style="color: rgb(17, 187, 236); cursor: pointer; user-select: none; font-family: Native-Light, input, menlo, monospace; -webkit-font-smoothing: subpixel-antialiased; font-size: 10px; letter-spacing: 0.5px; font-weight: 300; width: auto; display: inline; clear: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); margin: 8px 0px 0px 7px; float: none;">?</a>
      </span>
        <textarea id="mnemonic" @keyup=${this.updateMnemonic} .value=${this.mnemonicString} class="field_value" placeholder="From your existing wallet" autocomplete="off" autocapitalize="none" spellcheck="true" style="display: block; padding: 9px 8px; height: 45px; width: calc(100% - 16px); border-radius: 3px; border: none; text-align: left; font-size: 13px; font-weight: 100; line-height: 15px; resize: none; outline: none; font-family: Native-Light, input, menlo, monospace; word-break: break-word; box-shadow: rgba(56, 54, 56, 0.5) 0px 0.5px 0px 0px, rgb(22, 20, 22) 0px 0.5px 0px 0px inset; color: rgb(223, 222, 223); background-color: rgb(29, 27, 29);"></textarea>
      </div>
        <div style="display: none;">
        <div class="form_field" style="padding-bottom: 0px;">
        <span class="field_title field-title-label">ADDRESS<a class="clickableLinkButton" data-id="11" style="color: rgb(17, 187, 236); cursor: pointer; user-select: none; font-family: Native-Light, input, menlo, monospace; -webkit-font-smoothing: subpixel-antialiased; font-size: 10px; letter-spacing: 0.5px; font-weight: 300; width: auto; display: inline; clear: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); margin: 8px 0px 0px 7px; float: none;">?</a>
      </span>
        <textarea class="field_value" autocomplete="off" autocapitalize="none" spellcheck="true" style="display: block; padding: 9px 8px; height: 45px; width: calc(100% - 16px); border-radius: 3px; border: none; text-align: left; font-size: 13px; font-weight: 100; line-height: 15px; resize: none; outline: none; font-family: Native-Light, input, menlo, monospace; word-break: break-word; box-shadow: rgba(56, 54, 56, 0.5) 0px 0.5px 0px 0px, rgb(22, 20, 22) 0px 0.5px 0px 0px inset; color: rgb(223, 222, 223); background-color: rgb(29, 27, 29);">
      </textarea>
      </div>
        <div class="form_field" style="padding-bottom: 0px;">
        <span class="field_title field-title-label">VIEW KEY<a class="clickableLinkButton" data-id="12" style="color: rgb(17, 187, 236); cursor: pointer; user-select: none; font-family: Native-Light, input, menlo, monospace; -webkit-font-smoothing: subpixel-antialiased; font-size: 10px; letter-spacing: 0.5px; font-weight: 300; width: auto; display: inline; clear: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); margin: 8px 0px 0px 7px; float: none;">?</a>
      </span>
        <textarea class="field_value" autocomplete="off" autocapitalize="none" spellcheck="true" style="display: block; padding: 9px 8px; height: 45px; width: calc(100% - 16px); border-radius: 3px; border: none; text-align: left; font-size: 13px; font-weight: 100; line-height: 15px; resize: none; outline: none; font-family: Native-Light, input, menlo, monospace; word-break: break-word; box-shadow: rgba(56, 54, 56, 0.5) 0px 0.5px 0px 0px, rgb(22, 20, 22) 0px 0.5px 0px 0px inset; color: rgb(223, 222, 223); background-color: rgb(29, 27, 29);">
      </textarea>
      </div>
        <div class="form_field" style="padding-bottom: 0px;">
        <span class="field_title field-title-label">SPEND KEY<a class="clickableLinkButton" data-id="13" style="color: rgb(17, 187, 236); cursor: pointer; user-select: none; font-family: Native-Light, input, menlo, monospace; -webkit-font-smoothing: subpixel-antialiased; font-size: 10px; letter-spacing: 0.5px; font-weight: 300; width: auto; display: inline; clear: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); margin: 8px 0px 0px 7px; float: none;">?</a>
      </span>
        <textarea class="field_value" autocomplete="off" autocapitalize="none" spellcheck="true" style="display: block; padding: 9px 8px; height: 45px; width: calc(100% - 16px); border-radius: 3px; border: none; text-align: left; font-size: 13px; font-weight: 100; line-height: 15px; resize: none; outline: none; font-family: Native-Light, input, menlo, monospace; word-break: break-word; box-shadow: rgba(56, 54, 56, 0.5) 0px 0.5px 0px 0px, rgb(22, 20, 22) 0px 0.5px 0px 0px inset; color: rgb(223, 222, 223); background-color: rgb(29, 27, 29);">
      </textarea>
      </div>
      </div>
        <div style="font-family: Native-Light, input, menlo, monospace; -webkit-font-smoothing: subpixel-antialiased; font-size: 11px; letter-spacing: 0px; font-weight: 300; color: rgb(141, 139, 141); margin: 9px 0px 17px 32px; padding-bottom: 8px;">
        <span>Or, use&nbsp;</span>
        <a class="clickableLinkButton" style="color: rgb(17, 187, 236); cursor: pointer; user-select: none; font-family: Native-Light, input, menlo, monospace; -webkit-font-smoothing: subpixel-antialiased; font-size: 11px; letter-spacing: 0px; font-weight: 200; width: auto; display: inline; clear: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); margin: 0px; float: none; text-decoration: none;">Address and Private Keys</a>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
    `;
  }

}

/*

*/

customElements.define('login-mnemonic-view', LoginWithMnemonicView);


