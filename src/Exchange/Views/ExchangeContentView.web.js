// "use strict"

const Utils = require('../Javascript/ExchangeUtilityFunctions')
const ExchangeLibrary = require('mymonero-exchange')
const ExchangeFunctions = new ExchangeLibrary()
const ExchangeUtils = require('../Javascript/ExchangeUtilityFunctions')
const ValidationLibrary = require('wallet-address-validator')
const View = require('../../Views/View.web')
const commonComponents_navigationBarButtons = require('../../MMAppUICommonComponents/navigationBarButtons.web')
const JSBigInt = require('@mymonero/mymonero-bigint').BigInteger // important: grab defined export
const monero_amount_format_utils = require('@mymonero/mymonero-money-format')
const ExchangeHelper = require("@mymonero/mymonero-exchange-helper")
let exchangeHelper = new ExchangeHelper();

//let handleOfferError = exchangeHelper.ErrorHelper.handleOfferError;

let handleOfferError = exchangeHelper.errorHelper.handleOfferError;

function newEstimatedNetworkFeeString(fee_JSBigInt) {
  const self = this
  const estimatedTotalFee_JSBigInt = fee_JSBigInt;
  const estimatedTotalFee_str = monero_amount_format_utils.formatMoney(estimatedTotalFee_JSBigInt)
  const estimatedTotalFee_moneroAmountDouble = parseFloat(estimatedTotalFee_str)

  // const estimatedTotalFee_moneroAmountDouble = 0.028
  // Just hard-coding this to a reasonable estimate for now as the fee estimator algo uses the median blocksize which results in an estimate about twice what it should be
  //const displayCcySymbol = self.context.settingsController.displayCcySymbol
  //const finalizable_ccySymbol = displayCcySymbol
  const finalizable_formattedAmountString = estimatedTotalFee_str// `${estimatedTotalFee_moneroAmountDouble}`
  const final_formattedAmountString = finalizable_formattedAmountString
  const final_ccySymbol = 'XMR'
  const displayString = `${final_formattedAmountString}`
  //
  return displayString
}

// function initialiseFunction() {
//   console.log("initialiseFunction invoked");
//   // This isn't great for migrating to an external library, but presently, we bind `this` when we invoke this function in ECV.web.js
//   console.log(this);
//   const order = {}
//   let orderStarted = false
//   let orderCreated = false
//   // let backBtn = document.getElementsByClassName('nav-button-left-container')[0];
//   // backBtn.style.display = "none";
//   let exchangePage = document.getElementById('orderStatusPage')
//   let outAddressInput = document.getElementById('outAddress')
//   let walletSelector = document.getElementById('wallet-selector')
//   let walletOptions = document.getElementById('wallet-options')
//   let exchangePageDiv = document.getElementById('exchangePage')
//   let orderStatusPage = document.getElementById('orderStatusPage')
//   let addressValidation = document.getElementById('address-messages')
//   let serverValidation = document.getElementById('server-messages')
//   let explanatoryMessage = document.getElementById('explanatory-message')
//   let selectedWallet = document.getElementById('selected-wallet')
//   let serverRatesValidation = document.getElementById('server-rates-messages')
//   let inCurrencyValue = document.getElementById('inCurrencyValue')
//   let outCurrencyValue = document.getElementById('outCurrencyValue')
//   let validationMessages = document.getElementById('validation-messages')
//   let orderBtn = document.getElementById('order-button')
//   let orderStatusDiv = document.getElementById('exchangePage')
//   let orderTimer = {}
//   let currencyInputTimer
  
//   function validateBTCAddress (address, ValidationLibrary) {
//     // Replace this with our ChangeNow library's integration at some stage
//     try {
//       if (ValidationLibrary.validate(address) == false) {
//         console.log(ValidationLibrary.validate(address))
//         return false
//       }
//     } catch (Error) {
//       console.log(Error)
//     }
//     console.log(ValidationLibrary.validate(address))
//     return true
//   }

//   const outAddressInputListener = function () {
//     const outAddressInput = document.getElementById('outAddress')
//     addressValidation.innerHTML = ''

//     console.log("We could leave address validation to the exchange server instead of validating three different address types")
//     // if (validateBTCAddress(btcAddressInput.value, ValidationLibrary) == false) {
//     //   const error = document.createElement('div')
//     //   error.classList.add('message-label')
//     //   error.id = 'btc-invalid'
//     //   error.innerHTML = 'Your BTC address is not valid.'
//     //   addressValidation.appendChild(error)
//     // }
//   }

