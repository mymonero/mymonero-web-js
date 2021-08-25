import { html, css, LitElement } from 'lit';
import ExchangeNavigationController from "./ExchangeNavigationController";
//require("./ProviderCard");

export class ChangenowFixedRateView extends ExchangeNavigationController(LitElement) {

    connectedCallback() {
        super.connectedCallback();
        console.log("Page Template view connected to DOM");
        console.log(this);
    }
    
    constructor() {
        super();
        this.clickHandler = this.clickHandler;
    }
    
    clickHandler(event) {
        console.log(event);
    }
    
    render() {
        return html`
        <div id="exchange-landing-page">
            <div>Landing page</div>
                Fixed Rate  
            </div>
        </div>
        `;
    }

}

customElements.define('changenow-fixed-rate-view', ChangenowFixedRateView);