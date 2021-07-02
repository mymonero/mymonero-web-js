import {html, css, LitElement} from 'lit';

export class LandingPageGreeting extends LitElement {
  static get styles() {
    return css`
      .message-label { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; letter-spacing: 0px; font-size: 13px; -webkit-font-smoothing: subpixel-antialiased; font-weight: 300; }
    `;
  }

  static get properties() {
    return {
      name: {type: String}
    }
  }

  constructor() {
    super();
    this.name = 'Somebody';
    this.hideText = this.hideText;
  }

  render() {
    return html`
    <div class="smiley"></div>
    <div class="message-label" style="">Welcome to MyMonero!<br>Let's get started.</div>
    <p @click=${this.hideText}>By the way, this is a lit element without bullshit in-line styles</p>
    <p>${this.name}</p>`;
  }

  hideText(event) {
    console.log("hideText");
    console.log("Haaaai");
    this.name = "oh hi"
  }
}

customElements.define('landing-page-greeting', LandingPageGreeting);