//   // const inCurrencyValueKeydownListener = function (event) {
//   //   if (event.which == 8 || event.which == 110 || event.which == 46 || event.which == 190) { return }

//   //   if ((event.which >= 48 && event.which <= 57) || (event.which >= 96 && event.which <= 105)) {
//   //     return
//   //   }

//   //   if (!checkDecimals(inCurrencyValue.value, 12)) {
//   //     event.preventDefault()
//   //     return
//   //   }

//   //   event.preventDefault()
//   // }

//   const inCurrencyValueKeydownListener = function (event) {
//     let inCurrencyValue = document.getElementById('outCurrencyValue');

//     // Test whether the key is allowed or not, and abort execution if not allowed
    
//     let allowableKeyArray = [37, 39, 46, 8]; // arrow keys, delete, backspace
//     if (exchangeHelper.isValidKey(event, allowableKeyArray)) {
//       // These are valid keypresses, but we don't need to request an offer from the API
//       return
//     }

//     let currencyTickerCode = document.getElementById("outCurrencySelectList").value;
//     // arrow keys, delete, backspace
//     // if (event.which == 37 || event.which == 39 || event.which == 46 || event.which == 8) {
//     //   return
//     // }
    
//     // We need to limit the number of decimals based on the selected currency
//     // checkDecimals returns false if we exceed the second parameter in decimal places
//     if (!checkDecimals(inCurrencyValue.value, exchangeHelper.currencyMetadata[currencyTickerCode].precision)) {
//       console.log("Decimal limit reached");
//       event.preventDefault()
//       return
//     }

//     allowableKeyArray = [110, 46, 190] // decimal point, delete, period
//     if (exchangeHelper.isValidKey(event, allowableKeyArray)) {
//       // These are valid keypresses, but we don't need to request an offer from the API
//       return
//     }
    
//     // numpad 0-9, numeric 0-9
//     if ((event.which >= 48 && event.which <= 57) || (event.which >= 96 && event.which <= 105)) {
//       // These are valid keypresses. We need to request an offer from the API
//       ExchangeFunctions.getOfferWithOutAmount()
//       return
//     }

//     event.preventDefault()
//   }

//   // const outCurrencyValueKeydownListener = function (event) {
//   //   let outCurrencyValue = document.getElementById('outCurrencyValue');

//   //   // Test whether the key is allowed or not, and abort execution if not allowed
    
//   //   let allowableKeyArray = [37, 39, 46, 8]; // arrow keys, delete, backspace
//   //   if (exchangeHelper.isValidKey(event, allowableKeyArray)) {
//   //     // These are valid keypresses, but we don't need to request an offer from the API
//   //     return
//   //   }

//   //   let currencyTickerCode = document.getElementById("outCurrencySelectList").value;
//   //   // arrow keys, delete, backspace
//   //   // if (event.which == 37 || event.which == 39 || event.which == 46 || event.which == 8) {
//   //   //   return
//   //   // }
    
//   //   // We need to limit the number of decimals based on the selected currency
//   //   // checkDecimals returns false if we exceed the second parameter in decimal places
//   //   if (!checkDecimals(outCurrencyValue.value, exchangeHelper.currencyMetadata[currencyTickerCode].precision)) {
//   //     console.log("Decimal limit reached");
//   //     event.preventDefault()
//   //     return
//   //   }

//   //   allowableKeyArray = [110, 46, 190] // decimal point, delete, period
//   //   if (exchangeHelper.isValidKey(event, allowableKeyArray)) {
//   //     // These are valid keypresses, but we don't need to request an offer from the API
//   //     return
//   //   }
    
//   //   // numpad 0-9, numeric 0-9
//   //   if ((event.which >= 48 && event.which <= 57) || (event.which >= 96 && event.which <= 105)) {
//   //     // These are valid keypresses. We need to request an offer from the API
//   //     document.getElementById('')

//   //     ExchangeFunctions.getOfferWithOutAmount()
//   //     return
//   //   }

//   //   event.preventDefault()
//   // }

