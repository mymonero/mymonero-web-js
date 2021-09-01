import { html, css, LitElement } from 'lit';
import ExchangeNavigationController from "./ExchangeNavigationController";
import { FiatApi } from "@mymonero/changenow-exchange-integration";
let fiatApi = new FiatApi({ apiKey: "b1c7ed0a20710e005b65e304b74dce3253cd9ac16009b57f4aa099f2707d64a9" })
//require("./ProviderCard");
require("./WalletSelector");
require("./BuyWithFiatLoadingScreenChangenowView");
require("./SearchableSelect");

export class ChangenowBuyWithFiatView extends ExchangeNavigationController(LitElement) {
    static get styles() {
        return css`
        .submit-button-wrapper {
            position: fixed;
            top: -45px;
            right: 16px;
            width: 15%;
            min-width: 41px;
            height: 41px;
            z-index: 12;
            background: red;
        }
        .submit-button {
            z-index: 13;
            cursor: default;
            border-radius: 3px;
            height: 24px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
            text-align: center;
            border: none;
            text-decoration: none;
            line-height: 24px;
            box-sizing: border-box;
            width: auto;
            padding: 0px 8px;
            background-color: rgb(0, 198, 255);
            box-shadow: rgb(22 20 22) 0px 0.5px 1px 0px, rgb(255 255 255 / 20%) 0px 0.5px 0px 0px inset;
            color: rgb(22, 20, 22);
            font-weight: 300;
            -webkit-font-smoothing: subpixel-antialiased;
            font-size: 12px;
            letter-spacing: 0.5px;
            float: right;
            margin-top: 5px;
            -webkit-app-region: no-drag;
            position: fixed;
            right: 16px;
            font-weight: bold;
            top: -40px;
            z-index: 10000;
        }
        
        .hidden {
            display: none !important;
        }
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

    static get properties() {
        return {
            displayLoadingScreen: { type: Boolean },
            displayOrderScreen: { type: Boolean },
            fiatCurrencies: { 
                type: Array,
                reflect: true
            },
            estimatedFiatRange: {
                type: Object
            }, 
            estimatedCryptoRange: {
                type: Object
            },
            currencyCode: { type: String },
            currencyName: { type: String },
            estimateUsingFiat: { type: Boolean },
            context: { type: Object }
        }
    }
    
    // This function listens for a custom event dispatched from the select box. 
    // It uses the details to update the desired currency
    async updateSelectedCurrency(event) {
        this.currencyCode = event.detail.selectValue;
        this.currencyName = event.detail.selectText;
        // TODO: We need to fire the following events off in parallel
        this.estimatedFiatRange = await this.fiatApi.getMinMaxRange(this.currencyCode, "XMR");
        this.estimatedCryptoRange = await this.fiatApi.getMinMaxRange("XMR", this.currencyCode);
        // Update placeholder with min-max
        console.log(this.estimatedFiatRange);
        console.log(this.estimatedCryptoRange);

    }

    async fireEstimateEvent(event) {
        console.log("handle estimate POST fired");
        console.log("Test?");
        console.log(this);
        console.log(event);
        let options = {
            detail: { 
                
            },
            bubbles: true,
            composed: true
        };
        let estimatePostEvent = new CustomEvent("fire-estimate-event", options)
        this.dispatchEvent(estimatePostEvent, options)
    }
    
    async handleEstimateEvent(event) {
        console.log("Hi from handle stimate event");
        console.log(this);
        console.log(event);
    }

    renderStyles() {
        console.log("Should append styles");
        let styleElement = document.getElementById("lit-styles");
        typeof(styleElement);
        if (styleElement === null) {
            let styles = document.createElement("style");
            styles.innerHTML = `
                #stack-view-stage-view {
                    z-index: 21 !important;
                }
                #leftBarButtonHolderView {
                    z-index: 10;
                }
                #rightBarButtonHolderView {
                    display: none;
                }
                #navigation-bar-view-sub-wrapper {
                    display: none;
                } 
                changenow-buy-with-fiat-view {
                    z-index: 50;
                }
            `
            styles.id = "lit-styles";
            let navigationView = document.getElementById("NavigationBarView");
            navigationView.appendChild(styles);
            console.log("Append those styles");
        }
    }

    async connectedCallback() {
        super.connectedCallback();
        console.log("Try append styles");
        this.renderStyles();
        this.fiatApi = fiatApi;
        console.log("CBWFV template added");
        console.log(this.context);
        this.updateSelectedCurrency.bind(this);
        this.addEventListener('searchable-select-update', this.updateSelectedCurrency);
        //this.addEventListener('fire-estimate-event', this.handleEstimateEvent);
        //let orderBtn = document.getElementById("order-button");
        //this.fireEstimateEvent.bind(this);
        //document.addEventListener('click', this.fireEstimateEvent, false);
        this.displayLoadingScreen = true;
        // TODO: DELETE NEXT LINE AFTER DEBUGGING
        this.displayOrderScreen = true;
        let apiIsAvailable = await this.checkAPIIsAvailable();
        if (apiIsAvailable) {
            this.displayLoadingScreen = false;
            this.displayOrderScreen = true;
            
            let fiatCurrencies = await this.fiatApi.getAvailableFiatCurrencies();
            console.log(fiatCurrencies);
            this.fiatCurrencies = fiatCurrencies;
            this.requestUpdate(); // Check if this is necessary
            //this.displayLoadingScreen = false;
            this.displayOrderScreen = true;
        } else {
            // Show 'not available'
        }
        // 1. checkAPIIsAvailable
        // -- If available, go to step 2
        // -- If unavailable, show 'Unavailaility' message (Maybe we should grey out the panel on the previous page)
        // 2. Get a list of available fiat Currencies
        // 3. Populate select box with available currencies
        // 4. Re-order select options to prioritise popular currencies eg. USD, GBP, JPY
        // 5. Select dropdown should support typing (search against ticker code and against currency's full name)
        // 6. Once currency is selected:
        // -- Show loader 
        // -- Async (keep reference): Get Fiat range estimate (getMinMaxRange(fiat_currency, cryptocurrency))
        // -- Once returned:
        // --- Update UI to display minimum and maximum amounts
        // --- Enable desired amount fields
        // -- If keypress before return
        // --- Cancel previous axios request
        // --- Send new async request (while storing a reference)
        // -- Hide loader 
        // 8. Handle input events
        // -- Check number is valid float
        // -- If float, start async request and keep reference
        // --- When request returns, update currency fields as appropriate
        // -- If async query sent and keypress occurs, cancel async request

    }

    // Returns true when API is available.
    // Returns false when API is unavailable
    // Throws errors in any other scenario
    async checkAPIIsAvailable() {
        try {
            let response = await this.fiatApi.getFiatAPIStatus();
            console.log(response);
            if (response.message == "OK") {
                return true;
            } else {
                return false;
            }
        } catch(error) {
            // TODO: build out better error handling
            console.error("API not available -- network error or unexpected error or ChangeNow response object's format changed")
            console.log(error);
        }
    }
    
    async getTransactionEstimate() {
        try {
            let response = await this.fiatApi.getTransactionEstimate();
            console.log(response);
            if (response.message == "OK") {
                return true;
            } else {
                return false;
            }
        } catch(error) {
            // TODO: build out better error handling
            console.error("API not available -- network error or unexpected error or ChangeNow response object's format changed")
            console.log(error);
        }
    }

    constructor() {
        super();
        this.context = {};
        this.displayLoadingScreen = false;
        this.displayOrderScreen = false;
        this.displayConfirmationScreen = false;
        this.clickHandler = this.clickHandler;
        this.estimatedFiatRange = {};
        this.estimatedCryptoRange = {};
        this.fiatMinMaxString = "Please select a currency";
        this.currencyCode = "";
        this.currencyName = "";
        this.estimateUsingFiat = true;
        this.fiatCurrencies = [{
            "block_explorer_url_mask": null,
            "currency_type": "FIAT",
            "default_exchange_value": "300",
            "enabled": true,
            "has_external_id": false,
            "id": "4881817401",
            "is_available": null,
            "is_featured": null,
            "is_stable": null,
            "logo_url": "",
            "name": "Euro",
            "networks": [],
            "ticker": "EUR",
        },
        {
            "block_explorer_url_mask": null,
            "currency_type": "FIAT",
            "default_exchange_value": "300",
            "enabled": true,
            "has_external_id": false,
            "id": "4881817401",
            "is_available": null,
            "is_featured": null,
            "is_stable": null,
            "logo_url": "",
            "name": "Rand",
            "networks": [],
            "ticker": "ZAR",
        }    
    ];
        this.selectedFiatCurrency = "";
        //this.setScreenTitle("Buy Monero With Fiat");
        this.wallets = [
            {},
            {},
            {}
        ];
    }
    
    handleCurrencyInput(event) {
        console.log(event);

    }
    
    render() {
        // We're going to use conditionals and classes to determine which elements to hide
        return html`
        <div id="changenow-buy-with-fiat">
            <div class="submit-button-wrapper" @click=${this.fireEstimateEvent}>
                <!-- <button class="submit-button" @click=${this.handleEstimateEvent}> -->
                <button class="submit-button" @click=${this.fireEstimateEvent}>
                    Create Order
                </button>
            </div>
            <div class="content-container empty-page-content-container">
                <!-- <buy-with-fiat-loading-screen-changenow></buy-with-fiat-loading-screen-changenow> -->
                <buy-with-fiat-loading-screen-changenow ?hidden=${!this.displayLoadingScreen}></buy-with-fiat-loading-screen-changenow>
                <!-- <div class="message-label exchangeRate" id="explanatory-message">Oh look loading screen</div> -->
                <div class="base-button hoverable-cell navigation-blue-button-enabled action right-add-button exchange-button" id="exchange-xmr">dafuqExchange XMR</div>
                <div ?hidden=${!this.displayOrderScreen}>
                    <div class="exchangeScreen exchange-page-panel">
                        <div class="content-container exchange-page-content-container" id="orderForm">
                        <div id="server-rates-messages"></div>
                        <div id="loader" class="">
                            <!-- gets replaced by loader -->
                        </div>
                        <div>
                            <div id="orderStatusPage" class="active">
                                <wallet-selector .wallets=${this.wallets}></wallet-selector>
                                
                            </div>
                        </div>
                        <div class="form_field" id="currency-table">
                            <table class="full-width">
                                <tbody><tr>
                                    <td>   
                                        <div class="field_title form-field-title">${this.currencyName} to send
                                            <div style="position: relative; left: 0px; top: 0px; padding: 2px 0 0 0;">
                                                <span class="field_title form-field-title label-spacing" style="margin-top: 0px;">AMOUNT</span>
                                                <input id="inCurrencyValue" @input=${this.handleCurrencyInput} class="textInput currencyInput" type="text" placeholder="00.00" value="">
                                                <div id="inCurrencySelector">
                                                    <searchable-select .values=${this.fiatCurrencies}></searchable-select>
                                                    <!-- <select id="inCurrencySelectList" class="currencySelect">
                                                        <option value="XMR">XMR</option>
                                                    </select> -->
                                                </div>
                                            </div>
                                            <div id="transaction-range">
                                                <span id="transaction-range" class="field_title form-field-title" style="margin-top: 8px; color: rgb(158, 156, 158); display: inline-block;">${this.fiatMinMaxString}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div id="inInputDiv" class="field_title form-field-title"><span id="outCurrencyTickerCode">BTC</span> you will receive
                                            <div class="" style="position: relative; left: 0px; top: 0px; padding: 2px 0 0 0">
                                                <span class="field_title form-field-title label-spacing" style="margin-top: 0px;">AMOUNT</span>
                                                <input id="outCurrencyValue" class="textInput currencyInput" type="text" placeholder="00.00" value="">
                                                <div id="outCurrencySelector"><select id="outCurrencySelectList" class="currencySelect"><option value="BTC">BTC</option><option value="ETH">ETH</option></select></div><div class="selectIndicator" style="right: 12px; top: 33px;"></div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <input id="in_address" type="hidden" value="">
                            </tbody></table>
                        </div>

            
                        <div class="form_field" id="getOfferLoader">
        <div id="getOffer" class="graphicAndLabel activityIndicators on-normal-background" style="font-family: Native-Light, input, menlo, monospace; -webkit-font-smoothing: subpixel-antialiased; font-size: 10px; letter-spacing: 0.5px; font-weight: 300; color: rgb(158, 156, 158); padding-left: 0px;">
            <div class="loader">
                <div class="block block1"></div>
                <div class="block block2"></div>
                <div class="block block3"></div>
            </div>&nbsp;
            <span id="activityLoaderText">Fetching offer</span>
        </div>
            </div>
            
            <div class="form_field" id="tx-fee" data-tx-fee="0.000066009466"><span class="field_title form-field-title" style="margin-top: 8px; color: rgb(158, 156, 158); display: inline-block;">+ <span id="feeString">0.000066009466</span> XMR EST. FEE</span></div>

            <div class="form_field" id="btc-address">
                <span class="field_title form-field-title" style="margin-top: 17px;">DESTINATION <span id="outCurrencyCoinName">BITCOIN</span> ADDRESS
                </span>
                <div class="contactPicker" style="position: relative; width: 100%; user-select: none;">
                    <input id="outAddress" class="full-width longTextInput" type="text" placeholder="Destination BTC Address" autocomplete="off" autocapitalize="none" spellcheck="false" value="">
                </div>
            </div>
            <div id="localmonero" style="margin-bottom: 6px; display: block;"><a href="#" id="localmonero-anchor" class="clickableLinkButton" referrer_id="h2t1" url="https://localmonero.co" param_str="rc">Buy Monero using LocalMonero</a></div>
            <div id="indacoin"><a href="#" id="indacoin-anchor" class="clickableLinkButton">Buy Monero using Indacoin</a></div>
            <div id="getAddressValidationLoader">
                
        <style>
        #addressValidationLoader {
            float: left;
            // min-height: 28px;

        }
        #addressValidationLoader .loader {
            float: left;
        }
        #addressValidationLoaderText {
            float: left;
        }
        .exchange-cross {
            color: #d80000;
            font-size: 18px;
            position: relative;
            top: 2px;
        }
        .exchange-tick {
            color: #00CD00;
            font-size: 18px;
            position: relative;
            top: 2px;
        }
        #addressValidationLoader div { 
            // display: none; 
        }
        #addressValidationLoader {
            padding: 0px 24px 0 0;
            display: none;
        }
        
        </style>
        <div id="addressValidationLoader" class="graphicAndLabel activityIndicators on-normal-background" style="font-family: Native-Light, input, menlo, monospace; -webkit-font-smoothing: subpixel-antialiased; font-size: 10px; letter-spacing: 0.5px; font-weight: 300; color: rgb(158, 156, 158); padding-left: 0px;">
            <div class="loader" id="addressValidationLoaderContainer">
                <div class="block block1"></div>
                <div class="block block2"></div>
                <div class="block block3"></div>
            </div>&nbsp;
            <span id="addressValidationLoaderText">Validating Address</span>
        </div>
            </div>
            <div id="validation-messages"></div>
            <div id="address-messages"></div>
            <div id="server-messages"></div>
        </div>
                
        </div>
        <div id="order-status">

        </div>
    </div>
    <div id="exchangePage">
         
                </div>
                </div></div></div>
            </div>
        </div>
        `;
    }

}

customElements.define('changenow-buy-with-fiat-view', ChangenowBuyWithFiatView);