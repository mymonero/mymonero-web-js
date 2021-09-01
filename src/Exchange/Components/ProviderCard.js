import { html, css, LitElement } from 'lit';
import ExchangeNavigationController from "./ExchangeNavigationController";


export class ExchangeServiceProviderCard extends ExchangeNavigationController(LitElement) {
  static get styles() {
    return css`
        .provider-card {
            position: relative;
            left: 16px;
            top: 0px;
            width: calc(100% - 32px);
            min-height: 80px;
            height: auto;
            background: rgb(56, 54, 56);
            box-shadow: rgb(22 20 22) 0px 0.5px 1px 0px, rgb(73 71 73) 0px 0.5px 0px 0px inset;
            border-radius: 5px;
            overflow: hidden;
            margin: 0px 0px 12px;
        }

        .hoverable-cell {

        }
        .title-label {
            position: relative; box-sizing: border-box; padding: 8px 38px 4px 80px; display: block; word-break: break-word; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; -webkit-font-smoothing: subpixel-antialiased; font-size: 12px; font-weight: 400; letter-spacing: 0.5px; color: rgb(252, 251, 252); cursor: default;
            margin-left: 50px;
            text-align: left;
        }
        .description-label { 
            position: relative;
            box-sizing: border-box;
            padding: 0px 38px 10px 80px;
            font-size: 13px;
            font-family: Native-Light, input, menlo, monospace;
            font-weight: 100;
            -webkit-font-smoothing: subpixel-antialiased;
            min-height: 32px; color: rgb(158, 156, 158); word-break: normal; overflow: hidden; text-overflow: ellipsis; cursor: default;
            margin-left: 50px;
            text-align: left;
        }
        .provider-logo {
            height: 48px;
            min-width: 48px;
            display: block;
            position: absolute; 
            left: 6px; 
            top: 16px;
        }
        div.localmonero-logo {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='MuiSvgIcon-root' focusable='false' viewBox='0 0 546.45 546.45' aria-hidden='true' style='margin-left:0px;width:50px;height:50px;transition:margin 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms'%3E%3Cpath fill='%231565C0' d='M149.385 505.172c-5.5 0-12.25-3.897-15-8.66L10.874 282.584c-2.75-4.763-2.75-12.557 0-17.32L134.385 51.336c2.75-4.763 9.5-8.66 15-8.66h247.021c5.5 0 12.25 3.897 15 8.66l123.512 213.928c2.75 4.763 2.75 12.558 0 17.32L411.407 496.512c-2.75 4.763-9.5 8.66-15 8.66H149.385z'%3E%3C/path%3E%3Cpath fill='%230D47A1' d='M396.771 505.176h-67.624L184.898 360.925l-3.178-8.881 101.343 39.38 74.5-39.166 26-77.667-3.5-35.167-20.082-50.082 145.036 145.035-.896 1.55-62.737 108.664-29.779 51.58s-.695 1.373-2.146 2.94c-2.094 2.265-7.42 6.065-12.688 6.065z'%3E%3C/path%3E%3Cpath fill='%23E3F2FD' d='M272.896 398.424c-67.822 0-123-55.178-123-123s55.178-123 123-123 123 55.178 123 123-55.178 123-123 123zm0-224c-55.691 0-101 45.309-101 101s45.309 101 101 101 101-45.309 101-101-45.309-101-101-101z'%3E%3C/path%3E%3Cpath fill='%23E3F2FD' d='M181.729 335.927h49v-52l42.167 42.996 41.973-43.877v52.75l47.911.131 14.391-14.392v-5.274l-40.637.132v-86.1l-63.638 66.631-63.875-66.5v86.001l-32.792.002z'%3E%3C/path%3E%3C/svg%3E");
            left: 38px;
        }
        div.changenow-logo {
            background-image: url("/src/assets/img/ChangeNow120x69.jpg");
            top: 4px;
            width: 120px;
            height: 69px;
            margin-left: 
        }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    console.log(this.destinationView);
    console.log("Page Template view connected to DOM");
    console.log(this);
    console.log(this.service);
    console.log(this.context);
    // TODO -- refactor context passing to navigateToPage to an event listener
    this.addEventListener('click', () => {
        console.log(this.service);
        if (this.service.navigationType == 'externalUrl') {
            this.openExternal(this.service.destination);
        } else if (this.service.navigationType == 'internalLink') {
            this.navigateToPage(this.service.destination)
        }
    });
    // add event listener

  }

  openExternal(url) {
    // Determine whether we're running as a browser (existence of window.location)
    if (typeof(window.location) !== 'undefined') {
      window.open(url, "_blank");
    } else if (typeof(global) !== "undefined") {

    }
  }

  static get properties() {
    return {
      providerServices: { type: Array },
      context: { type: Object },
      service: { type: Object }
    }
  }

//   clickHandler(event) {
//     console.log("Hi from clickhandler");  
//     console.log(event);
//     console.log(this);

//   }

  constructor() {
    super();
    this.service = {};
    this.context = {};
    this.destinationView = "";
    // this.providerServices = [
    //     {
    //         service_provider: "changenow",
    //         title: "Exchange Monero for other cryptocurrencies (floating rate)",
    //         description: `
    //             Exchange your Monero for any of a number of cryptocurrencies using ChangeNow's floating rate exchange. 
    //             The floating rate allows you to exchange smaller amounts of Monero than fixed rates. 
    //             With this method of exchange, due to the volitility of cryptocurrency, you may receive an amount that is slightly different to what you expect.`,
    //         clickHandler: this.clickHandler
    //     },
    //     {
    //         service_provider: "changenow",
    //         title: "Exchange Monero for other cryptocurrencies (fixed rate)",
    //         description: `
    //             Use a fixed rate when you want to avoid the risk of a fluctuating exchange rate. 
    //             Due to the inherent risk, fixed rate exchanges have a higher minimum. 
    //             With this method of exchange, you are guaranteed to receive the amount you are quoted.`,
    //         clickHandler: this.clickHandler
    //     },
    //     {
    //         service_provider: "changenow",
    //         title: "Buy Monero using fiat currency",
    //         description: `
    //             No Monero? No problem! Seamlessly purchase Monero using your debit / credit card, and get your purchased Monero automatically paid into your wallet.`,
    //         clickHandler: this.clickHandler
    //     },
    //     {
    //         service_provider: "localmonero",
    //         title: "Buy Monero using LocalMonero",
    //         description: `
    //             LocalMonero is a marketplace that allows you to buy and sell Monero person-to-person. They act as an escrow service, ensuring that deals between buyers and sellers are concluded safely`,
    //         clickHandler: this.clickHandler
    //     }

    // ];
  }

