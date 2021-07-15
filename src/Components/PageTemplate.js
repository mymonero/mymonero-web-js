import {html, css, LitElement} from 'lit';

export class PageTemplateView extends LitElement {
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

  connectedCallback() {
    super.connectedCallback();
    console.log("Page Template view connected to DOM");
    console.log(this);
  }

  constructor() {
    super();
  }

  render() {
    return html`
        <span>Page HTML goes here</span>
    `;
  }

}

/*

*/

customElements.define('page-template', PageTemplateView);


