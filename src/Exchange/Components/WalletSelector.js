import {html, css, LitElement} from 'lit';

export class WalletSelector extends LitElement {
  static get styles() {
    return css`
        .WalletSelectView {
            display: block;
            outline: none;
            height: 66px;
            width: 100%;
            padding: 0;
            box-sizing: border-box;
            appearance: none;
            background: #383638;
            border-width: 0;
            box-shadow: 0 0.5px 1px 0 #161416, inset 0 0.5px 0 0 #494749;
            border-radius: 5px;
            text-align: left;
            font-size: 14px;
            color: #FCFBFC;
        }
        
        .WalletSelectView .selectionDisplayCellView,
        .WalletSelectView .options_containerView {
            border-radius: 5px;
            overflow: hidden;
        }
        
        .WalletSelectView > .options_containerView {
            border-radius: 5px;
            box-shadow: 0 15px 12px 0 rgba(0, 0, 0, 0.22), 0 19px 38px 0 rgba(0, 0, 0, 0.30);
        }
        
        .WalletSelectView > .options_containerView > .background {
            background: #383638;
            border-radius: 5px;
            box-shadow: 0 0.5px 1px 0 #161416, inset 0 0.5px 0 0 #494749;
        }
        
        .WalletSelectView > .options_containerView .optionCell.active {
            background-color: rgba(73, 71, 73, 0.95) !important;
        }
        #wallet-selector {
            position: relative;
            padding: 0px;
        }
        .WalletSelectView .selectionDisplayCellView, .WalletSelectView .options_containerView {
            border-radius: 5px;
            overflow: hidden;
        }
        .selectionDisplayCellView .walletIcon {
            position: absolute;
            left: 16px;
            top: 16px;
            background-image: url(../../../assets/img/wallet-6B696B@3x.png);
        }
        
        .walletIcon.medium-32 {
            width: 32px;
            height: 32px;
            background-size: 32px 32px;
        }
        .walletName {
            position: relative;
            box-sizing: border-box;
            padding: 15px 38px 4px 66px;
            display: block;
            word-break: break-word;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
            -webkit-font-smoothing: subpixel-antialiased;
            font-size: 12px;
            font-weight: 400;
            letter-spacing: 0.5px;
            color: rgb(252, 251, 252);
            cursor: default;
        }
        .description-label {
            position: relative;
            box-sizing: border-box;
            padding: 0px 38px 4px 66px;
            font-size: 13px;
            font-family: Native-Light, input, menlo, monospace;
            font-weight: 100;
            -webkit-font-smoothing: subpixel-antialiased;
            max-height: 32px;
            color: rgb(158, 156, 158);
            word-break: normal;
            overflow: hidden;
            text-overflow: ellipsis;
            cursor: default;
        }
        #wallet-options {
            display: none;
            position: absolute;
            width: 100%;
            top: 0px;
            left: 0px;
            z-index: 10;
            max-height: 174.9px;
            height: 132px;
            background: rgb(39, 37, 39);
        }
        .WalletSelectView > .options_containerView {
            border-radius: 5px;
            box-shadow: 0 15px 12px 0 rgba(0,0,0,0.22), 0 19px 38px 0 rgba(0,0,0,0.30);
        }
        // #wallet-options.active {
        //     display: block !important;
        // }
        #wallet-options {
            display: block;
            position: absolute;
            width: 100%;
            top: 0px;
            left: 0px;
            z-index: 10;
            max-height: 174.9px;
            height: 132px;
        }
        .WalletSelectView > .options_containerView {
            border-radius: 5px;
            box-shadow: 0 15px 12px 0 rgba(0,0,0,0.22), 0 19px 38px 0 rgba(0,0,0,0.30);
        }
        .WalletSelectView .selectionDisplayCellView, .WalletSelectView .options_containerView {
            border-radius: 5px;
            overflow: hidden;
        }
        .options_containerView.active {
            background: rgb(39, 37, 39);
        }
        .WalletSelectView > .options_containerView {
            border-radius: 5px;
            box-shadow: 0 15px 12px 0 rgba(0, 0, 0, 0.22), 0 19px 38px 0 rgba(0, 0, 0, 0.30);
        }
        .WalletSelectView .selectionDisplayCellView, .WalletSelectView .options_containerView {
            border-radius: 5px;
            overflow: hidden;
        }
    `;
  }


