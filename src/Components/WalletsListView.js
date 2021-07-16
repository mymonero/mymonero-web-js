import {html, css, LitElement} from 'lit';
import NavigationController from './NavigationController'

export class WalletsListView extends NavigationController(LitElement) {
  static get styles() {
    return css`
      .walletIcon {
        position: relative;
        background-repeat: no-repeat;
        background-position: center;
      }
      
      .walletIcon.large-48 {
        width: 48px;
        height: 48px;
        background-size: 48px 48px;
      }
      
      .walletIcon.large-43 {
        width: 43px;
        height: 43px;
        background-size: 43px 43px;
      }
      
      .walletIcon.medium-32 {
        width: 32px;
        height: 32px;
        background-size: 32px 32px;
      }

      .hoverable-cell {
        transition: background-color 0.1s ease-out;
      }
      
      .hoverable-cell.utility:not(.disabled):not(.active):not([disabled]):hover {
        background-color: #3f3e3f !important;
      }
      
      .hoverable-cell.action:not(.disabled):not(.active):not([disabled]):hover {
        background-color: #33d1ff !important;
      }
      
      .hoverable-cell.destructive:not(.disabled):not(.active):not([disabled]):hover {
        background-color: #f77e7e !important;
      }
      
      .hoverable-cell.disableable[disabled="disabled"],
      .hoverable-cell.disableable.disabled {
        opacity: 0.5;
      }

      .activityIndicators .loader > .block {
        margin: 1px;
        float: left;
        width: 3px;
        height: 8px;
        border-radius: 2px;
        box-shadow: inset 0 1px 0 rgba(73, 71, 73, 0.5), 0 1px 1px rgba(0, 0, 0, 0.3);
      }
      
      .activityIndicators.on-normal-background .loader > .block {
        background-color: #383638;
        animation: block-animate-normal-bg 0.75s infinite ease-in-out;
      }
      
      .activityIndicators.on-accent-background .loader > .block {
        background-color: #5a585a;
        animation: block-animate-on-accent-bg 0.75s infinite ease-in-out;
      }
      
      .activityIndicators .loader > .block1 {
        animation-delay: -1.2s !important;
      }
      
      .activityIndicators .loader > .block2 {
        animation-delay: -1s !important;
      }
      
      .activityIndicators .loader > .block3 {
        animation-delay: -0.8s !important;
      }
      
      @keyframes block-animate-normal-bg {
        0%,
        20%,
        60%,
        100% {
          transform: translateY(2px);
          background-color: #383638;
        }
        40% {
          transform: translateY(0);
          background-color: #494749;
        }
      }
      
      @keyframes block-animate-on-accent-bg {
        0%,
        20%,
        60%,
        100% {
          transform: translateY(2px);
          background-color: #5a585a;
        }
        40% {
          transform: translateY(0);
          background-color: #7c7a7c;
        }
      }
      
      .activityIndicators.graphicAndLabel {
        padding: 8px 10px 7px 32px;
      }
      
      .activityIndicators.graphicAndLabel > div.loader {
        display: inline-block;
        position: relative;
        top: 0px;
      }
      
      .activityIndicators.graphicAndLabel > span {
        display: inline-block;
      }
      
    `;
  }

  static get properties() {
    return {
      context: { type: Object },
      test: { type: String },
      walletRecords: { type: Array }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    console.log("Page Template view connected to DOM");
    console.log(this);
    console.log(this.context);
    console.log(this.context.walletsListController);
    console.log(this.context.walletsListController.records);
    this.walletRecords = this.context.walletsListController.records;
    console.log(this.walletRecords);
  }

  constructor() {
    super();
    this.context = {};
    this.test = "testing 123";
    this.walletRecords = [];
  }

  render() {
    return html`
        
        <div style="z-index: 1; position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; overflow: hidden;">
          ${this.context.walletsListController.records[0].walletLabel}
          
          ${this.walletRecords.map((wallet) => {
            console.log(wallet);
            return html`<wallet-panel .wallet=${wallet}></wallet-panel>`
          })}
        </div>
    `;
  }

}

/*


<div style="z-index: 1; position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; overflow: hidden;">
          ${this.context.walletsListContoller.records.map((wallet) =>  {
            html`<wallet-panel></wallet-panel>`
          })}
        </div>

        -------

      <div style="overflow: hidden; position: absolute; top: 0px; left: 79px; width: calc(100% - 79px); height: 100%; background: rgb(39, 37, 39);">
        <div style="position: relative; left: 0px; top: 0px; width: 100%; height: 100%; overflow: hidden;">
          <div class="NavigationBarView" style="position: absolute; top: 0%; z-index: 9; width: 100%; height: 41px; background-color: rgb(39, 37, 39); -webkit-app-region: drag; user-select: none; box-shadow: none;">
            <div style="position: absolute; width: 100%; height: 41px; background-color: rgb(39, 37, 39);">

            </div>
            <span class="title-label" style="color: rgb(252, 251, 252); position: absolute; top: -1px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.5px; box-sizing: border-box; left: calc(15% + 16px); width: calc((70% - 32px) - 0px); padding-left: 0px; height: 41px; text-align: center; line-height: 41px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            <a href="https://mymonero.com" target="_blank" style="text-decoration: none; color: rgb(252, 251, 252); ">
              <span style="width: 30px; height: 20px; display: inline-block; margin-right: 6px;">
                <span class="title-logo">&nbsp;</span>
                </span>MyMonero v1.1.22</a>
              </span>
            <div style="position: absolute; left: 16px; width: 15%; min-width: 41px; height: 41px;">

            </div>
            <div style="position: absolute; right: 16px; width: 15%; min-width: 41px; height: 41px;">

            </div>
      </div>
*/

customElements.define('wallets-list-view', WalletsListView);


