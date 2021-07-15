import {html, css, LitElement} from 'lit';
//import { NavigationController } from '../Navigation/NavigationController';


export class MainMenuButtonView extends LitElement {
  static get styles() {
    return css`
      .tabButton-layer {
        width: 79px; height: 56px;
      }
    `;
  }

  static get properties() {
    return {
      context: Object,
      icon: String,
      iconEnabled: String,
      destinationView: String,
      isEnabled: Boolean
    }
  }

  connectedCallback() {
    console.log("Main Menu button connected to DOM");
    console.log(this);
  }

  constructor() {
    super();
    this.context = {};
    this.icon = "";
    this.iconEnabled = "";
    this.destinationView = "";
    this.isEnabled = false;
  }

  render() {
    return html`
        <a class="tabButton-layer" style="">
            <div class="tabButton-wallets-selected" id="tabButton-wallets" style="-webkit-app-region: no-drag; width: 100%; height: 100%; border: none; opacity: 1;">
            
            </div>
        </a>
    `;
  }

}



customElements.define('main-menu-button', MainMenuButtonView);