  static get properties() {
    return {
        displayOptionsDropdown: { type: Boolean },
        wallet: { type: Object },
        context: { type: Object },
        selectedWallet: { type: Object }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    console.log("Wallet selector view connected to DOM");
    console.log(this);
    console.log(this.wallet);
    console.log(this.context);
    console.log(this.wallets);
    
    // let amount = this.wallet.Balance_JSBigInt();
    // let amountJSBigInt = this.wallet.UnlockedBalance_JSBigInt();
    // console.log(amount)
    // console.log(amountJSBigInt)
  }

  constructor() {
    super();
    this.context = {};
    this.wallets = {};
    this.displayOptionsDropdown = false;
  }

  showOptionsDropdown() {
    console.log("Show the options");
    this.displayOptionsDropdown = true;
  }

  updateSelectedWallet(event) {
      console.log(event);
      console.log(this);
      this.displayOptionsDropdown = false;
      console.log(event.path[0].dataset.walletoffset);
  }

  render() {

      // TODO: Find a cleaner way to handle update that doesn't require passing offset to every element
    if (this.wallets?.length > 0) {
        const walletTemplates = [];
        for (let i = 0; i < this.wallets.length; i++) {
            walletTemplates.push(html`
                ${i}
                <div @click=${this.updateSelectedWallet} data-walletlabel="1" data-walletoffset=${i} data-swatch="00F4CD" data-walletbalance="0.00052545" data-walletid="dd7e2ba0-d80d-11eb-b0fd-5d37c436790f" data-walletpublicaddress="47pasa5moXNCSyvvip6sY39VFGYymMhVEXpcaZSaP3hAVNbVXpGu5MVZn9ePeotMRFiJuLq2pB6B3Hm7uWYanyJe1yeSbm9" class="hoverable-cell utility optionCell" style="word-break: break-all; height: 66px; position: relative; left: 0px; top: 0px; box-sizing: border-box; width: 100%;">                    
                    <div data-walletoffset=${i} class="walletIcon medium-32" style="background-image: url('../../../assets/img/wallet-00F4CD@3x.png');"></div>                        
                    <div data-walletoffset=${i} class="walletLabel">1</div>
                    <div data-walletoffset=${i} class="description-label" style="position: relative; box-sizing: border-box; padding: 0px 38px 4px 66px; font-size: 13px; font-family: Native-Light, input, menlo, monospace; font-weight: 100; -webkit-font-smoothing: subpixel-antialiased; max-height: 32px; color: rgb(158, 156, 158); word-break: normal; overflow: hidden; text-overflow: ellipsis; cursor: default;">0.00052545 XMR</div>
                </div>
            `);
        }
        return html`
            <div id="wallet-selector" class="WalletSelectView ListCustomSelectView form_field" data-walletchosen="true" @click=${this.showOptionsDropdown}>
                <!-- selected wallet -->
                <div data-walletoffset="0" data-walletpublicaddress="47pasa5moXNCSyvvip6sY39VFGYymMhVEXpcaZSaP3hAVNbVXpGu5MVZn9ePeotMRFiJuLq2pB6B3Hm7uWYanyJe1yeSbm9" data-walletlabel="1" data-swatch="00F4CD" data-walletbalance="0.00052545" data-walletid="41151480-d025-11eb-abe1-d74624217cf8" id="selected-wallet" class="hoverable-cell utility selectionDisplayCellView" style="" data-walletselected="true">
                        <div id="selected-wallet-icon" class="walletIcon medium-32" style="background-image: url(&quot;../../../assets/img/wallet-00F4CD@3x.png&quot;);"></div>
                        <div id="selected-wallet-label" class="walletName">1</div>
                        <div id="selected-wallet-balance" class="description-label">0.00052545 XMR</div>
                </div>

                <!-- wallet options selector -->
                <div id="wallet-options" class="options_containerView" ?hidden=${this.displayOptionsDropdown}>
                    <div class="options_cellViews_containerView" style="position: relative; left: 0px; top: 0px; width: 100%; height: 100%; z-index: 20; overflow-y: auto; max-height: 174.9px;">
                        ${walletTemplates}
                    </div>
                        
                            
                    
                    
                    <!-- <div data-walletlabel="1" data-walletoffset="1" data-swatch="CFCECF" data-walletbalance="0.000001" data-walletid="8b13b0b0-d80d-11eb-b0fd-5d37c436790f" data-walletpublicaddress="47joJKcNWs66f6ein9qTTVFyzeGnmBEGWKomSuMmqwaBYGj7gv2RvFRRUy1xtzpn6qE8BBpDnuFbp44qe9X1XmK78vqXaij" class="hoverable-cell utility optionCell" style="word-break: break-all; height: 66px; position: relative; left: 0px; top: 0px; box-sizing: border-box; width: 100%;">                    
                        <div class="walletIcon medium-32" style="background-image: url('../../../assets/img/wallet-CFCECF@3x.png');"></div>                        
                        <div class="walletLabel">1</div>
                        <div class="description-label" style="position: relative; box-sizing: border-box; padding: 0px 38px 4px 66px; font-size: 13px; font-family: Native-Light, input, menlo, monospace; font-weight: 100; -webkit-font-smoothing: subpixel-antialiased; max-height: 32px; color: rgb(158, 156, 158); word-break: normal; overflow: hidden; text-overflow: ellipsis; cursor: default;">0.000001 XMR   </div>
                    </div>
                    
                    <div data-walletlabel="1" data-walletoffset="2" data-swatch="6B696B" data-walletbalance="0" data-walletid="41151480-d025-11eb-abe1-d74624217cf8" data-walletpublicaddress="4B9Qr7SnR67RmDgBnRmMe1YKTrtcLzSHAe5yMDMpqfiGc3TqxbaZcdQ46aURH2rJSRTK4p31MQNyBRTSgTtuoK9n8vGVBdD" class="hoverable-cell utility optionCell" style="word-break: break-all; height: 66px; position: relative; left: 0px; top: 0px; box-sizing: border-box; width: 100%;">                    
                        <div class="walletIcon medium-32" style="background-image: url('../../../assets/img/wallet-6B696B@3x.png');"></div>                        
                        <div class="walletLabel">1</div>
                        <div class="description-label" style="position: relative; box-sizing: border-box; padding: 0px 38px 4px 66px; font-size: 13px; font-family: Native-Light, input, menlo, monospace; font-weight: 100; -webkit-font-smoothing: subpixel-antialiased; max-height: 32px; color: rgb(158, 156, 158); word-break: normal; overflow: hidden; text-overflow: ellipsis; cursor: default;">0 XMR   </div>
                    </div>
                    
                    </div>
                </div>
            </div> -->
        `;
        } else {
            console.error("Zero wallet records found");
        }

    }
}
/*

${this.wallets.map((wallet) => {
                            //return html`<provider-card .service=${service} @click=${this.clickHandler}></provider-card>`
                            return html`

                            <div @click=${this.updateSelectedWallet} data-walletlabel="1" data-walletoffset="0" data-swatch="00F4CD" data-walletbalance="0.00052545" data-walletid="dd7e2ba0-d80d-11eb-b0fd-5d37c436790f" data-walletpublicaddress="47pasa5moXNCSyvvip6sY39VFGYymMhVEXpcaZSaP3hAVNbVXpGu5MVZn9ePeotMRFiJuLq2pB6B3Hm7uWYanyJe1yeSbm9" class="hoverable-cell utility optionCell" style="word-break: break-all; height: 66px; position: relative; left: 0px; top: 0px; box-sizing: border-box; width: 100%;">                    
                                <div class="walletIcon medium-32" style="background-image: url('../../../assets/img/wallet-00F4CD@3x.png');"></div>                        
                                <div class="walletLabel">1</div>
                                <div class="description-label" style="position: relative; box-sizing: border-box; padding: 0px 38px 4px 66px; font-size: 13px; font-family: Native-Light, input, menlo, monospace; font-weight: 100; -webkit-font-smoothing: subpixel-antialiased; max-height: 32px; color: rgb(158, 156, 158); word-break: normal; overflow: hidden; text-overflow: ellipsis; cursor: default;">0.00052545 XMR</div>
                            </div>
                            `
                        })}  

*/
customElements.define('wallet-selector', WalletSelector);