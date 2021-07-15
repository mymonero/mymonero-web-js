import {html, css, LitElement} from 'lit';

export class FundRequestView extends LitElement {
  static get styles() {
    return css`

    .message-label {
      margin: 0 0 0 0;
      width: 100%;
      height: auto;
      line-height: 19px;
      color: #9e9c9e;
      text-align: center;
    }  
    
    .emptyScreens {
      position: relative;
      display: table;
      border: 1px solid #373537;
      border-radius: 5px;
    }


    `;
  }
  static get properties() {
    return {
      context: Object      
    }
  }

  connectedCallback() {
    super.connectedCallback();
    console.log("Page Template view connected to DOM");
    console.log(this);
    console.log(this.context);
  }

  constructor() {
    super();
  }

  render() {
    return html`
        <div style="overflow: hidden; position: absolute; top: 0px; left: 79px; width: calc(100% - 79px); height: 100%; background: rgb(39, 37, 39);"><div style="position: relative; left: 0px; top: 0px; width: 100%; height: 100%; overflow: hidden;"><div class="NavigationBarView" style="position: absolute; top: 0%; z-index: 9; width: 100%; height: 41px; background-color: rgb(39, 37, 39); -webkit-app-region: drag; user-select: none; box-shadow: none;"><div style="position: absolute; width: 100%; height: 41px; background-color: rgb(39, 37, 39);"></div><span class="title-label" style="color: rgb(252, 251, 252); position: absolute; top: -1px; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.5px; box-sizing: border-box; left: calc(15% + 16px); width: calc((70% - 32px) - 0px); padding-left: 0px; height: 41px; text-align: center; line-height: 41px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Receive Monero</span><div style="position: absolute; left: 16px; width: 15%; min-width: 41px; height: 41px;"></div><div style="position: absolute; right: 16px; width: 15%; min-width: 41px; height: 41px;"></div></div><div style="z-index: 1; position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; overflow: hidden;"><div style="width: 100%; height: 100%;"><div style="margin-top: 56px; margin-left: 16px; width: calc(100% - 32px); height: calc(100% - 71px);"><div class="emptyScreens" style="width: calc((100% - 0px) - 2px); height: calc((100% - 0px) - 2px); margin: 0px;"><div class="content-container" style="display: table-cell; vertical-align: middle; transform: translateY(-16px);"><div class="emoji-label"><div href="#" class="pointing-down">&nbsp;</div></div><div class="message-label" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; letter-spacing: 0px; font-size: 13px; -webkit-font-smoothing: subpixel-antialiased; font-weight: 300;">To make Monero Requests,<br><a href="https://mymonero.com" target="_blank" style="color: #11bbec; cursor: pointer; -webkit-user-select: none; text-decoration: none;">download the app</a>.</div></div></div></div></div></div></div></div>
    `;
  }

}

customElements.define('fund-request', FundRequestView);


