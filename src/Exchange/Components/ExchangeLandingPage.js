import { html, css, LitElement } from 'lit';
import ExchangeNavigationController from "./ExchangeNavigationController";
import ChangenowAPI from "@mymonero/changenow-exchange-integration"

console.log(ChangenowAPI);
require("./ProviderCard");
require("./ChangenowBuyWithFiatView");
require("./ChangenowFixedRateView")
require("./ChangenowFloatingRateView");


export class ExchangeLandingPage extends ExchangeNavigationController(LitElement) {

    connectedCallback() {
        super.connectedCallback();
        console.log("ELP Template view connected to DOM");
        console.log(this);
        console.log(this.context);
        // TODO: disable fiat options if fiat api status returns an error
    }
    
    constructor() {
        super();
        this.clickHandler = this.clickHandler;
        this.context = {};
        this.providerServices = [
            // {
            //     service_provider: "changenow",
            //     title: "Exchange Monero for other cryptocurrencies (floating rate)",
            //     description: `
            //         Exchange your Monero for any of a number of cryptocurrencies using ChangeNow's floating rate exchange. 
            //         The floating rate allows you to exchange smaller amounts of Monero than fixed rates. 
            //         With this method of exchange, due to the volitility of cryptocurrency, you may receive an amount that is slightly different to what you expect.`,
            //     navigationType: "internalLink",
            //     destination: "changenowFloatingRateView"
            // },
            {
                service_provider: "changenow",
                title: "Exchange Monero for other cryptocurrencies (fixed rate)",
                description: `
                    Use a fixed rate when you want to avoid the risk of a fluctuating exchange rate. 
                    Due to the inherent risk, fixed rate exchanges have a higher minimum. 
                    With this method of exchange, you are guaranteed to receive the amount you are quoted.`,
                navigationType: "internalLink",
                destination: "changenowFixedRateView"
            },
            { 
                service_provider: "changenow",
                title: "Buy Monero using fiat currency",
                description: `
                    No Monero? No problem! Seamlessly purchase Monero using your debit / credit card, and get your purchased Monero automatically paid into your wallet.`,
                navigationType: "internalLink",
                destination: "changenowBuyWithFiatView"
            },
            {
                service_provider: "localmonero",
                title: "Buy Monero using LocalMonero",
                description: `
                    LocalMonero is a marketplace that allows you to buy and sell Monero person-to-person. They act as an escrow service, ensuring that deals between buyers and sellers are concluded safely`,
                
                navigationType: "externalUrl",
                destination: "https://localmonero.co?rc=h2t1",
            }
    
        ];
    }
    
    static get properties() {
        return {
          context: Object,
        }
      }

    clickHandler(event) {
        console.log(event);
    }
    
    render() {
        return html`
        <div id="exchange-landing-page">
            <div></div>
            ${this.providerServices.map((service) => {
                return html`<provider-card .service=${service} .context=${this.context} @click=${this.clickHandler}></provider-card>`
            })}            
            </div>
        </div>
        `;
    }

}

customElements.define('exchange-landing-page', ExchangeLandingPage);