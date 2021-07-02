import {html, css, LitElement} from 'lit';

export class WalletDetailView extends LitElement {
  static get styles() {
    return css`
      .detail-label { margin-top: 15px; margin-bottom: 0px; padding-top: 0px; padding-bottom: 0px; display: block; color: rgb(158, 156, 158); font-weight: 500;     
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        display: block;
        margin: 15px 0 8px 8px;
        text-align: left;
        color: #F8F7F8;
        font-family: Native-Light, input, menlo, monospace;
        -webkit-font-smoothing: subpixel-antialiased;
        font-size: 10px;
        letter-spacing: 0.5px; 
      }
      .message-label { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; letter-spacing: 0px; font-size: 13px; -webkit-font-smoothing: subpixel-antialiased; font-weight: 300; }
      .label { float: left; text-align: left; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; -webkit-font-smoothing: subpixel-antialiased; font-size: 11px; font-weight: 400; letter-spacing: 0.5px; color: rgb(223, 222, 223); }
      .field_value { float: right; text-align: right; font-size: 13px; font-weight: 100; font-family: Native-Light, input, menlo, monospace; margin-top: -1px; max-width: 75%; }
      .copy-trigger { float: right; margin-top: 1px; font-size: 11px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; font-weight: 500; -webkit-font-smoothing: subpixel-antialiased; text-decoration: none; opacity: 0.2; cursor: default; }
      .disabled { color: rgb(204, 204, 204); }
      .enabled { margin-top: 1px; font-size: 11px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; font-weight: 500; -webkit-font-smoothing: subpixel-antialiased; text-decoration: none; opacity: 1; cursor: pointer; color: rgb(0, 198, 255); }
    `;
  }

  static get properties() {
    return {
      context: Object,
      transaction: Object,
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

  // Because we're not using lit decorators, we have to initialise each object property in the constructor
  constructor() {
    super();
    this.hideText = this.hideText;
    this.context = {};
    // this.ring_size = "Not specified";
    // this.date = "Not specified";
    // this.total = "Not specified";
    // this.to = "Not specified";
    // this.payment_id = "Not specified";
    // this.transaction_id = "Not specified";
    // this.secret_key = "Not specified";
    this.transaction = {}
  }

  render() {
    return html`
    <span class="field_title field-title-label detail-label" style="">DETAILS</span>
    <div style="margin: 8px 0px; box-sizing: border-box; padding: 0px 16px 4px; border: 0.5px solid rgb(73, 71, 73); border-radius: 5px;">
      <div class="table_field" style="padding: 17px 0px;">
        <span class="label">Date</span>
        <span class="field_value" style="">${this.transaction.timestamp}</span>
        <br clear="both">
      </div>
      <div class="table_field" style="padding: 17px 0px;">
        <span class="label">Total</span>
        <span class="field_value" style="font-size: 13px; color: rgb(252, 251, 252); font-weight: 100; font-family: Native-Light, input, menlo, monospace; margin-top: -1px; max-width: 75%;">${this.transaction.approx_float_amount}</span>
        <br clear="both">
      </div>
      <div class="table_field" style="padding: 15px 0px 19px;">
        <span class="label">To</span>
        <a href="#" class="copy-trigger${ (typeof(this.transaction.to) !== "undefined") ? "enabled" : " disabled" }" data-clipboard-text="">COPY</a>
        <br clear="both">
        <span class="field_value" style="float: left; text-align: left; font-size: 13px; color: rgb(158, 156, 158); font-weight: 100; font-family: Native-Light, input, menlo, monospace; user-select: all; margin-top: 9px; max-width: 270px;">Unknown</span>
        <br clear="both">
      </div>
      <div class="table_field" style="padding: 15px 0px 19px;">
        <span class="label">Payment ID</span>
        <a href="#" @click=${this.copyToClipboard} 
          class="copy-trigger ${ (typeof(this.transaction.payment_id) !== "undefined") ? "enabled" : " disabled" }"
          data-clipboard-text="${ (typeof(this.transaction.payment_id) !== "undefined") ? this.transaction.payment_id : "None" }">
          COPY
        </a>
        <br clear="both">
        <span class="field_value" style="float: left; text-align: left; font-size: 13px; color: rgb(158, 156, 158); font-weight: 100; font-family: Native-Light, input, menlo, monospace; user-select: all; margin-top: 9px; max-width: 270px;">${(typeof(this.transaction.payment_id) !== "undefined") ? this.transaction.payment_id : "None"}</span>
        <br clear="both">
      </div>
      <div class="table_field" style="padding: 15px 0px 19px;">
        <span class="label">Transaction ID</span>
        <a href="#" @click=${this.copyToClipboard} 
          class="copy-trigger ${ (typeof(this.transaction.hash) !== "undefined") ? "enabled" : " disabled" }"
          data-clipboard-text="${ (typeof(this.transaction.hash) !== "undefined") ? this.transaction.hash : "None" }"
          style="">COPY</a>
        <br clear="both">
        <span class="field_value" style="float: left; text-align: left; font-size: 13px; color: rgb(158, 156, 158); font-weight: 100; font-family: Native-Light, input, menlo, monospace; user-select: all; margin-top: 9px; max-width: 270px;">${this.transaction.hash}</span>
        <br clear="both">
      </div>
      <div class="table_field" style="padding: 15px 0px 19px; display: none;">
      <span class="label">Secret Key</span>
      <a href="" class="copy-trigger" data-clipboard-text="" style="margin-top: 1px; float: right; text-align: right; font-size: 11px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; font-weight: 500; -webkit-font-smoothing: subpixel-antialiased; text-decoration: none; opacity: 0.2; cursor: default; color: rgb(204, 204, 204);">COPY</a>
      <br clear="both">
      <span class="field_value" style="float: left; text-align: left; font-size: 13px; color: rgb(158, 156, 158); font-weight: 100; font-family: Native-Light, input, menlo, monospace; user-select: all; margin-top: 9px; max-width: 270px;">${this.secret_key}</span>
      <br clear="both">
      </div>
      <div class="table_field" style="padding: 17px 0px;">
      <span class="label">Ring size</span>
      <span class="field_value">${parseInt(this.transaction.mixin) + 1}</span>
      <br clear="both">
      </div>
    </div>
    `;
  }

  copyToClipboard(event) {
    event.preventDefault();
    try {
      navigator.clipboard.writeText(event.srcElement.dataset.clipboardText);
      console.log('Copied to clipboard');
    } catch(e) {
      log(e);
    }
  }

  logContext(event) {
    console.log(event);
    console.log(this);
    console.log(this.context);
    console.log(this.transaction);
  }
}

customElements.define('wallet-detail-view', WalletDetailView);