  render() {
    return html` 
        <div class="provider-card" data-test="lol">
             <div class="hoverable-cell utility">
                 <div class="${this.service.service_provider}-logo provider-logo">

                 </div>
             </div>    
             <div class="title-label">${this.service.title}</div>
             <div class="description-label">${this.service.description}</div>
         </div>`

    // return html`
    //     <div class="provider-card">
    //         <div class="hoverable-cell utility">
    //             <div class="changenow-logo provider-logo">

    //             </div>
    //         </div>    
    //         <div class="title-label">Exchange Monero for other cryptocurrencies (floating rate)</div>
    //         <div class="description-label">Exchange your Monero for any of a number of cryptocurrencies using ChangeNow's floating rate exchange. The floating rate allows you to exchange smaller amounts of Monero than fixed rates. With this method of exchange, due to the volitility of cryptocurrency, you may receive an amount that is slightly different to what you expect.</div>
    //     </div>
    //     <div class="provider-card">
    //         <div class="hoverable-cell utility">
    //             <div class="localmonero-logo provider-logo">

    //             </div>
    //         </div>    
    //         <div class="title-label">Buy Monero with LocalMonero</div>
    //         <div class="description-label">LocalMonero is a marketplace that allows a user to buy and sell their Monero to others.</div>
    //     </div>
    // `;
  }

}

/*

*/

customElements.define('provider-card', ExchangeServiceProviderCard);