//   let inCurrencyGetOffer = function(inCurrency, outCurrency, inAmount) {
//     ExchangeFunctions.getOfferWithInAmount(inCurrency, outCurrency, inAmount)
//         .then((response) => {
//           const BTCToReceive = parseFloat(response.out_amount)
//           let outCurrencyValue = document.getElementById('outCurrencyValue')
//           outCurrencyValue.value = BTCToReceive.toFixed(8)
//         }).catch((error) => {
//           //handleOfferError(error)
//           console.log(error);
//           let errorDiv = handleOfferError(error);
//           serverValidation.appendChild(errorDiv);
//           orderBtn.style.display = 'block'
//           orderStarted = false
//         })
//   }
//     // Coordinates the retrieval of a quote given an out currency and a in amount. Returns a value for outCurrencyValue
//       // Coordinates the retrieval of a quote given an out currency and a out amount. Returns a value for inCurrencyValue
//       let outCurrencyGetOffer = function(inCurrency, outCurrency, outAmount) {
//         // Get inCurrencyType, outCurrencyType
//         ExchangeFunctions.getOfferWithOutAmount(inCurrency, outCurrency, outAmount)
//           .then((response) => {
//             console.log("Response for out currency");
//             const XMRtoReceive = parseFloat(response.in_amount)
//             const selectedWallet = document.getElementById('selected-wallet')
//             const tx_feeElem = document.getElementById('tx-fee')
//             const tx_fee = tx_feeElem.dataset.txFee
//             const tx_fee_double = parseFloat(tx_fee)
//             const walletMaxSpendDouble = parseFloat(selectedWallet.dataset.walletbalance)
//             const walletMaxSpend = walletMaxSpendDouble - tx_fee
//             // let BTCToReceive = inCurrencyValue.value * exchangeFunctions.currentRates.price;
//             // let XMRbalance = parseFloat(inCurrencyValue.value);
//             const BTCCurrencyValue = parseFloat(outCurrencyValue.value)

//             if ((walletMaxSpend - XMRtoReceive) < 0) {
//               const error = document.createElement('div')
//               error.classList.add('message-label')
//               error.id = 'xmrexceeded'
//               error.innerHTML = `You cannot exchange more than ${walletMaxSpend} XMR`
//               validationMessages.appendChild(error)
//             }

//             if (BTCCurrencyValue.toFixed(12) > ExchangeFunctions.currentRates.upper_limit) {
//               const error = document.createElement('div')
//               error.id = 'xmrexceeded'
//               error.classList.add('message-label')
//               const btc_amount = parseFloat(ExchangeFunctions.currentRates.upper_limit)
//               error.innerHTML = `You cannot exchange more than ${btc_amount} BTC.`
//               validationMessages.appendChild(error)
//             }
//             if (BTCCurrencyValue.toFixed(8) < ExchangeFunctions.currentRates.lower_limit) {
//               const error = document.createElement('div')
//               error.id = 'xmrtoolow'
//               error.classList.add('message-label')
//               const btc_amount = parseFloat(ExchangeFunctions.currentRates.lower_limit)
//               error.innerHTML = `You cannot exchange less than ${btc_amount} BTC.`
//               validationMessages.appendChild(error)
//             }
//             inCurrencyValue.value = XMRtoReceive.toFixed(12)
//           }).catch((error) => {
//             handleOfferError(error)
//           })
//       }
      
//       const outputBalanceChecks = exchangeHelper.eventListeners.outBalanceChecks;
//       const xmrBalanceChecks = function (exchangeElements, ExchangeFunctions) {

//         exchangeElements.serverValidation.innerHTML = ''
//         let BTCToReceive = exchangeElements.BTCToReceive
//         const XMRbalance = parseFloat(exchangeElements.inCurrencyValue.value)
//         const in_amount = XMRbalance.toFixed(12)
//         exchangeElements.outCurrencyValue.value = 'Loading...'
//         if (currencyInputTimer !== undefined) {
//           clearTimeout(currencyInputTimer)
//         }
//         if (ExchangeFunctions.currentRates.in_min > XMRbalance) {
//           const error = document.createElement('div')
//           error.classList.add('message-label')
//           error.id = 'xmrexceeded'
//           error.innerHTML = `You cannot exchange less than ${ExchangeFunctions.currentRates.in_min} XMR`
//           exchangeElements.validationMessages.appendChild(error)
//           return
//         }
//         if (ExchangeFunctions.currentRates.in_max < XMRbalance) {
//           const error = document.createElement('div')
//           error.classList.add('message-label')
//           error.id = 'xmrexceeded'
//           error.innerHTML = `You cannot exchange more than ${ExchangeFunctions.currentRates.in_max} XMR`
//           exchangeElements.validationMessages.appendChild(error)
//           return
//         }
//         exchangeElements.validationMessages.innerHTML = ''
//         exchangeElements.serverValidation.innerHTML = ''
//         currencyInputTimer = setTimeout(() => {
//           let inCurrencyDiv = document.getElementById("inCurrencySelectList");
//           let outCurrencyDiv = document.getElementById("outCurrencySelectList");  
//           let inCurrencyValue = document.getElementById("inCurrencyValue").value;
//           inCurrencyGetOffer(inCurrencyDiv, outCurrencyDiv, inCurrencyValue, exchangeElements)
//         }, 1500)
//       }

