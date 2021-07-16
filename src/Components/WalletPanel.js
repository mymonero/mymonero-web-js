import {html, css, LitElement} from 'lit';

export class WalletPanel extends LitElement {
  static get styles() {
    return css`


    `;
  }


  static get properties() {
    return {
      wallet: { type: Object },
      context: { type: Object }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    console.log("Wallet panel view connected to DOM");
    console.log(this);
    console.log(this.wallet);
    console.log(this.context);
    // let amount = this.wallet.Balance_JSBigInt();
    // let amountJSBigInt = this.wallet.UnlockedBalance_JSBigInt();
    // console.log(amount)
    // console.log(amountJSBigInt)
  }

  constructor() {
    super();
    this.context = {};
    this.wallet = {};
  }

  render() {
    return html`
        <div style="margin: 16px 0px 0px;">
            <div style="position: relative; left: 16px; top: 0px; width: calc(100% - 32px); height: 80px; background: rgb(56, 54, 56); box-shadow: rgb(22, 20, 22) 0px 0.5px 1px 0px, rgb(73, 71, 73) 0px 0.5px 0px 0px inset; border-radius: 5px; overflow: hidden; margin: 0px 0px 12px;">
              <div class="hoverable-cell utility" style="word-break: break-all; height: 100%; position: relative; left: 0px; top: 0px;">
                <div class="walletIcon large-48" style="position: absolute; left: 15px; top: 16px; background-image: url('./src/assets/img/wallet-00C6FF@3x.png');"></div>
                <div style="position: relative; box-sizing: border-box; padding: 20px 38px 4px 80px; display: block; word-break: break-word; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; -webkit-font-smoothing: subpixel-antialiased; font-size: 12px; font-weight: 400; letter-spacing: 0.5px; color: rgb(252, 251, 252); cursor: default;">${this.wallet.walletLabel}</div>
                <div class="description-label" style="position: relative; box-sizing: border-box; padding: 0px 38px 4px 80px; font-size: 13px; font-family: Native-Light, input, menlo, monospace; font-weight: 100; -webkit-font-smoothing: subpixel-antialiased; max-height: 32px; color: rgb(158, 156, 158); word-break: normal; overflow: hidden; text-overflow: ellipsis; cursor: default;">0.000001&nbsp;XMR</div>
              </div>
              <img src="./src/assets/img/list_rightside_chevron@3x.png" style="position: absolute; pointer-events: none; width: 7px; height: 12px; right: 16px; top: calc(50% - 6px); display: block;">
              <div class="graphicOnly activityIndicators on-accent-background" style="position: absolute; pointer-events: none; width: 16px; height: 14px; right: 16px; top: calc(50% - 7px); display: none;">
                <div class="loader">
                  <div class="block block1"></div>
                  <div class="block block2"></div>
                  <div class="block block3"></div>
                </div>
              </div>
            </div>
        </div>
    `;
  }

}

/*

*/

customElements.define('wallet-panel', WalletPanel);






/**/