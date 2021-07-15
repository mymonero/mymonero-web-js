import {html, css, LitElement} from 'lit';
import WalletsListView from '../WalletsList/Views/WalletsListView.web.js';
import NavigationController from "./NavigationController";

export class LandingPageGreeting extends NavigationController(LitElement) {
  static get styles() {
    return css`
      .message-label { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; letter-spacing: 0px; font-size: 13px; -webkit-font-smoothing: subpixel-antialiased; font-weight: 300; }
    `;
  }

  static get properties() {
    return {
      name: {type: String}
    }
  }

  constructor() {
    super();
    this.name = 'Somebody';
    this.hideText = this.hideText;
  }

  render() {
    return html`
    <div style="position: relative; left: 0px; top: 0px; width: 100%; height: 100%; overflow: hidden;">
    <div class="NavigationBarView" style="position: absolute; top: 0%; z-index: 9; width: 100%; height: 41px; background-color: rgb(39, 37, 39); -webkit-app-region: drag; user-select: none; box-shadow: none;">
    <div style="position: absolute; width: 100%; height: 41px; background-color: rgb(39, 37, 39);">

    </div>
    <span class="title-label" style="color: rgb(252, 251, 252); position: absolute; top: -1px; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.5px; box-sizing: border-box; left: calc(15% + 16px); width: calc((70% - 32px) - 0px); padding-left: 0px; height: 41px; text-align: center; line-height: 41px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
      <a href="https://mymonero.com" target="_blank" style="text-decoration: none; color: rgb(252, 251, 252); ">
    <span style="width: 30px; height: 20px; display: inline-block; margin-right: 6px;">
    <span class="title-logo">&nbsp;</span>
  </span>MyMonero v1.1.22</a>
  </span>
  <div style="position: absolute; left: 16px; width: 15%; min-width: 41px; height: 41px;"></div>
  <div style="position: absolute; right: 16px; width: 15%; min-width: 41px; height: 41px;"></div>
  </div>
  <div style="z-index: 1; position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; overflow: hidden;"><div style="overflow-y: hidden; box-sizing: border-box; width: 100%; height: 100%; padding: 41px 0px 0px; user-select: none; word-break: break-all; background-color: rgb(39, 37, 39); color: rgb(192, 192, 192);"><div style="margin-top: 19px; margin-left: 16px; width: calc(100% - 32px); height: calc(100% - 19px); display: block;"><div class="emptyScreens" style="width: calc((100% - 0px) - 2px); height: calc(100% - 56px); margin: 0px;"><div class="content-container" style="display: table-cell; vertical-align: middle; transform: translateY(-16px);"><div class="emoji-label"><div class="smiley"></div></div><div class="message-label" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; letter-spacing: 0px; font-size: 13px; -webkit-font-smoothing: subpixel-antialiased; font-weight: 300;">Welcome to MyMonero!<br>Let's get started.</div></div></div><div style="position: fixed; top: calc(((100% - 32px) - 8px) - 32px); width: calc((100% - 95px) - 16px); height: 32px; z-index: 1000;">
  <a @click=${this.navigateToPage} data-page-destination="loginWithMnemonic" href="#" class="hoverable-cell disableable utility" style="opacity: 1; display: inline-block; width: calc(50% - 4.5px); height: 32px; box-sizing: border-box; border-radius: 3px; color: rgb(252, 251, 252); background-color: rgb(56, 54, 56); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; -webkit-font-smoothing: subpixel-antialiased; font-size: 12px; letter-spacing: 0.5px; font-weight: 400; line-height: 34px; box-shadow: rgb(22, 20, 22) 0px 0.5px 1px 0px, rgb(73, 71, 73) 0px 0.5px 0px 0px inset; text-decoration: none; text-align: center; margin-right: 9px;">Use existing wallet</a><a href="#" class="hoverable-cell disableable action" style="opacity: 1; display: inline-block; width: calc(50% - 4.5px); height: 32px; box-sizing: border-box; border-radius: 3px; color: rgb(22, 20, 22); background-color: rgb(0, 198, 255); box-shadow: rgba(255, 255, 255, 0.2) 0px 0.5px 0px 0px inset; -webkit-font-smoothing: subpixel-antialiased; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 13px; letter-spacing: 0px; font-weight: 600; transform: none; line-height: 32px; text-decoration: none; text-align: center;">Create new wallet</a>
  </div></div><div style="display: none;"></div></div></div></div>

    `;
  }

  hideText(event) {
    console.log("hideText");
    console.log("Haaaai");
    this.name = "oh hi"
  }
}
/* Old body */

// <div class="smiley"></div>
// <div class="message-label" style="">Welcome to MyMonero!<br>Let's get started.</div>
// <p @click=${this.hideText}>By the way, this is a lit element without bullshit in-line styles</p>
// <p>${this.name}</p>

customElements.define('landing-page-greeting', LandingPageGreeting);