//       function getRates() {
//         // it's safe to refresh the sending fee here, because we know the HTML exists in the DOM
//         //self._refresh_sending_fee();
//         const exchangePage = document.getElementById('orderStatusPage')
//         const loaderPage = document.getElementById('loader')
//         const outAddressInput = document.getElementById('outAddress')
//         const inCurrencyValue = document.getElementById('inCurrencyValue')
//         const outCurrencyValue = document.getElementById('outCurrencyValue')
//         const orderBtn = document.getElementById('order-button')
//         const explanatoryMessage = document.getElementById('explanatory-message')
//         const serverRatesValidation = document.getElementById('server-rates-messages')
//         const validationMessages = document.getElementById('validation-messages')
//         const walletSelector = document.getElementById('wallet-selector')
//         const walletOptions = document.getElementById('wallet-options')
//         const exchangePageDiv = document.getElementById('exchangePage')
//         const orderStatusPage = document.getElementById('orderStatusPage')
//         const addressValidation = document.getElementById('address-messages')
//         const serverValidation = document.getElementById('server-messages')
//         const selectedWallet = document.getElementById('selected-wallet')
//         const orderStatusDiv = document.getElementById('exchangePage')
  

//         let exchangeElements = {
//           exchangePage: exchangePage,
//           loaderPage: loaderPage,
//           outAddressInput: outAddressInput,
//           inCurrencyValue: inCurrencyValue,
//           outCurrencyValue: outCurrencyValue,
//           orderBtn: orderBtn,
//           explanatoryMessage: explanatoryMessage,
//           serverRatesValidation: serverRatesValidation,
//           validationMessages: validationMessages,
//           walletSelector: walletSelector,
//           walletOptions: walletOptions,
//           exchangePageDiv: exchangePageDiv,
//           orderStatusPage: orderStatusPage,
//           addressValidation: addressValidation,
//           serverValidation: serverValidation,
//           selectedWallet: selectedWallet,
//           orderStatusDiv: orderStatusDiv
//         }
        
//         outAddressInput.addEventListener('input', exchangeHelper.eventListeners.outAddressInputListener)
//         inCurrencyValue.addEventListener('keydown', exchangeHelper.eventListeners.inCurrencyValueKeydownListener)
//         //outCurrencyValue.addEventListener('keydown', exchangeHelper.eventListeners.outCurrencyValueKeydownListener)
//         //outCurrencyValue.addEventListener('keydown', outCurrencyValueKeydownListener)
//         console.log(orderBtn);
//         console.log("OrderBtnBindNext");
//         //console.log(exchangeHelper.eventListeners.orderBtnClickedListener.bind())
//         //orderBtn.addEventListener('click', exchangeHelper.eventListeners.orderButtonClickedListener)
//         orderBtn.addEventListener('click', orderBtnClicked)

//         outCurrencyValue.addEventListener('keyup', function (event) {
//           //clearValidationMessages(alertValid);
//           validationMessages.innerHTML = ''
//           if (outCurrencyValue.value.length > 0) {
//             btcBalanceChecks()
//           }
//         })

//         //outCurrencyValue.addEventListener('keyup', () => clearValidationMessages(exchangeHelper.eventListeners.btcBalanceChecks))
//         //inCurrencyValue.addEventListener('keyup', () => clearValidationMessages(exchangeHelper.eventListeners.inBalanceChecks))

//         inCurrencyValue.addEventListener('change', function (event) {
//           //exchangeHelper.clearValidationMessages();

//           console.log("This event fired");
//           validationMessages.innerHTML = ''
//           if (inCurrencyValue.value.length > 0) {
//             //exchangeHelper.eventListeners.inBalanceChecks()
//             xmrBalanceChecks(exchangeElements, ExchangeFunctions)
//           }
//         })
        
