import { html, css, LitElement } from 'lit';
import ExchangeNavigationController from "./ExchangeNavigationController";


export class SearchableSelect extends ExchangeNavigationController(LitElement) {
  static get styles() {
    return css`
    /* Dropdown Button */
    .dropbtn {
      background-color: #04AA6D;
      color: white;
      padding: 16px;
      font-size: 16px;
      border: none;
      cursor: pointer;
    }
    
    /* Dropdown button on hover & focus */
    .dropbtn:hover, .dropbtn:focus {
      background-color: #3e8e41;
    }
    
    /* The search field */
    #myInput {
      box-sizing: border-box;
      background-image: url('searchicon.png');
      background-position: 14px 12px;
      background-repeat: no-repeat;
      font-size: 16px;
      padding: 14px 20px 12px 45px;
      border: none;
      border-bottom: 1px solid #ddd;
    }
    
    /* The search field when it gets focus/clicked on */
    #myInput:focus {outline: 3px solid #ddd;}
    
    /* The container <div> - needed to position the dropdown content */
    .dropdown {
      position: relative;
      display: inline-block;
    }
    
    /* Dropdown Content (Hidden by Default) */
    .dropdown-content {
      //display: none;
      position: absolute;
      background-color: #f6f6f6;
      min-width: 230px;
      border: 1px solid #ddd;
      z-index: 1;
    }
    
    /* Links inside the dropdown */
    .dropdown-content a {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
    }
    
    /* Change color of dropdown links on hover */
    .dropdown-content a:hover {background-color: #f1f1f1}
    
    /* Show the dropdown menu (use JS to add this class to the .dropdown-content container when the user clicks on the dropdown button) */
    .show {display:block;}
    option {
        color: black;
    }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    console.log(this.destinationView);
    console.log("Page Template view connected to DOM");
    console.log(this);
    console.log(this.service);
    this.addEventListener('click', () => {
        console.log(this.service);
        if (this.service.navigationType == 'externalUrl') {
            this.openExternal(this.service.destination);
        } else if (this.service.navigationType == 'internalLink') {
            this.navigateToPage(this.service.destination)
        }
    });
    // add event listener

  }

  openExternal(url) {
    // Determine whether we're running as a browser (existence of window.location)
    if (typeof(window.location) !== 'undefined') {
      window.open(url, "_blank");
    } else if (typeof(global) !== "undefined") {
      
    }
  }

  toggleElement() {
    //document.getElementById("myDropdown").classList.toggle("show");
    console.log(this.showDropdown);
    this.showDropdown = !this.showDropdown;
    console.log(this.showDropdown);
  }

  filterSelect(input) {        
    console.log(this, this.values);
    // var input, filter, ul, li, a, i;
    // input = document.getElementById("myInput");
    // filter = input.value.toUpperCase();
    // div = document.getElementById("myDropdown");
    // a = div.getElementsByTagName("a");
    // for (i = 0; i < a.length; i++) {
    //     txtValue = a[i].textContent || a[i].innerText;
    //     if (txtValue.toUpperCase().indexOf(filter) > -1) {
    //         a[i].style.display = "";
    //     } else {
    //         a[i].style.display = "none";
    //     }
    // }
  }

    static get properties() {
        return {
            showDropdown: { type: Boolean },
            providerServices: { type: Array },
            service: { type: Object },
            searchString: { type: String },
            filteredValues: { type: Array },
            values: { type: Array }
        }
    }

//   clickHandler(event) {
//     console.log("Hi from clickhandler");  
//     console.log(event);
//     console.log(this);

//   }

    willUpdate(changedProperties) {
        // only need to check changed properties for an expensive computation.
        super.willUpdate(changedProperties);
        console.log("Will update");
        console.log(this);
        console.log(changedProperties);
    }

    attributeChangedCallback() {
        console.log("attributeChangedCallback");
        console.log(this);
    }

    hasChanged() {
        console.log("hasChanged")
        console.log(this)
    }

  connectedCallback() {
        super.connectedCallback();
        this.allValues = [];
        this.filteredValues = [];
        console.log(this);
        this.addEventListener("input", this.handleInputEvent);
  }

  handleInputEvent(event) {
      console.log(event);
      console.log(this, this.values);
      this.filterSelect(event.value);
  }

  constructor() {
    super();
    this.showDropdown = false;
    this.searchString = "";
    //this.values = [];
    // this.providerServices = [
    //     {
    //         service_provider: "changenow",
    //         title: "Exchange Monero for other cryptocurrencies (floating rate)",
    //         description: `
    //             Exchange your Monero for any of a number of cryptocurrencies using ChangeNow's floating rate exchange. 
    //             The floating rate allows you to exchange smaller amounts of Monero than fixed rates. 
    //             With this method of exchange, due to the volitility of cryptocurrency, you may receive an amount that is slightly different to what you expect.`,
    //         clickHandler: this.clickHandler
    //     },
    //     {
    //         service_provider: "changenow",
    //         title: "Exchange Monero for other cryptocurrencies (fixed rate)",
    //         description: `
    //             Use a fixed rate when you want to avoid the risk of a fluctuating exchange rate. 
    //             Due to the inherent risk, fixed rate exchanges have a higher minimum. 
    //             With this method of exchange, you are guaranteed to receive the amount you are quoted.`,
    //         clickHandler: this.clickHandler
    //     },
    //     {
    //         service_provider: "changenow",
    //         title: "Buy Monero using fiat currency",
    //         description: `
    //             No Monero? No problem! Seamlessly purchase Monero using your debit / credit card, and get your purchased Monero automatically paid into your wallet.`,
    //         clickHandler: this.clickHandler
    //     },
    //     {
    //         service_provider: "localmonero",
    //         title: "Buy Monero using LocalMonero",
    //         description: `
    //             LocalMonero is a marketplace that allows you to buy and sell Monero person-to-person. They act as an escrow service, ensuring that deals between buyers and sellers are concluded safely`,
    //         clickHandler: this.clickHandler
    //     }

    // ];
  }

