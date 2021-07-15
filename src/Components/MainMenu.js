import {html, css, LitElement} from 'lit';
import LandingPageGreeting from './LandingPageGreeting';
//import MainMenuButtonView from "./MainMenuButton";
import NavigationController from "./NavigationController";


// NavigationController is purely a mixin to add navigation control
export class MainMenuView extends NavigationController(LitElement) {
  static get styles() {
    return css`

    .tabButton-wallets-selected {
        background-image: url("./dist/assets/img/icon_tabBar_wallets__active@3x.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: 24px 24px;
    }

    .tabButton-layer {
        display: inline-block;
        position: relative;
        --webkit-app-region: no-drag;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
      }
      
      .tabButton-send-location {
        position: absolute;
        left: 0;
        bottom: 5px;
      }
      .tabButton-settings {
        background-image: url('/dist/assets/img/icon_tabBar_settings@3x.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: 16px 16px;
      }
      
      .tabButton-settings-selected {
        background-image: url('/dist/assets/img/icon_tabBar_settings__active@3x.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: 16px 16px;
      }
      
      .tabButton-send {
        background-image: url('/dist/assets/img/icon_tabBar_sendFunds@3x.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: 24px 25px;
      }
      
      .tabButton-send-selected {
        background-image: url('/dist/assets/img/icon_tabBar_sendFunds__active@3x.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: 24px 25px;
      }
      
      .tabButton-fundRequest {
        background-image: url('/dist/assets/img/icon_tabBar_fundsRequests@3x.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: 24px 24px;
      }
      
      .tabButton-fundRequest-selected {
        background-image: url('/dist/assets/img/icon_tabBar_fundsRequests__active@3x.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: 24px 24px;
      }
      
      .tabButton-exchange {
        background-image: url('/dist/assets/img/XMRtoBTCInactive.svg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: 39px;
      }
      
      .tabButton-exchange-selected {
        background-image: url('/dist/assets/img/XMRtoBTCActive.svg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: 39px;
      }
      
      .tabButton-contacts {
        background-image: url('/dist/assets/img/icon_tabBar_contacts@3x.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: 24px 23px;
      }
      
      .tabButton-contacts-selected {
        background-image: url('/dist/assets/img/icon_tabBar_contacts__active@3x.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: 24px 23px;
      }
      
      .tabButton-wallets {
        background-image: url('/dist/assets/img/icon_tabBar_wallets@3x.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: 24px 24px;
      }
      
      .tabButton-wallets-selected {
        background-image: url('/dist/assets/img/icon_tabBar_wallets__active@3x.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: 24px 24px;
      }

    `;
  }

  static get properties() {
    return {
      context: Object,
      //transaction: Object,
      // commented out because I ended up using the transaction object instead
      // date: { type: Date },
      // total: { type: String },
      // to: { type: String },
      // payment_id: { type: String },
      // transaction_id: { type: String },
      // secret_key: { type: String },
      // ring_size: { type: String }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    super.initialiseContent();
    console.log("Main Menu connected to DOM");
    console.log(this);
    // let contentView = document.querySelector('content-view');
    // console.log(contentView);
    // let landingPage = document.createElement('landing-page-greeting');
    // contentView.appendChild(landingPage);
  }

  constructor() {
    super();
    //this.context = {};
  }

  printContext() {
      console.log(this);
      console.log(this.context);
  }

  render() {
    return html`
    <a class="tabButton-layer" style="width: 79px; height: 56px;">
            <div class="tabButton-wallets-selected" id="tabButton-wallets" style="-webkit-app-region: no-drag; width: 100%; height: 100%; border: none; opacity: 1;">
                <span @click=${this.printContext}></span>
            </div>
        </a>
        
        <a class="tabButton-layer" style="width: 79px; height: 56px;">
        <div @click=${this.navigateToPage} data-page-destination="fundRequest" class="tabButton-fundRequest" id="tabButton-fundRequest" style="-webkit-app-region: no-drag; width: 100%; height: 100%; border: none; opacity: 0.3;">
        </div>
        </a>
        <a class="tabButton-layer" style="width: 79px; height: 56px;">
        <div @click=${this.navigateToPage} data-page-destination="contacts" class="tabButton-contacts" id="tabButton-contacts" style="-webkit-app-region: no-drag; width: 100%; height: 100%; border: none; opacity: 0.3;">
        </div>
        </a>
        <a class="tabButton-layer" style="width: 79px; height: 56px;">
        <div class="tabButton-exchange" id="tabButton-exchange" style="-webkit-app-region: no-drag; width: 100%; height: 100%; border: none; opacity: 0.3;">
        </div>
        </a>
        <a class="tabButton-layer tabButton-send-location" style="width: 79px; height: 56px;">
            <div class="tabButton-settings" id="tabButton-settings" style="-webkit-app-region: no-drag; width: 100%; height: 100%; border: none; opacity: 1;">
            </div>
    </a>
    `;
  }

}

/*

*/

customElements.define('main-menu', MainMenuView);