//         serverRatesValidation.innerHTML = ''
//         const retry = document.getElementById('retry-rates')
//         const errorDiv = document.getElementById('retry-error')
//         if (retry !== null) {
//           retry.classList.add('hidden')
//           errorDiv.classList.add('hidden')
//         }
//         ExchangeFunctions.getRatesAndLimits().then(() => {
//           loaderPage.classList.remove('active')
//           exchangePage.classList.add('active')
//         }).catch((error) => {
//           /**/
//           loaderPage.classList.remove('active')
//           exchangePage.classList.add('active')
//           if (retry !== null) {
//             retry.classList.remove('hidden')
//             errorDiv.classList.remove('hidden')
//           } else {
//             // KB: Remove this ---

//             // end remove

//             const errorDiv = document.createElement('div')
//             errorDiv.innerText = "There was a problem with retrieving rates from the server. Please click the 'Retry' button to try connect again. The error message was: " + error.message
//             errorDiv.id = 'retry-error'
//             errorDiv.classList.add('message-label')
//             const retryBtn = document.createElement('div')
//             retryBtn.id = 'retry-rates'
//             retryBtn.classList.add('base-button')
//             retryBtn.classList.add('hoverable-cell')
//             retryBtn.classList.add('navigation-blue-button-enabled')
//             retryBtn.classList.add('action')
//             retryBtn.innerHTML = 'Retry'
//             retryBtn.addEventListener('click', getRates)
//             explanatoryMessage.appendChild(errorDiv)
//             explanatoryMessage.appendChild(retryBtn)
//           }
//         }).finally(() => {
//           ExchangeFunctions.initialiseExchangeConfiguration().then((response) => {
//             // Data returned by resolve
//             // If we get an error, we assume localmonero should be enabled 
//             const localmoneroDiv = document.getElementById('localmonero')
//             const localmoneroAnchor = document.getElementById('localmonero-anchor')
//             localmoneroAnchor.setAttribute('referrer_id', response.data.referrer_info.localmonero.referrer_id)
//             localmoneroAnchor.setAttribute('url', 'https://localmonero.co')
//             localmoneroAnchor.setAttribute('param_str', 'rc')

//             // if (response.referrer_info.indacoin.enabled === true) {
//             //     indacoinDiv.style.display = "block";
//             //     indacoinAnchor.addEventListener('click', openClickableLink);
//             // }
//             if (response.data.referrer_info.localmonero.enabled === true) {
//               localmoneroDiv.style.display = 'block'
//               localmoneroAnchor.addEventListener('click', exchangeHelper.openClickableLink)
//             }
//           }).catch(error => {
//             const localmoneroDiv = document.getElementById('localmonero')
//             const localmoneroAnchor = document.getElementById('localmonero-anchor')

//             localmoneroAnchor.setAttribute('referrer_id', 'h2t1')
//             localmoneroAnchor.setAttribute('url', 'https://localmonero.co')
//             localmoneroAnchor.setAttribute('param_str', 'rc')
//             // No data received from promise resolve(). Display link for LocalMonero
//             localmoneroDiv.style.display = 'block'
//             localmoneroAnchor.addEventListener('click', exchangeHelper.openClickableLink)
//           })
//         })
//       }

      

      

//       function checkDecimals (value, decimals) {
//         console.log("checkDecimals:", value, decimals);
//         const str = value.toString()
//         const strArr = str.split('.')
//         if (strArr.length > 1) {
//           if (strArr[1].length >= decimals) {
//             return false
//           }
//         }
//         return true
//       }

//       function isValidBase10Decimal (number) {
//         const str = number.toString()
//         const strArr = str.split('.')
//         if (strArr.size > 1 && typeof (strArr) === Array) {
//           return false
//         }
//         for (let i = 0; i < 2; i++) {
//           if (isNaN(parseInt(strArr[i]))) {
//             return false
//           }
//         }
//         if (strArr.size > 1) {
//           if (strArr[1].length == 0) {
//             return false
//           }
//         }
//         return true
//       }

//       function orderBtnClicked () {
//         let validationError = false
//         serverValidation.innerHTML = ''
//         if (orderStarted == true) {
//           return
//         }
//         if (validationMessages.firstChild !== null) {
//           validationMessages.firstChild.style.color = '#ff0000'
//           validationError = true
//           return
//         }
//         if (addressValidation.firstChild !== null) {
//           addressValidation.firstChild.style.color = '#ff0000'
//           validationError = true
//           return
//         }
//         const btc_dest_address = document.getElementById('outAddress').value
//         let firstTick = true
//         orderBtn.style.display = 'none'
//         orderStarted = true
//         // backBtn.style.display = "block";
//         loaderPage.classList.add('active')
//         let orderStatusResponse = { orderTick: 0 }
//         const out_amount = document.getElementById('outCurrencyValue').value
//         const in_currency = 'XMR'
//         const out_currency = 'BTC'
//         try {
//           const offer = ExchangeFunctions.getOfferWithOutAmount(in_currency, out_currency, out_amount).then((response) => {

