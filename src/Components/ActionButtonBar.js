import {html, css, LitElement} from 'lit';
require('ActionButton');
export class ActionButton extends LitElement {
  static get styles() {
    return css`

    `;
  }

  render() {
    return html`
    <div style="position: fixed; top: calc(((100% - 32px) - 8px) - 32px); width: calc((100% - 95px) - 16px); height: 32px; z-index: 1000;"><action-button></action-button><a href="#" class="hoverable-cell disableable action" style="opacity: 1; display: inline-block; width: calc(50% - 4.5px); height: 32px; box-sizing: border-box; border-radius: 3px; color: rgb(22, 20, 22); background-color: rgb(0, 198, 255); box-shadow: rgba(255, 255, 255, 0.2) 0px 0.5px 0px 0px inset; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; -webkit-font-smoothing: subpixel-antialiased; font-size: 13px; letter-spacing: 0px; font-weight: 600; transform: none; line-height: 32px; text-decoration: none; text-align: center;">Create new wallet</a></div>
    `;
  }

}

customElements.define('action-button-bar', ActionButtonBar);
