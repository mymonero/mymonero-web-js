import { html, css, LitElement } from 'lit';
import ExchangeNavigationController from "./ExchangeNavigationController";


export class ActivityIndicator extends ExchangeNavigationController(LitElement) {
  static get styles() {
    return css`

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
      loadingText: { type: String },
      showLoader: { type: Boolean },
    }
  }

  constructor() {
    super();
    this.service = {};
    this.context = {};
    this.destinationView = "";
    this.showLoader = true;
  }

  render() {
    return html` 
      <div id="getOffer" ?hidden=${!this.showLoader} class="graphicAndLabel activityIndicators on-normal-background" style="font-family: Native-Light, input, menlo, monospace; -webkit-font-smoothing: subpixel-antialiased; font-size: 10px; letter-spacing: 0.5px; font-weight: 300; color: rgb(158, 156, 158); padding-left: 0px;">
        <div class="loader">
          <div class="block block1"></div>
          <div class="block block2"></div>
          <div class="block block3"></div>
        </div>&nbsp;
        <span id="activityLoaderText">${this.loadingText}</span>
    </div>`
  }

}

/*

*/

customElements.define('activity-indicator', ActivityIndicator);