//           }).then((error, response) => {
//             const selectedWallet = document.getElementById('selected-wallet')

//             ExchangeFunctions.createOrder(btc_dest_address, selectedWallet.dataset.walletpublicaddress).then((response) => {
//               //document.getElementById('orderStatusPage').classList.remove('active')
//               let e = document.getElementById('orderStatusPage');
//               console.log(e);
//               e = document.getElementById('orderStatusPage');
//               console.log(e);
//               loaderPage.classList.remove('active')
//               orderStatusDiv.classList.add('active')
//               exchangePageDiv.classList.add('active')
//               // backBtn.innerHTML = `<div class="base-button hoverable-cell utility grey-menu-button disableable left-back-button" style="cursor: default; -webkit-app-region: no-drag; position: absolute; opacity: 1; left: 0px;"></div>`;
//               orderTimer = setInterval(() => {
//                 if (orderStatusResponse.hasOwnProperty('expires_at')) {
//                   orderStatusResponse.orderTick++
//                   exchangeHelper.renderOrderStatus(orderStatusResponse)
//                   const expiryTime = orderStatusResponse.expires_at
//                   const secondsElement = document.getElementById('secondsRemaining')
//                   const minutesElement = document.getElementById('minutesRemaining')
//                   if (secondsElement !== null) {
//                     const minutesElement = document.getElementById('minutesRemaining')
//                     const timeRemaining = exchangeHelper.timerHelper.getTimeRemaining(expiryTime)
//                     minutesElement.innerHTML = timeRemaining.minutes
//                     if (timeRemaining.seconds <= 9) {
//                       timeRemaining.seconds = '0' + timeRemaining.seconds
//                     }
//                     secondsElement.innerHTML = timeRemaining.seconds
//                     const xmr_dest_address_elem = document.getElementById('in_address')
//                     xmr_dest_address_elem.value = response.receiving_subaddress
//                   }

//                   if (orderStatusResponse.status == 'PAID' || orderStatusResponse.status == 'TIMED_OUT' ||
//                                 orderStatusResponse.status == 'DONE' || orderStatusResponse.status == 'FLAGGED_DESTINATION_ADDRESS' ||
//                                 orderStatusResponse.status == 'PAYMENT_FAILED' || orderStatusResponse.status == 'REJECTED' ||
//                                 orderStatusResponse.status == 'EXPIRED') {
//                     clearInterval(localOrderTimer)
//                   }
//                 }
//                 if ((orderStatusResponse.orderTick % 10) == 0) {
//                   ExchangeFunctions.getOrderStatus().then(function (response) {
//                     const elemArr = document.getElementsByClassName('provider-name')
//                     if (firstTick == true || elemArr[0].innerHTML == 'undefined') {
//                       exchangeHelper.renderOrderStatus(response)
//                       elemArr[0].innerHTML = response.provider_name
//                       elemArr[1].innerHTML = response.provider_name
//                       elemArr[2].innerHTML = response.provider_name

//                       firstTick = false
//                     }
//                     let orderTick = orderStatusResponse.orderTick
//                     orderTick++
//                     response.orderTick = orderTick
//                     orderStatusResponse = response
//                   })
//                 }
//               }, 1000)
//               document.getElementById('orderStatusPage').classList.remove('active')
//             }).catch((error) => {
//               //exchangeHelper.ErrorHelper.handleOfferError(error, exchangeElements);
//               let errorDiv = handleOfferError(error);
//               serverValidation.appendChild(errorDiv);
//               orderBtn.style.display = 'block'
//               orderStarted = false
//             })
//           }).catch((error) => {
//             let errorDiv = handleOfferError(error);
//             serverValidation.appendChild(errorDiv);
//             orderBtn.style.display = 'block'
//             orderStarted = false
//           })
//         } catch (Error) {
//           console.log(Error)
//         }
//       }
      
//       setTimeout(() => {
//         const exchangeRendered = document.getElementById('orderStatusPage')
//         if (exchangeRendered == null) {
//           // do nothing -- this loop will run when order page is locked
//         } else {
//           function clearValidationMessages(callbackFunction = null) {
//             if (typeof(callbackFunction) === "function") {
//               callbackFunction('test');
//             }
//           }
  
