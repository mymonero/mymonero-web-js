import { html, css, LitElement } from 'lit';
import ExchangeNavigationController from "./ExchangeNavigationController";
import { FiatApi } from "@mymonero/changenow-exchange-integration";
let fiatApi = new FiatApi({ apiKey: "b1c7ed0a20710e005b65e304b74dce3253cd9ac16009b57f4aa099f2707d64a9" })
//require("./ProviderCard");
require("./WalletSelector");

export class BuyWithFiatLoadingScreenChangenowView extends ExchangeNavigationController(LitElement) {
    static get styles() {
        return css`
        .form-field-title {
            max-width: 100%;
            margin: 15px 0 8px 0;
            user-select: none;
            display: block;
            text-align: left;
            color: #F8F7F8;
            font-family: Native-Light, input, menlo, monospace;
            -webkit-font-smoothing: subpixel-antialiased;
            font-size: 10px;
            letter-spacing: 0.5px;
            font-weight: 300;
        }
        div#currency-table {
            padding: 0;
        }
        .full-width {
            width: 100% !important;
        }
        #getOfferLoader {
            float: left;
            // min-height: 28px;
            padding: 0px 24px 0 0;
            display: none;
        }
        #getOffer {
            font-family: Native-Light, input, menlo, monospace;
            -webkit-font-smoothing: subpixel-antialiased;
            font-size: 10px;
            letter-spacing: 0.5px;
            font-weight: 300;
            color: rgb(158, 156, 158);
            padding-left: 0px;
        }
        .activityIndicators.graphicAndLabel > div.loader {
            display: inline-block;
            position: relative;
            top: 0px;
        }
        .activityIndicators.on-normal-background .loader > .block {
            background-color: #383638;
            animation: block-animate-normal-bg .75s infinite ease-in-out;
        }
        .activityIndicators .loader > .block1 {
            animation-delay: -1.2s !important;
        }
        .activityIndicators .loader > .block2 {
            animation-delay: -1.0s !important;
        }
        .activityIndicators .loader > .block3 {
            animation-delay: -0.8s !important;
        }
        #tx-fee {
            float: right;
            padding: 0px 13px 7px 6px;
        }
        #minimum-fee-text, #tx-fee, #addressValidationLoaderText {
            font-size: 10px;
        }
        #btc-address {
            clear: both;
            padding: 0px 13px 7px 0px;
        }
        #addressValidationLoader {
            font-family: Native-Light, input, menlo, monospace;
            -webkit-font-smoothing: subpixel-antialiased;
            font-size: 10px;
            letter-spacing: 0.5px;
            font-weight: 300;
            color: rgb(158, 156, 158);
            padding-left: 0px;
            padding: 0px 24px 0 0;
            display: none;
        }
        #addressValidationLoader .loader {
            float: left;
        }
        #addressValidationLoaderText {
            float: left;
            font-size: 10px;
        }
        .activityIndicators.graphicAndLabel > span {
            display: inline-block;
        }
        #validation-messages, #address-messages, #server-messages {
            max-width: fit-content;
        }
        .currencySelect {
            right: 5px;
            left: auto;
        }
        .currencySelect {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
            -webkit-font-smoothing: subpixel-antialiased;
            font-size: 11px;
            font-weight: 400;
            letter-spacing: 0.5px;
            text-indent: 10px;
            color: rgb(223, 222, 223);
            background-color: rgba(80, 74, 80, 0.55);
            position: absolute;
            left: 117.5px;
            width: 56px;
            height: 29.5px;
            border: 0px;
            padding: 0px;
            border-radius: 0px 4px 4px 0px;
            -webkit-appearance: none;
            top: 24px;
        }
        #minimum-fee {
            float: right;
        }
        #minimum-fee-text, #tx-fee, #addressValidationLoaderText {
            font-size: 10px;
            margin-top: 8px;
            color: rgb(158, 156, 158);
            display: inline-block;
        }
        .full-width td {
            display: block;
            width: 100%;
            clear: both;
        }
        input#inCurrencyValue, input#outCurrencyValue {
            width: calc(100% - 70px);
            padding: 0px 0px;
            text-indent: 148px;
            position: relative;
            right: 40px;
            left: 0px;
            padding: 0px 3px;
            margin-right: 5px;
            text-indent: 20px;
            min-width: 104px;
        }
        .textInput {
            display: inline-block;
            height: 29px;
            width: 80px;
            border-radius: 4px;
            border: 1px solid rgba(0, 0, 0, 0);
            text-align: right;
            font-size: 13px;
            font-weight: 200;
            padding: 0px 63px 0px 7px;
            font-family: Native-Light, input, menlo, monospace;
            outline: none;
            box-shadow: rgba(56, 54, 56, 0.5) 0px 0.5px 0px 0px, rgb(22, 20, 22) 0px 0.5px 0px 0px inset;
            color: rgb(223, 222, 223);
            background-color: rgb(29, 27, 29);
        }
        .currencySelect {
            right: 5px;
            left: auto;
        }
        .longTextInput {
            display: block;
            height: 29px;
            width: calc((100% - 2px) - 14px);
            border-radius: 4px;
            border: 1px solid rgba(0, 0, 0, 0);
            text-align: left;
            font-size: 13px;
            font-weight: 200;
            padding: 0px 7px;
            font-family: Native-Light, input, menlo, monospace;
            outline: none;
            box-shadow: rgba(56, 54, 56, 0.5) 0px 0.5px 0px 0px, rgb(22, 20, 22) 0px 0.5px 0px 0px inset;
            color: rgb(223, 222, 223);
            background-color: rgb(29, 27, 29);
        }
        `;
        /*
            #getOfferLoader {
                float: left;
                // min-height: 28px;
            }
            #getOfferLoader div { 
                // display: none; 
            }
            #getOfferLoader {
                padding: 0px 24px 0 0;
                display: none;
            }
            #tx-fee {
                float: right;
            }
            #btc-address {
                clear: both;
            }
        
        */
    }
    async connectedCallback() {
        super.connectedCallback();
    }

    constructor() {
        super();
    }
    
    render() {
        // We're going to use conditionals and classes to determine which elements to hide
        return html`
            
        `;
    }

}

customElements.define('buy-with-fiat-loading-screen-changenow', BuyWithFiatLoadingScreenChangenowView);