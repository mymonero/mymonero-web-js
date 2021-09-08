import { html, css, LitElement } from 'lit';
import ExchangeNavigationController from "./ExchangeNavigationController";
import { FiatApi } from "@mymonero/changenow-exchange-integration";
let fiatApi = new FiatApi({ apiKey: "b1c7ed0a20710e005b65e304b74dce3253cd9ac16009b57f4aa099f2707d64a9" })
//require("./ProviderCard");
require("./WalletSelector");
require("./BuyWithFiatLoadingScreenChangenowView");
require("./SearchableSelect");
require("./ActivityIndicator");
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
        }
        .submit-button {
            z-index: 13;
            position: fixed;
            right: 16px;
            font-weight: bold;
            top: -40px;
            z-index: 10000;
        }
        .submit-button, .confirmation-button {
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
            -webkit-font-smoothing: subpixel-antialiased;
            font-size: 12px;
            font-weight: bold;
            letter-spacing: 0.5px;
            float: right;
            margin-top: 5px;
            -webkit-app-region: no-drag;
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
        span#outCurrencyValue {
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
        #inCurrencySelector {
            float: right;
        }
        #currency-loader {
            float: right;
        }
        .even-row {
            background-color: #3f3e3f !important;
        }
        .odd-row {
            background-color: rgb(56, 54, 56) !important;
        }
        /** Exchange estimate details */
        ._1cirut65EB12USDiEhO2zq {
         padding: 20px 12px;
         font-size: 14px;
         line-height: 16px;
         font-weight: normal;
         color: #a9a9a9;
         }
         ._1pp_gWT5dnuzZJA1mo3gvF {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 24px;
            width: 100%;
        }
        ._2NuhlQ6U4VlrLBMQGTwVva {
            display: flex;
            flex-direction: column;
        }
        ._1pp_gWT5dnuzZJA1mo3gvF {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 24px;
            width: 100%;
        }
        ._2fdmvG_PL73fAbFIB6iqQS {
            display: flex;
            align-items: center;
        }
        ._20hVU_-g9vCHTYfwdhhDDx {
            margin-left: 5px;
            display: none;
            align-items: center;
        }
        ._39Mx3V_-7c4QeAK7Ja-evS {
            position: relative;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
        }
        .estimate-label {
            margin: 10px 0px 0px 15px;
            font-size: 13px;
            font-family: Native-Light, input, menlo, monospace;
            font-weight: 800;
            -webkit-font-smoothing: subpixel-antialiased;
        }
        .estimate-value {
            margin: 10px 15px 0px 0px;
            font-size: 13px;
            font-family: Native-Light, input, menlo, monospace;
            font-weight: 100;
            -webkit-font-smoothing: subpixel-antialiased;
        }
        #estimate-details {
            display: block;
            outline: none;
            height: auto;
            width: 100%;
            padding: 0px;
            box-sizing: border-box;
            appearance: none;
            background: rgb(56, 54, 56);
            border-width: 0px;
            box-shadow: rgb(22 20 22) 0px 0.5px 1px 0px, rgb(73 71 73) 0px 0.5px 0px 0px inset;
            border-radius: 5px;
            text-align: left;
            font-size: 14px;
            color: rgb(252, 251, 252);
        }
        .estimate-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 0px;
            width: 100%;
            padding: 10px 0px 20px;
        }
        .estimate-row:first-of-type {
            border-radius: 10px 10px 0px 0px;
        }
        .estimate-row:last-of-type {
            border-radius: 0px 0px 10px 10px;
        }
        .wallet-select-wrapper {
            position: relative;
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
            /* Display values */
            displayLoadingScreen: { type: Boolean },
            displayEstimateRetrieval: { type: Boolean },
            displayOrderScreen: { type: Boolean },

            /* Error handler values */
            handleCurrencyInputResponseErrorString: { type: String },
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
            estimateDetails: {
                type: Object
            },
            estimatedFiatRangeString: { type: String },
            estimatedCryptoRangeString: { type: String },
            inCurrencyCode: { type: String },
            inCurrencyName: { type: String },
            inCurrencyValue: { type: String },
            outCurrencyCode: { type: String },
            outCurrencyName: { type: String },
            outCurrencyValue: { type: String },
            estimateUsingFiat: { type: Boolean },
            context: { type: Object },
            redirectUrl: { type: String },
            selectedWallet: { type: Object}
        }
    }
    
    // This function listens for a custom event dispatched from the select box. 
    // It uses the details to update the desired currency
    async updateSelectedCurrency(event) {
        this.inCurrencyCode = event.detail.selectValue;
        this.inCurrencyName = event.detail.selectText;
        this.displayMinMaxLoadingIndicator = true;
        let rangeQueryArray = [this.fiatApi.getMinMaxRange(this.inCurrencyCode, "XMR"), this.fiatApi.getMinMaxRange("XMR", this.inCurrencyCode)]
        this.displayMinMaxLoadingIndicator = false;
        let [estimatedFiatRange, estimatedCryptoRange] = await Promise.all(rangeQueryArray);
        this.estimatedFiatRange = estimatedFiatRange;
        this.estimatedCryptoRange = estimatedCryptoRange;
        this.estimatedFiatRangeString = `${estimatedFiatRange.min} - ${estimatedFiatRange.max}`
        this.estimatedCryptoRangeString = `${estimatedCryptoRange.min} - ${estimatedCryptoRange.max}`
        this.fiatMinMaxString = `You can exchange between ${estimatedFiatRange.min} ${this.inCurrencyCode} and ${estimatedFiatRange.max} ${this.inCurrencyCode}`
    }

    async fireEstimateEvent(event) {
        console.log("handle estimate POST fired");
        console.log("Test?");
        console.log(this);
        console.log(this.inCurrencyCode);
        console.log(this.inCurrencyValue);
        console.log(event);
        let options = {
            detail: { 
                
            },
            bubbles: true,
            composed: true
        };
        let estimatePostEvent = new CustomEvent("fire-estimate-event", options)
        this.dispatchEvent(estimatePostEvent, options)
        let estimateResponse = await this.fiatApi.createExchangeTransaction(this.inCurrencyValue, this.inCurrencyCode, "XMR", this.selectedWallet.public_address);
        // todo -- service fee can be array of multiple fees -- bank fee not always charged
        const estimateDetails = {
            convertedAmount: estimateResponse.convertedAmount,
            expected_to_amount: estimateResponse.expected_to_amount,
            estimatedExchangeRate: estimateResponse.estimate_breakdown.estimatedExchangeRate,
            estimatedExchangeRateString: estimateResponse.estimate_breakdown.estimatedExchangeRate + " " + estimateResponse.to_currency,
            id: estimateResponse.id,
            initial_from_currency: estimateResponse.initial_from_currency,
            initial_expected_from_amount: estimateResponse.expected_from_amount,
            networkFee: estimateResponse.estimate_breakdown.networkFee,
            redirected_amount: estimateResponse.redirected_amount,
            serviceFees: estimateResponse.estimate_breakdown.serviceFees,
            serviceFeeString: "N/A",
            bankFeeString: "N/A",
            to_currency: estimateResponse.to_currency,
            networkFeeString: estimateResponse.estimate_breakdown.networkFee.amount + " " + estimateResponse.estimate_breakdown.networkFee.currency
        }
        const serviceFees = estimateResponse.serviceFees;
        estimateResponse.estimate_breakdown.serviceFees.forEach((fee) => {
            if (fee.name.toUpperCase() === "BANK FEE") {
                estimateDetails.bankFeeString = fee.amount + " " + fee.currency
            } else if (fee.name.toUpperCase() == "SERVICE FEE") {
                estimateDetails.serviceFeeString = fee.amount + " " + fee.currency
            }
        })
        this.redirectUrl = estimateResponse.redirect_url;
        this.estimateDetails = estimateDetails;
        
        /* 
        {"id":"4900188772",
        "status":"new",
        "email":null,"errors":[],"status_details":null,"from_currency":"GBP",
        "initial_from_currency":"GBP",
        "from_network":null,"from_currency_with_network":null,"from_amount":"0",
        "deposit_type":"VISA_MC1",
        "payout_type":"CRYPTO_THROUGH_CN",
        "expected_from_amount":"75.5555",
        "initial_expected_from_amount":"75.5555",
        "to_currency":"XMR",
        "to_network":null,"to_currency_with_network":null,"to_amount":null,"output_hash":null,"expected_to_amount":"0.3075642",
        "location":"ZA",
        "created_at":"2021-09-03T09:13:04.822Z",
        "updated_at":"2021-09-03T09:13:04.822Z",
        "partner_id":"5833338174",
        "external_partner_link_id":null,"estimate_breakdown":{"toAmount":"0.3075642",
        "fromAmount":75.5555,
        "serviceFees":
            [{"name":"Bank fee","amount":"3.02222","currency":"GBP"},{"name":"Service fee","amount":"2.25","currency":"GBP"}],
        "convertedAmount":
            {"amount":"70.28328","currency":"GBP"},
        "estimatedExchangeRate":"0.00437606",
        "networkFee":{"amount":"0.001",
        "currency":"XMR"
    }},"payout":{"address":"47joJKcNWs66f6ein9qTTVFyzeGnmBEGWKomSuMmqwaBYGj7gv2RvFRRUy1xtzpn6qE8BBpDnuFbp44qe9X1XmK78vqXaij","extra_id":"1"},"redirect_url":"https://payments.guardarian.com/checkout?tid=4900188772"}
            */
        console.log(estimateResponse);
    }
    
    redirectToURL() {
        window.open(this.redirectUrl);
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

    updateSelectedWallet(event) {
        console.log("Update wallet on form");
        console.log(event);
        this.selectedWallet = event.detail.wallet;
    }

    async connectedCallback() {
        super.connectedCallback();
        this.renderStyles();
        this.fiatApi = fiatApi;
        this.wallets = this.context.walletsListController.records;
        console.log(this.wallets);
        console.log("CBWFV template added");
        this.updateSelectedCurrency.bind(this);
        this.addEventListener('searchable-select-update', this.updateSelectedCurrency);
        this.addEventListener('wallet-selector-update', this.updateSelectedWallet);
        
        //this.addEventListener('fire-estimate-event', this.handleEstimateEvent);
        //let orderBtn = document.getElementById("order-button");
        //this.fireEstimateEvent.bind(this);
        //document.addEventListener('click', this.fireEstimateEvent, false);
        this.displayLoadingScreen = true;
        // TODO: DELETE NEXT LINE AFTER DEBUGGING
        this.displayOrderScreen = true;
        this.displayMinMaxLoadingIndicator = false;
        let apiIsAvailable = await this.checkAPIIsAvailable();
        if (apiIsAvailable) {
            this.displayLoadingScreen = false;
            this.displayOrderScreen = true;
            
            let fiatCurrencies = await this.fiatApi.getAvailableFiatCurrencies();
            console.log(fiatCurrencies);
            this.fiatCurrencies = fiatCurrencies;
            console.log("Reqhest update");
            this.requestUpdate(); // Check if this is necessary
            //this.displayLoadingScreen = false;
            this.displayCurrencyLoadingIndicator = false;
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
        this.displayEstimateRetrieval = false;
        this.displayOrderScreen = false;
        this.displayConfirmationScreen = false;
        this.displayCurrencyLoadingIndicator = true;
        this.handleCurrencyInputResponseErrorString = false;
        this.clickHandler = this.clickHandler;
        this.estimateDetails = {
            convertedAmount: "",
            expected_to_amount: "",
            estimatedExchangeRate: "",
            estimatedExchangeRateString: "",
            id: "",
            initial_from_currency: "",
            initial_expected_from_amount: "",
            networkFee: "",
            redirected_amount: "",
            serviceFees: "",
            serviceFeeString: "",
            bankFeeString: "",
            to_currency: "",
            networkFeeString: ""
        };
        this.estimatedFiatRange = {};
        this.estimatedFiatRangeString = "";
        this.estimatedCryptoRangeString = "";
        this.estimatedCryptoRange = {};
        this.fiatMinMaxString = "";
        this.inCurrencyCode = "";
        this.inCurrencyName = "";
        this.inCurrencyValue = "";
        this.outCurrencyCode = "XMR";
        this.outCurrencyName = "Monero";
        this.outCurrencyValue = "";
        this.estimateUsingFiat = true;
        this.outCurrencyValue = "";
        this.redirectUrl = "";
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
        if (event.path[0].id == "inCurrencyValue") {
            this.inCurrencyValue = event.path[0].value;
        } else if (event.path[0].id == "outCurrencyValue") {
            this.outCurrencyValue = event.path[0].value;
        }

        this.estimateRequestTimer = setTimeout(() => {
            console.log(this);
            console.log("User input event finished -- get estimate");
            if (this.inCurrencyCode.length > 0) {
                console.log("Looks legit");
                // TODO: Put this into standalone function 
                this.handleCurrencyInputResponse();
            }
        }, 2000);
        console.log(this);
        console.log(event);
        // We would invoke a timer, and when the timer expires, do a GET (giving the user a chance to finish typing)
        console.log(this.inCurrencyCode);
        console.log(this.inCurrencyValue);
        console.log(this.inCurrencyValue,this.outCurrencyValue)
    }

    async handleCurrencyInputResponse() {
        this.displayEstimateRetrieval = true;
        try {
            let response = await this.fiatApi.getTransactionEstimate(this.inCurrencyValue, this.inCurrencyCode, "XMR");
            this.outCurrencyValue = response.value;
        } catch (error) {
            this.displayEstimateRetrievalError = true;
            this.handleCurrencyInputResponseErrorString = error.message;
        }
        this.displayEstimateRetrieval = false;
    }
    
    render() {
        // We're going to use conditionals and classes to determine which elements to hide
        return html`
        <div id="changenow-buy-with-fiat">
            <div class="submit-button-wrapper">
                <!-- <button class="submit-button" @click=${this.handleEstimateEvent}> -->
                <button class="submit-button" @click=${this.fireEstimateEvent}>
                    Get Quote
                </button>
            </div>
            <div class="content-container empty-page-content-container">
                <!-- <buy-with-fiat-loading-screen-changenow></buy-with-fiat-loading-screen-changenow> -->
                <!-- <activity-indicator .loadingText=${"Loading text would go here"}></activity-indicator> -->
                <buy-with-fiat-loading-screen-changenow ?hidden=${!this.displayLoadingScreen}></buy-with-fiat-loading-screen-changenow>
                <!-- <div class="message-label exchangeRate" id="explanatory-message">Oh look loading screen</div> -->
                <div ?hidden=${!this.displayOrderScreen}>
                    <div class="exchangeScreen exchange-page-panel">
                        <div class="content-container exchange-page-content-container" id="orderForm">
                        <div id="server-rates-messages"></div>
                        <div id="loader" class="">
                            <!-- gets replaced by loader -->
                        </div>
                        <div class="form_field wallet-select-wrapper">
                            <wallet-selector .wallets=${this.wallets}></wallet-selector>
                        </div>
                        <div class="form_field" id="currency-table">
                            <table class="full-width">
                                <tbody><tr>
                                    <td>   
                                        <div class="field_title form-field-title">${this.inCurrencyName.length == 0 ? "Please select a currency" : this.inCurrencyName + " you will pay" } 
                                            <div style="position: relative; left: 0px; top: 0px; padding: 2px 0 0 0;">
                                                <span class="field_title form-field-title label-spacing" style="margin-top: 0px;">AMOUNT</span>
                                                <input id="inCurrencyValue" 
                                                    @input=${this.handleCurrencyInput} 
                                                    class="textInput currencyInput" 
                                                    type="text" 
                                                    .placeholder=${this.estimatedFiatRangeString.length > 0 ? this.estimatedFiatRangeString : "00.00" } 
                                                    .value=${this.inCurrencyValue}>
                                                <div id="inCurrencySelector">
                                                    <searchable-select .values=${this.fiatCurrencies}></searchable-select>
                                                    <!-- <select id="inCurrencySelectList" class="currencySelect">
                                                        <option value="XMR">XMR</option>
                                                    </select> -->
                                                </div>
                                            </div>
                                            <div id="transaction-range">
                                                <span id="transaction-range" class="field_title form-field-title" style="margin-top: 8px; color: rgb(158, 156, 158); display: inline-block;">${this.fiatMinMaxString}</span>
                                                <div id="currency-loader">
                                                    <activity-indicator .loadingText=${"Loading supported currencies"} ?hidden=${!this.displayCurrencyLoadingIndicator}></activity-indicator>
                                                    <activity-indicator .loadingText=${"Please wait while we load the minimum and maximum transaction amount limits"} ?hidden=${!this.displayMinMaxLoadingIndicator}></activity-indicator>
                                                    <activity-indicator .loadingText=${"Busy retrieving estimate"} ?hidden=${!this.displayEstimateRetrieval}></activity-indicator>
                                                    <div id="errorResponse" class="graphicAndLabel activityIndicators on-normal-background" ?hidden=${!this.displayErrorResponse}>
                                                        <span id="errorResponseText">${this.handleCurrencyInputResponseErrorString}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <!--
                                        <div id="inInputDiv" class="field_title form-field-title"><span id="outCurrencyTickerCode">XMR</span> you will receive
                                            <div class="" style="position: relative; left: 0px; top: 0px; padding: 2px 0 0 0">
                                                <span class="field_title form-field-title label-spacing" style="margin-top: 0px;">AMOUNT</span>
                                                <span id="outCurrencyValue">${this.outCurrencyValue}</span>
                                                <!-- CN API doesn't support getting a fiat value to pay from a crypto amount yet
                                                    <input id="outCurrencyValue" 
                                                    @input=${this.handleCurrencyInput} 
                                                    class="textInput currencyInput" 
                                                    type="text" 
                                                    .placeholder=${this.estimatedCryptoRangeString.length > 0 ? this.estimatedCryptoRangeString : "00.00" } 
                                                    .value=${this.outCurrencyValue}> 
                                                <div id="outCurrencySelector">
                                                    <select id="outCurrencySelectList" class="currencySelect">
                                                        <option value="XMR">XMR</option>
                                                    </select>
                                                </div>
                                                <div class="selectIndicator" style="right: 12px; top: 33px;"></div>
                                            </div>
                                        </div>
                                        -->
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
            <div class="form_field" id="estimate-details">
                <!-- {"id":"4900188772","status":"new","email":null,"errors":[],"status_details":null,"from_currency":"GBP","initial_from_currency":"GBP","from_network":null,"from_currency_with_network":null,"from_amount":"0","deposit_type":"VISA_MC1","payout_type":"CRYPTO_THROUGH_CN","expected_from_amount":"75.5555","initial_expected_from_amount":"75.5555","to_currency":"XMR","to_network":null,"to_currency_with_network":null,"to_amount":null,"output_hash":null,"expected_to_amount":"0.3075642","location":"ZA","created_at":"2021-09-03T09:13:04.822Z","updated_at":"2021-09-03T09:13:04.822Z","partner_id":"5833338174","external_partner_link_id":null,"estimate_breakdown":{"toAmount":"0.3075642","fromAmount":75.5555,"serviceFees":[{"name":"Bank fee","amount":"3.02222","currency":"GBP"},{"name":"Service fee","amount":"2.25","currency":"GBP"}],"convertedAmount":{"amount":"70.28328","currency":"GBP"},"estimatedExchangeRate":"0.00437606","networkFee":{"amount":"0.001","currency":"XMR"}},"payout":{"address":"47joJKcNWs66f6ein9qTTVFyzeGnmBEGWKomSuMmqwaBYGj7gv2RvFRRUy1xtzpn6qE8BBpDnuFbp44qe9X1XmK78vqXaij","extra_id":"1"},"redirect_url":"https://payments.guardarian.com/checkout?tid=4900188772"} -->
                <div class="estimate-wrapper" ?hidden=${Object.keys(this.estimateDetails).length == 0}>
                    <div class="estimate-row even-row">
                        <div class="estimate-label">You send</div>
                        <div class="estimate-value">
                            ${this.estimateDetails.initial_expected_from_amount} ${this.estimateDetails.initial_from_currency}
                        </div>
                    </div>
                    <div class="estimate-row odd-row">
                        <div class="estimate-label">Bank Fee</div>
                        <div class="estimate-value">${this.estimateDetails.bankFeeString}</div>
                    </div>
                    <div class="estimate-row even-row">
                        <div class="estimate-label">Service Fee</div>
                        <div class="estimate-value">${this.estimateDetails.serviceFeeString}</div>
                    </div>
                    <div class="estimate-row odd-row">
                        <div class="estimate-label">Network Fee</div>
                        <div class="estimate-value">${this.estimateDetails.networkFeeString}</div>
                    </div>
                    <div class="estimate-row even-row">
                        <div class="estimate-label">Estimated Rate</div>
                        <div class="estimate-value">${this.estimateDetails.estimatedExchangeRateString}</div>
                    </div>
                    <div class="estimate-row odd-row">
                        <div class="estimate-label">You receive </div>
                        <div class="estimate-value">~ ${this.estimateDetails.expected_to_amount} XMR</div>    
                    </div>
                    <div class="estimate-row even-row">
                        <div class="estimate-label"></div>
                        <div class="estimate-value">
                            <a @click=${this.redirectToURL} class="confirmation-button">Buy XMR</a>
                        </div>    
                    </div>
                    <div class="estimate-row odd-row">
                        <div class="estimate-label"></div>
                        <div class="estimate-value">* This is an expected rate. Guardarian will pick the best rate for you during the moment of exchange.</div>    
                    </div>
                </div>
            </div>
            <!-- <div id="getAddressValidationLoader"> -->
                
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
        <!-- <div id="addressValidationLoader" class="graphicAndLabel activityIndicators on-normal-background" style="font-family: Native-Light, input, menlo, monospace; -webkit-font-smoothing: subpixel-antialiased; font-size: 10px; letter-spacing: 0.5px; font-weight: 300; color: rgb(158, 156, 158); padding-left: 0px;">
            <div class="loader" id="addressValidationLoaderContainer">
                <div class="block block1"></div>
                <div class="block block2"></div>
                <div class="block block3"></div>
            </div>&nbsp;
            <span id="addressValidationLoaderText">Validating Address</span>
        </div> -->
            </div>
            <div id="validation-messages"></div>
            <div id="address-messages"></div>
            <div id="server-messages"></div>
        </div>
                
        </div>
        <!-- <div id="order-status">

        </div> -->
    </div>
    <!-- <div id="exchangePage">
         
                </div> -->
                </div></div></div>
            </div>
        </div>
        `;
    }

}

customElements.define('changenow-buy-with-fiat-view', ChangenowBuyWithFiatView);