//           // bind to listener that will update the coin labels when the outCurrency is changed
//           //document.getElementById('outCurrencySelectList').addEventListener('change', exchangeHelper.eventListeners.updateCurrencyLabels);

//           getRates()
//           // Safe to set fee because the DOM will have rendered
//           let estimatedTotalFee_JSBigInt = this.monero_utils.estimated_tx_network_fee(null, 1, '24658');
//           let estimatedFeeStr = this.monero_utils.newEstimatedNetworkFeeString(estimatedTotalFee_JSBigInt);
//           let feeElement = document.getElementById('tx-fee')
//           // Safe to set up wallet selector since it'll have been rendered
//           let walletSelector = document.getElementById('wallet-selector');

//           exchangeHelper.renderWalletSelector(this.walletsListController.records, walletSelector);
//           exchangeHelper.setSendingFee(estimatedFeeStr, feeElement)
//           //initialized = true
//         }
//       }, 100)
//     }

class ExchangeContentView extends View {
  constructor (options, context) {
    // Can we deterministically add an event listener to clicks on the Exchange tab?
    
    super(options, context)
    const ecvSelf = this
    const self = context

    //
    const view = new View({}, self.context)
    const layer = view.layer
    const margin_side = 16
    const marginTop = 56
    layer.style.marginTop = `${marginTop}px`
    layer.style.marginLeft = margin_side + 'px'
    layer.style.width = `calc(100% - ${2 * margin_side}px)`
    layer.style.height = `calc(100% - ${marginTop}px - 15px)`

    ecvSelf._setup_emptyStateContainerView(context)
    ecvSelf.observerIsSet = false
  }

  _setup_views () {
    const self = this
    //self._refresh_sending_fee();
    console.log("Setup view stuff");
  }

  // New refactored
  _setup_tabButtonClickListener(context) {
    const self = this;
    console.log("Setting up tab button click listener");
    let tabElement = document.getElementById('tabButton-exchange');
    //tabElement.addEventListener('click', self.renderExchangeForm.bind(context))
  }

  // New refactored
  renderExchangeForm(context) {
    // Let's check whether we're unlocked, and if yes, refresh the wallet selector
    const self = this 
    console.log(self.exchangeFormTemplate);
    if (self.walletsListController.records.length > 0) {
      let walletHtml = exchangeHelper.walletSelectorTemplate(self)
      console.log(walletHtml);
      let walletSelector = document.getElementById('wallet-selector');
      walletSelector.innerHTML = walletHtml;
    }   
  }

