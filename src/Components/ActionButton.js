import {html, css, LitElement} from 'lit';

export class ActionButton extends LitElement {
  static get styles() {
    return css`

        .hoverable-cell {
            transition: background-color 0.1s ease-out;
        }
        
        .hoverable-cell.utility:not(.disabled):not(.active):not([disabled]):hover {
            background-color: #3f3e3f !important;
        }
        
        .hoverable-cell.action:not(.disabled):not(.active):not([disabled]):hover {
            background-color: #33d1ff !important;
        }
        
        .hoverable-cell.destructive:not(.disabled):not(.active):not([disabled]):hover {
            background-color: #f77e7e !important;
        }
        
        .hoverable-cell.disableable[disabled="disabled"],
        .hoverable-cell.disableable.disabled {
            opacity: 0.5;
        }

        .button {
            opacity: 1; 
            display: inline-block; 
            width: calc(50% - 4.5px); 
            height: 32px; 
            box-sizing: border-box; 
            border-radius: 3px; 
            color: rgb(252, 251, 252); 
            background-color: rgb(56, 54, 56); 
            box-shadow: rgb(22, 20, 22) 0px 0.5px 1px 0px, rgb(73, 71, 73) 0px 0.5px 0px 0px inset; 
            font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif;
            -webkit-font-smoothing: subpixel-antialiased; 
            font-size: 12px; 
            letter-spacing: 0.5px; 
            font-weight: 400; 
            line-height: 34px; 
            text-decoration: none; 
            text-align: center; 
            margin-right: 9px;
        }
    `;
  }

  render() {
    return html`
    <a href="#" class="hoverable-cell disableable utility button">Use existing wallet</a>
    `;
  }

}



customElements.define('action-button', ActionButton);


