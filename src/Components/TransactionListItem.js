import {html, css, LitElement} from 'lit';

export class TransactionListItem extends LitElement {
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

      .amount {
        vertical-align: top; 
        text-align: left; 
        font-size: 12px; 
        font-weight: 400; 
        letter-spacing: 0.5px; 
        float: left; 
        height: 34px; 
        box-sizing: border-box; 
        padding: 21px 0px 0px 16px; 
        font-family: Native-Regular, input, menlo, monospace; 
      }
    `;
  }

  constructor() {
    super();
    this.amount = '0.00';
    this.date = 'JAN 01, 1977';
    this.paymentid = '';
    this.status = 'UNKNOWN';
  }

  render() {
    return html`
    <div class="utility hoverable-cell" style="position: relative; left: 0px; top: 0px; width: 100%; height: 74px;">
        <img src="./src/assets/img/list_rightside_chevron@3x.png" style="position: absolute; pointer-events: none; width: 7px; height: 12px; right: 16px; top: calc(50% - 6px);">
        <div style="width: 100%; height: 38px;">
            <div class="amount" style="${(this.amount < 0) ? 'color: #F97777' : 'color: #FCFBFC;'}">${this.amount}</div>
            <div style="vertical-align: top; float: right; font-size: 12px; letter-spacing: 0.5px; font-weight: 100; height: 34px; box-sizing: border-box; padding: 21px 41px 0px 0px; font-family: Native-Light, input, menlo, monospace; color: rgb(252, 251, 252);">${this.date}</div>
        </div>
        <div style="width: 100%; height: 34px;">
            <div style="vertical-align: top; float: left; width: auto; max-width: 189px; box-sizing: border-box; padding: 1px 0px 0px 16px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-family: Native-Light, input, menlo, monospace; font-size: 13px; color: rgb(158, 156, 158); font-weight: 100;">${this.paymentid}</div>
            <div style="float: right; display: inline-block; text-align: right; vertical-align: top; font-family: Native-Regular, input, menlo, monospace; font-weight: 500; font-size: 10px; letter-spacing: 0.5px; box-sizing: border-box; padding: 3px 41px 0px 0px; color: rgb(107, 105, 107);">${this.status}</div>
        </div>
    </div>
    `;
  }

}



customElements.define('transaction-list-item', TransactionListItem);