  _setup_emptyStateContainerView (context) {
    // TODO: wrap this in a promise so that we can execute logic after this
    const self = this
    self.exchangeFormTemplate = exchangeHelper.htmlFormTemplate();
    let parentElementToAttachListenerTo = document.getElementById('tabButton-exchange');
    // We need to refactor this to update a template
    const initialExchangeInit = setInterval(() => {
      // We can't guarantee the existence of the tabButton-exchange div because of how the page loads, so we wrap it in an interval that fires as soon as the render is done
      let parentElementToAttachListenerTo = document.getElementById('tabButton-exchange');
      if (parentElementToAttachListenerTo !== null) {
        self._setup_tabButtonClickListener(self.context);
        clearInterval(self.initialExchangeInit)
        // TODO: We need to move the walletExchangeOptions init somewhere else
        //self._setup_walletExchangeOptions(self.context)
      }
    }, 200)

    self.initialExchangeInit = initialExchangeInit

    const view = new View({}, self.context)
    {
      const layer = view.layer
      layer.classList.add('emptyScreens')
      layer.classList.add('empty-page-panel')
    }
    let contentContainerLayer
    {
      const layer = document.createElement('div')
      layer.classList.add('content-container')
      layer.classList.add('empty-page-content-container')
      view.layer.appendChild(layer)
      contentContainerLayer = layer
    }

    {
      const layer = document.createElement('div')
      layer.classList.add('message-label')
      layer.classList.add('exchangeRate')
      layer.id = 'explanatory-message'
      layer.innerHTML = 'You can exchange XMR to Bitcoin here. Please wait while we load rates.'
      contentContainerLayer.appendChild(layer)
    }

    {
      // Send Funds
      const layer = document.createElement('div')
      // we use ES6's spread operator (...buttonClasses) to invoke the addition of classes -- cleaner than a foreach
      const buttonClasses = ['base-button', 'hoverable-cell', 'navigation-blue-button-enabled', 'action', 'right-add-button', 'exchange-button']
      layer.classList.add(...buttonClasses)
      layer.id = 'exchangePage'
      layer.innerText = 'Exchange XMR'
      const orderSent = false
      layer.addEventListener('click', function (orderSent) {
        const exchangePageDiv = document.getElementById('exchangePage')
        exchangePageDiv.classList.remove('active')

        /* 
                    * We define the status update and the response handling function here, since we need to update the DOM with status feedback from the monero-daemon.
                    * We pass them as the final argument to ExchangeUtils.sendFunds
                    * It performs the necessary DOM-based status updates in this file so that we don't tightly couple DOM updates to a Utility module.
                    */
        //function validation_status_fn = exchangeHelper.validationStatusCallback
        /*
                    * We perform the necessary DOM-based status updates in this file so that we don't tightly couple DOM updates to a Utility module.
                    */
        // function handle_response_fn (err, mockedTransaction) {
        //   let str
        //   const monerodUpdates = document.getElementById('monerod-updates')
        //   if (err) {
        //     str = typeof err === 'string' ? err : err.message
        //     monerodUpdates.innerText = str
        //     return
        //   }
        //   str = 'Sent successfully.'
        //   monerodUpdates.innerText = str
        // }
        // No cancel handler code since we don't provide a cancel method
        function cancelled_fn () { // canceled_fn
          // No cancel handler code since we don't provide a cancel method
        }
        
        /*
                    * We declare sendfunds here to have access to the context object
                    */
        const xmr_amount = document.getElementById('in_amount_remaining').innerHTML
        const xmr_send_address = document.getElementById('receiving_subaddress').innerHTML
        const xmr_amount_str = '' + xmr_amount

        const selectedWallet = document.getElementById('selected-wallet')
        const selectorOffset = selectedWallet.dataset.walletoffset
        const sweep_wallet = false // TODO: Add sweeping functionality
        try {
          if (context.walletsListController.hasOwnProperty('orderSent')) {
            console.log('Order already sent previously')
          } else {
            context.walletsListController.orderSent = false
          }
          sendFunds(context.walletsListController.records[0], xmr_amount_str, xmr_send_address, sweep_wallet, exchangeHelper.validationStatusCallback, exchangeHelper.handleSendResponseCallback, context)
        } catch (error) {
          console.log(error)
        }
      })

      contentContainerLayer.appendChild(layer)
    }
    {
      // let's make the xmr.to form in HTML for sanity's sake
      const layer = document.createElement('div')
      // layer.classList.add("xmr_input");
      console.log("Get base form");
      console.log(exchangeHelper);

      // We clone the first element of the template so that we get an instance of the first element, rather than a document fragment. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template
      let html = self.exchangeFormTemplate.content.firstElementChild.cloneNode(true);
      console.log("We have just cloned the form template")
      layer.appendChild(html)
      contentContainerLayer.appendChild(layer)
    }
    console.log("This ran?");
    let e = document.getElementById("exchangePage");
    console.log(e);
    self.emptyStateMessageContainerView = view
    self.addSubview(view)

    const a = document.getElementById('server-invalid')

    let initialized = false
    // addEventListnere
    const ECVContext = self
    console.log(ECVContext);
    setTimeout(() => {
      
      console.log(context);
      let tabElement = document.getElementById('tabButton-exchange');
      console.log(exchangeHelper.initialiseExchangeHelper);
      tabElement.addEventListener('click', () => {
        console.log(exchangeHelper);
        exchangeHelper.doInit(context);
      });
      
    }, 500)
    
  }

  Navigation_Title () {
    return 'Exchange'
  }

  Navigation_New_RightBarButtonView () {
    const self = this
    //
    const view = commonComponents_navigationBarButtons.New_RightSide_AddButtonView(self.context)
    // const view = _New_ButtonBase_View(context)
    const layer = view.layer
    { // setup/style
      layer.href = '' // to make it non-clickable -- KB: Or you could event.preventDefault..., like sane people?
      layer.innerHTML = 'Create Order'
      layer.id = 'order-button'
      layer.classList.add('exchange-button')
      layer.classList.add('base-button')
      layer.classList.add('hoverable-cell')
      layer.classList.add('navigation-blue-button-enabled')
      layer.classList.add('action')
      if (typeof process !== 'undefined' && process.platform === 'linux') {
        layer.style.fontWeight = '700' // surprisingly does not render well w/o this… not linux thing but font size thing. would be nice to know which font it uses and toggle accordingly. platform is best guess for now
      } else {
        layer.style.fontWeight = '300'
      }
    }
    
    return view
  }
}

module.exports = ExchangeContentView