  render() {
    return html` 
        <div class="dropdown">
            <button @click=${this.toggleElement} class="dropbtn">Dropdown</button>
            <div id="myDropdown" class="dropdown-content" ?hidden=${this.showDropdown}>
                <input type="text" placeholder="Search.." id="searchText" @input=${this.filterFunction} @value=${this.searchString}>
                <!-- <a href="#about">About</a>
                <a href="#base">Base</a>
                <a href="#blog">Blog</a>
                <a href="#contact">Contact</a>
                <a href="#custom">Custom</a>
                <a href="#support">Support</a>
                <a href="#tools">Tools</a> -->
                ${console.log(this.values, this)}
                ${ console.log("wtf")}
                ${this.values.map((object) => {
                    console.log(this);
                    console.log(object);
                    return html`<option>${object.name} - ${object.ticker}</option>`
                })}           
            </div>
        </div>`

    // return html`
    //     <div class="provider-card">
    //         <div class="hoverable-cell utility">
    //             <div class="changenow-logo provider-logo">

    //             </div>
    //         </div>    
    //         <div class="title-label">Exchange Monero for other cryptocurrencies (floating rate)</div>
    //         <div class="description-label">Exchange your Monero for any of a number of cryptocurrencies using ChangeNow's floating rate exchange. The floating rate allows you to exchange smaller amounts of Monero than fixed rates. With this method of exchange, due to the volitility of cryptocurrency, you may receive an amount that is slightly different to what you expect.</div>
    //     </div>
    //     <div class="provider-card">
    //         <div class="hoverable-cell utility">
    //             <div class="localmonero-logo provider-logo">

    //             </div>
    //         </div>    
    //         <div class="title-label">Buy Monero with LocalMonero</div>
    //         <div class="description-label">LocalMonero is a marketplace that allows a user to buy and sell their Monero to others.</div>
    //     </div>
    // `;
  }

}

/*

*/

customElements.define('searchable-select', SearchableSelect);


