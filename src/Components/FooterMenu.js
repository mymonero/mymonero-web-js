import {html, css, LitElement} from 'lit';

export class FooterMenu extends LitElement {
  static get styles() {
    return css`
        td {
            max-width: 80px;
        }
        td a, td a span {
            color: rgbrgb(140, 136, 140);
            text-decoration: none;
        }

    .footer-link {
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        font-size: 12px;
        font-weight: 500;
        -webkit-font-smoothing: subpixel-antialiased;
        margin: 0;
        width: auto;
        max-width: 82px;
        line-height: 28px;
        height: 32px;
        display: inline-block;
        padding: 0;
        letter-spacing: 0.5px;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }


    `;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback()
    console.log("Footer Menu addeda");
  }

  render() {
    return html`
        <div style="height: 32px; background-color: rgb(23, 20, 22);">
            <table style="border: none; padding: 0px; margin: 0px; width: 100%; max-width: 400px;">
                <tr>
                    <td width="25%" align="center" style="max-width: 80px;">
                        <a href='https://www.mymonero.com/' class="footer-link" target="_blank" style="color: rgb(250, 246, 250);">
                            <span>Home</span>    
                        </a>
                    </td>
                    <td width="25%" align="center" style="max-width: 80px;">
                        <a href='https://www.mymonero.com/privacy' class="footer-link" target="_blank" style="color: rgb(140, 136, 140);">
                            <span>Privacy</span>
                        </a>
                    </td>
                    <td width="25%" align="center" style="max-width: 80px;">
                        <a href='https://www.mymonero.com/terms' class="footer-link" target="_blank" style="color: rgb(140, 136, 140);">
                            <span>Terms</span>
                        </a>
                    </td>
                    <td width="25%" align="center" style="max-width: 80px;">
                        <a href='https://mymonero.com/?open_support=1' class="footer-link" target="_blank" style="color: rgb(17, 187, 236);">
                            <span>Support</span>
                        </a>
                    </td>
                </tr>
            </table>
        </div>
    `;
  }
}

customElements.define('footer-menu', FooterMenu);