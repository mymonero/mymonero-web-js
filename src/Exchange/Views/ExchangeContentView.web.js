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
const ExchangeHelper = require("mymonero-exchange-helper")
let exchangeHelper = new ExchangeHelper();
console.log(exchangeHelper);
console.log(exchangeHelper.ErrorHelper);
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

function set_sending_fee(feeString, elemToSet) {
  elemToSet.dataset.txFee = feeString;
  elemToSet.innerHTML = `<span class="field_title form-field-title" style="margin-top: 8px; color: rgb(158, 156, 158); display: inline-block;">+ ${feeString} XMR EST. FEE</span>`
}

function renderWalletSelector(walletRecords, elemToSet) {
  if (walletRecords.length > 0) {
    let walletHtml = exchangeHelper.walletSelectorTemplate(walletRecords)
    let walletSelector = elemToSet;
    walletSelector.innerHTML = walletHtml;
  }   
}

function initialiseFunction() {
  console.log("initialiseFunction invoked");
  // We bind this to the context of the invoking function when we set up an event listener
  console.log(this);
  //self.context.monero_utils.estimated_tx_network_fee
  
  // use this.monero
  // if (typeof (loaderPage) === undefined) {
  //   return
  // }
  const order = {}
  let orderStarted = false
  let orderCreated = false
  // let backBtn = document.getElementsByClassName('nav-button-left-container')[0];
  // backBtn.style.display = "none";
  const exchangePage = document.getElementById('orderStatusPage')
  const outAddressInput = document.getElementById('outAddress')
  const walletSelector = document.getElementById('wallet-selector')
  const walletOptions = document.getElementById('wallet-options')
  const exchangePageDiv = document.getElementById('exchangePage')
  const orderStatusPage = document.getElementById('orderStatusPage')
  const addressValidation = document.getElementById('address-messages')
  const serverValidation = document.getElementById('server-messages')
  const explanatoryMessage = document.getElementById('explanatory-message')
  const selectedWallet = document.getElementById('selected-wallet')
  const serverRatesValidation = document.getElementById('server-rates-messages')
  const inCurrencyValue = document.getElementById('inCurrencyValue')
  const outCurrencyValue = document.getElementById('outCurrencyValue')
  const validationMessages = document.getElementById('validation-messages')
  const orderBtn = document.getElementById('order-button')
  const orderStatusDiv = document.getElementById('exchangePage')
  let orderTimer = {}
  let currencyInputTimer
  
  function validateBTCAddress (address, ValidationLibrary) {
    // Replace this with our ChangeNow library's integration at some stage
    try {
      if (ValidationLibrary.validate(address) == false) {
        console.log(ValidationLibrary.validate(address))
        return false
      }
    } catch (Error) {
      console.log(Error)
    }
    console.log(ValidationLibrary.validate(address))
    return true
  }

  const outAddressInputListener = function () {
    const outAddressInput = document.getElementById('outAddress')
    addressValidation.innerHTML = ''

    console.log("We could leave address validation to the exchange server instead of validating three different address types")
    // if (validateBTCAddress(btcAddressInput.value, ValidationLibrary) == false) {
    //   const error = document.createElement('div')
    //   error.classList.add('message-label')
    //   error.id = 'btc-invalid'
    //   error.innerHTML = 'Your BTC address is not valid.'
    //   addressValidation.appendChild(error)
    // }
  }

  // const inCurrencyValueKeydownListener = function (event) {
  //   if (event.which == 8 || event.which == 110 || event.which == 46 || event.which == 190) { return }

  //   if ((event.which >= 48 && event.which <= 57) || (event.which >= 96 && event.which <= 105)) {
  //     return
  //   }

  //   if (!checkDecimals(inCurrencyValue.value, 12)) {
  //     event.preventDefault()
  //     return
  //   }

  //   event.preventDefault()
  // }

  const outCurrencyValueKeydownListener = function (event) {
    // We need to limit the number of decimals based on the selected currency
    let currencyTickerCode = document.getElementById("outCurrencySelectList").value;
    // arrow keys, delete, backspace
    if (event.which == 37 || event.which == 39 || event.which == 46 || event.which == 8) {
      return
    }
    // checkDecimals returns false if we exceed the second parameter in decimal places
    if (!checkDecimals(outCurrencyValue.value, exchangeHelper.currencyMetadata[currencyTickerCode].precision)) {
      console.log("Decimal limit reached");
      event.preventDefault()
      return
    }

    if (event.which == 8 || event.which == 110 || event.which == 46 || event.which == 190) { return }

    // numpad and numeric
    if ((event.which >= 48 && event.which <= 57) || (event.which >= 96 && event.which <= 105)) {
      return
    }

    event.preventDefault()
  }
    // Coordinates the retrieval of a quote given an out currency and a in amount. Returns a value for outCurrencyValue
      let inCurrencyGetOffer = function(inCurrency, outCurrency, inAmount) {
        ExchangeFunctions.getOfferWithInAmount(inCurrency, outCurrency, inAmount)
            .then((response) => {
              console.log('async return', response)
              console.log(parseFloat(response.out_amount));
              const BTCToReceive = parseFloat(response.out_amount)
              // console.log("wtf");
              // const selectedWallet = document.getElementById('selected-wallet')
              // const tx_feeElem = document.getElementById('tx-fee')
              // const tx_fee = tx_feeElem.dataset.txFee
              // const tx_fee_double = parseFloat(tx_fee)
              // const walletMaxSpendDouble = parseFloat(selectedWallet.dataset.walletbalance)
              // const walletMaxSpend = walletMaxSpendDouble - tx_fee
              
              // if ((walletMaxSpend - XMRbalance) < 0) {
              //   const error = document.createElement('div')
              //   error.classList.add('message-label')
              //   error.id = 'xmrexceeded'
              //   error.innerHTML = `You cannot exchange more than ${walletMaxSpend} XMR`
              //   validationMessages.appendChild(error)
              // }
              // if (BTCToReceive.toFixed(8) > ExchangeFunctions.currentRates.out_max) {
              //   const error = document.createElement('div')
              //   error.classList.add('message-label')
              //   error.id = 'xmrexceeded'
              //   error.innerHTML = `You cannot exchange more than ${ExchangeFunctions.currentRates.in_max.toFixed(12)} XMR`
              //   validationMessages.appendChild(error)
              // }
              // if (BTCToReceive.toFixed(8) < ExchangeFunctions.currentRates.lower_limit) {
              //   const error = document.createElement('div')
              //   error.classList.add('message-label')
              //   error.id = 'xmrtoolow'
              //   error.innerHTML = `You cannot exchange less than ${ExchangeFunctions.currentRates.in_min.toFixed(12)} XMR.`
              //   validationMessages.appendChild(error)
              // }
              let outCurrencyValue = document.getElementById('outCurrencyValue')
              outCurrencyValue.value = BTCToReceive.toFixed(8)
            }).catch((error) => {
              //handleOfferError(error)
              console.log(error);
              let errorDiv = handleOfferError(error);
              serverValidation.appendChild(errorDiv);
              orderBtn.style.display = 'block'
              orderStarted = false
            })
      }
      // Coordinates the retrieval of a quote given an out currency and a out amount. Returns a value for inCurrencyValue
      let outCurrencyGetOffer = function(inCurrency, outCurrency, outAmount) {
        // Get inCurrencyType, outCurrencyType
        ExchangeFunctions.getOfferWithOutAmount(inCurrency, outCurrency, outAmount)
          .then((response) => {
            console.log("Response for out currency");
            const XMRtoReceive = parseFloat(response.in_amount)
            const selectedWallet = document.getElementById('selected-wallet')
            const tx_feeElem = document.getElementById('tx-fee')
            const tx_fee = tx_feeElem.dataset.txFee
            const tx_fee_double = parseFloat(tx_fee)
            const walletMaxSpendDouble = parseFloat(selectedWallet.dataset.walletbalance)
            const walletMaxSpend = walletMaxSpendDouble - tx_fee
            // let BTCToReceive = inCurrencyValue.value * exchangeFunctions.currentRates.price;
            // let XMRbalance = parseFloat(inCurrencyValue.value);
            const BTCCurrencyValue = parseFloat(outCurrencyValue.value)

            if ((walletMaxSpend - XMRtoReceive) < 0) {
              const error = document.createElement('div')
              error.classList.add('message-label')
              error.id = 'xmrexceeded'
              error.innerHTML = `You cannot exchange more than ${walletMaxSpend} XMR`
              validationMessages.appendChild(error)
            }

            if (BTCCurrencyValue.toFixed(12) > ExchangeFunctions.currentRates.upper_limit) {
              const error = document.createElement('div')
              error.id = 'xmrexceeded'
              error.classList.add('message-label')
              const btc_amount = parseFloat(ExchangeFunctions.currentRates.upper_limit)
              error.innerHTML = `You cannot exchange more than ${btc_amount} BTC.`
              validationMessages.appendChild(error)
            }
            if (BTCCurrencyValue.toFixed(8) < ExchangeFunctions.currentRates.lower_limit) {
              const error = document.createElement('div')
              error.id = 'xmrtoolow'
              error.classList.add('message-label')
              const btc_amount = parseFloat(ExchangeFunctions.currentRates.lower_limit)
              error.innerHTML = `You cannot exchange less than ${btc_amount} BTC.`
              validationMessages.appendChild(error)
            }
            inCurrencyValue.value = XMRtoReceive.toFixed(12)
          }).catch((error) => {
            handleOfferError(error)
          })
      }
      console.log(exchangeHelper.eventListeners);
      const outputBalanceChecks = exchangeHelper.eventListeners.outBalanceChecks;
      //const handleOfferError = exchangeHelper.errorHelper.handleOfferError;
      // const handleOfferError = function(error) {
      //   console.log("handleOfferError invoked")
      //   console.log(error);
      //   validationMessages.innerHTML = "";
      //   serverValidation.innerHTML = "";
      //   let errorDiv = document.createElement('div');
      //   errorDiv.classList.add('message-label');
      //   let errorMessage = "";
      //   if (typeof(error.response.status) == "undefined") {
      //       errorMessage = error.message
      //   } else {
      //       // We may have a value in error.response.data.Error
      //       if (typeof(error.response.data) !== "undefined" && typeof(error.response.data.Error !== "undefined")) {
      //           errorMessage = error.response.data.Error
      //       } else {
      //           errorMessage = error.message
      //       }
      //   }
      //   errorDiv.id = 'server-invalid';
      //   errorDiv.innerHTML = `There was a problem communicating with the server. <br>If this problem keeps occurring, please contact support with a screenshot of the following error: <br>` + errorMessage;
      //   serverValidation.appendChild(errorDiv);      
      // }

      const xmrBalanceChecks = function (exchangeElements, ExchangeFunctions) {

        exchangeElements.serverValidation.innerHTML = ''
        let BTCToReceive = exchangeElements.BTCToReceive
        const XMRbalance = parseFloat(exchangeElements.inCurrencyValue.value)
        const in_amount = XMRbalance.toFixed(12)
        exchangeElements.outCurrencyValue.value = 'Loading...'
        if (currencyInputTimer !== undefined) {
          clearTimeout(currencyInputTimer)
        }
        if (ExchangeFunctions.currentRates.in_min > XMRbalance) {
          const error = document.createElement('div')
          error.classList.add('message-label')
          error.id = 'xmrexceeded'
          error.innerHTML = `You cannot exchange less than ${ExchangeFunctions.currentRates.in_min} XMR`
          exchangeElements.validationMessages.appendChild(error)
          return
        }
        if (ExchangeFunctions.currentRates.in_max < XMRbalance) {
          const error = document.createElement('div')
          error.classList.add('message-label')
          error.id = 'xmrexceeded'
          error.innerHTML = `You cannot exchange more than ${ExchangeFunctions.currentRates.in_max} XMR`
          exchangeElements.validationMessages.appendChild(error)
          return
        }
        exchangeElements.validationMessages.innerHTML = ''
        exchangeElements.serverValidation.innerHTML = ''
        currencyInputTimer = setTimeout(() => {
          let inCurrencyDenomination = document.getElementById("inCurrencySelectList").value;
          let outCurrencyDenomination = document.getElementById("outCurrencySelectList").value;  
          let inCurrencyValue = document.getElementById("inCurrencyValue").value;
          inCurrencyGetOffer(inCurrencyDenomination, outCurrencyDenomination, inCurrencyValue)
        //   ExchangeFunctions.getOfferWithInAmount(ExchangeFunctions.in_currency, ExchangeFunctions.out_currency, in_amount)
        //     .then((response) => {
        //       console.log('async return', response)
        //       BTCToReceive = parseFloat(response.out_amount)
        //       const selectedWallet = document.getElementById('selected-wallet')
        //       const tx_feeElem = document.getElementById('tx-fee')
        //       const tx_fee = tx_feeElem.dataset.txFee
        //       const tx_fee_double = parseFloat(tx_fee)
        //       const walletMaxSpendDouble = parseFloat(selectedWallet.dataset.walletbalance)
        //       const walletMaxSpend = walletMaxSpendDouble - tx_fee

        //       if ((walletMaxSpend - XMRbalance) < 0) {
        //         const error = document.createElement('div')
        //         error.classList.add('message-label')
        //         error.id = 'xmrexceeded'
        //         error.innerHTML = `You cannot exchange more than ${walletMaxSpend} XMR`
        //         validationMessages.appendChild(error)
        //       }
        //       if (BTCToReceive.toFixed(8) > ExchangeFunctions.currentRates.out_max) {
        //         const error = document.createElement('div')
        //         error.classList.add('message-label')
        //         error.id = 'xmrexceeded'
        //         error.innerHTML = `You cannot exchange more than ${ExchangeFunctions.currentRates.in_max.toFixed(12)} XMR`
        //         validationMessages.appendChild(error)
        //       }
        //       if (BTCToReceive.toFixed(8) < ExchangeFunctions.currentRates.lower_limit) {
        //         const error = document.createElement('div')
        //         error.classList.add('message-label')
        //         error.id = 'xmrtoolow'
        //         error.innerHTML = `You cannot exchange less than ${ExchangeFunctions.currentRates.in_min.toFixed(12)} XMR.`
        //         validationMessages.appendChild(error)
        //       }
        //       outCurrencyValue.value = BTCToReceive.toFixed(8)
        //     }).catch((error) => {
        //       const errorDiv = document.createElement('div')
        //       errorDiv.classList.add('message-label')
        //       errorDiv.id = 'server-invalid'
        //       errorDiv.innerHTML = 'There was a problem communicating with the server. <br>If this problem keeps occurring, please contact support with a screenshot of the following error: <br>' + error.message
        //       serverValidation.appendChild(errorDiv)
        //     })
        }, 1500)
      }

      function getRates() {
        // it's safe to refresh the sending fee here, because we know the HTML exists in the DOM
        //self._refresh_sending_fee();
        const exchangePage = document.getElementById('orderStatusPage')
        const loaderPage = document.getElementById('loader')
        const outAddressInput = document.getElementById('outAddress')
        const inCurrencyValue = document.getElementById('inCurrencyValue')
        const outCurrencyValue = document.getElementById('outCurrencyValue')
        const orderBtn = document.getElementById('order-button')
        const explanatoryMessage = document.getElementById('explanatory-message')
        const serverRatesValidation = document.getElementById('server-rates-messages')
        const validationMessages = document.getElementById('validation-messages')
        const walletSelector = document.getElementById('wallet-selector')
        const walletOptions = document.getElementById('wallet-options')
        const exchangePageDiv = document.getElementById('exchangePage')
        const orderStatusPage = document.getElementById('orderStatusPage')
        const addressValidation = document.getElementById('address-messages')
        const serverValidation = document.getElementById('server-messages')
        const selectedWallet = document.getElementById('selected-wallet')
        const orderStatusDiv = document.getElementById('exchangePage')
  

        let exchangeElements = {
          exchangePage: exchangePage,
          loaderPage: loaderPage,
          outAddressInput: outAddressInput,
          inCurrencyValue: inCurrencyValue,
          outCurrencyValue: outCurrencyValue,
          orderBtn: orderBtn,
          explanatoryMessage: explanatoryMessage,
          serverRatesValidation: serverRatesValidation,
          validationMessages: validationMessages,
          walletSelector: walletSelector,
          walletOptions: walletOptions,
          exchangePageDiv: exchangePageDiv,
          orderStatusPage: orderStatusPage,
          addressValidation: addressValidation,
          serverValidation: serverValidation,
          selectedWallet: selectedWallet,
          orderStatusDiv: orderStatusDiv
        }
        
        outAddressInput.addEventListener('input', exchangeHelper.eventListeners.outAddressInputListener)
        inCurrencyValue.addEventListener('keydown', exchangeHelper.eventListeners.inCurrencyValueKeydownListener)
        //outCurrencyValue.addEventListener('keydown', exchangeHelper.eventListeners.outCurrencyValueKeydownListener)
        outCurrencyValue.addEventListener('keydown', outCurrencyValueKeydownListener)
        console.log(orderBtn);
        console.log("OrderBtnBindNext");
        //console.log(exchangeHelper.eventListeners.orderBtnClickedListener.bind())
        //orderBtn.addEventListener('click', exchangeHelper.eventListeners.orderButtonClickedListener)
        orderBtn.addEventListener('click', orderBtnClicked)

        outCurrencyValue.addEventListener('keyup', function (event) {
          //clearValidationMessages(alertValid);
          validationMessages.innerHTML = ''
          if (outCurrencyValue.value.length > 0) {
            btcBalanceChecks()
          }
        })

        //outCurrencyValue.addEventListener('keyup', () => clearValidationMessages(exchangeHelper.eventListeners.btcBalanceChecks))
        //inCurrencyValue.addEventListener('keyup', () => clearValidationMessages(exchangeHelper.eventListeners.inBalanceChecks))

        inCurrencyValue.addEventListener('keyup', function (event) {
          //exchangeHelper.clearValidationMessages();
          validationMessages.innerHTML = ''
          if (inCurrencyValue.value.length > 0) {
            //exchangeHelper.eventListeners.inBalanceChecks()
            xmrBalanceChecks(exchangeElements, ExchangeFunctions)
          }
        })
        console.log(self);
        console.log("What do we have access to in this var?")
        //self.renderExchangeForm(self.context)
        //self._renderWalletSelector();
        serverRatesValidation.innerHTML = ''
        const retry = document.getElementById('retry-rates')
        const errorDiv = document.getElementById('retry-error')
        if (retry !== null) {
          retry.classList.add('hidden')
          errorDiv.classList.add('hidden')
        }
        ExchangeFunctions.getRatesAndLimits().then(() => {
          loaderPage.classList.remove('active')
          exchangePage.classList.add('active')
        }).catch((error) => {
          /**/
          loaderPage.classList.remove('active')
          exchangePage.classList.add('active')
          if (retry !== null) {
            retry.classList.remove('hidden')
            errorDiv.classList.remove('hidden')
          } else {
            // KB: Remove this ---

            // end remove

            const errorDiv = document.createElement('div')
            errorDiv.innerText = "There was a problem with retrieving rates from the server. Please click the 'Retry' button to try connect again. The error message was: " + error.message
            errorDiv.id = 'retry-error'
            errorDiv.classList.add('message-label')
            const retryBtn = document.createElement('div')
            retryBtn.id = 'retry-rates'
            retryBtn.classList.add('base-button')
            retryBtn.classList.add('hoverable-cell')
            retryBtn.classList.add('navigation-blue-button-enabled')
            retryBtn.classList.add('action')
            retryBtn.innerHTML = 'Retry'
            retryBtn.addEventListener('click', getRates)
            explanatoryMessage.appendChild(errorDiv)
            explanatoryMessage.appendChild(retryBtn)
          }
        }).finally(() => {
          ExchangeFunctions.initialiseExchangeConfiguration().then((response) => {
            // Data returned by resolve
            // If we get an error, we assume localmonero should be enabled 
            const localmoneroDiv = document.getElementById('localmonero')
            const localmoneroAnchor = document.getElementById('localmonero-anchor')
            localmoneroAnchor.setAttribute('referrer_id', response.data.referrer_info.localmonero.referrer_id)
            localmoneroAnchor.setAttribute('url', 'https://localmonero.co')
            localmoneroAnchor.setAttribute('param_str', 'rc')

            // if (response.referrer_info.indacoin.enabled === true) {
            //     indacoinDiv.style.display = "block";
            //     indacoinAnchor.addEventListener('click', openClickableLink);
            // }
            if (response.data.referrer_info.localmonero.enabled === true) {
              localmoneroDiv.style.display = 'block'
              localmoneroAnchor.addEventListener('click', openClickableLink)
            }
          }).catch(error => {
            const localmoneroDiv = document.getElementById('localmonero')
            const localmoneroAnchor = document.getElementById('localmonero-anchor')

            localmoneroAnchor.setAttribute('referrer_id', 'h2t1')
            localmoneroAnchor.setAttribute('url', 'https://localmonero.co')
            localmoneroAnchor.setAttribute('param_str', 'rc')
            // No data received from promise resolve(). Display link for LocalMonero
            localmoneroDiv.style.display = 'block'
            localmoneroAnchor.addEventListener('click', openClickableLink)
          })
        })
      }

      

      

      function checkDecimals (value, decimals) {
        console.log("checkDecimals:", value, decimals);
        const str = value.toString()
        const strArr = str.split('.')
        if (strArr.length > 1) {
          if (strArr[1].length >= decimals) {
            return false
          }
        }
        return true
      }

      function openClickableLink () {
        const self = this
        const referrer_id = self.getAttribute('referrer_id')
        const url = self.getAttribute('url')
        const paramStr = self.getAttribute('param_str')
        if (referrer_id.length > 0) {
          console.log('Got a referrer -- generate custom URL')
          const urlToOpen = url + '?' + paramStr + '=' + referrer_id
          window.open(urlToOpen)
        } else {
          console.log('No referrer')
          window.open('https://localmonero.co')
        }
      }

      function isValidBase10Decimal (number) {
        const str = number.toString()
        const strArr = str.split('.')
        if (strArr.size > 1 && typeof (strArr) === Array) {
          return false
        }
        for (let i = 0; i < 2; i++) {
          if (isNaN(parseInt(strArr[i]))) {
            return false
          }
        }
        if (strArr.size > 1) {
          if (strArr[1].length == 0) {
            return false
          }
        }
        return true
      }

      function orderBtnClicked () {
        let validationError = false
        serverValidation.innerHTML = ''
        if (orderStarted == true) {
          return
        }
        if (validationMessages.firstChild !== null) {
          validationMessages.firstChild.style.color = '#ff0000'
          validationError = true
          return
        }
        if (addressValidation.firstChild !== null) {
          addressValidation.firstChild.style.color = '#ff0000'
          validationError = true
          return
        }
        const btc_dest_address = document.getElementById('outAddress').value
        let firstTick = true
        orderBtn.style.display = 'none'
        orderStarted = true
        // backBtn.style.display = "block";
        loaderPage.classList.add('active')
        let orderStatusResponse = { orderTick: 0 }
        const out_amount = document.getElementById('outCurrencyValue').value
        const in_currency = 'XMR'
        const out_currency = 'BTC'
        try {
          const offer = ExchangeFunctions.getOfferWithOutAmount(in_currency, out_currency, out_amount).then((response) => {

          }).then((error, response) => {
            const selectedWallet = document.getElementById('selected-wallet')

            ExchangeFunctions.createOrder(btc_dest_address, selectedWallet.dataset.walletpublicaddress).then((response) => {
              //document.getElementById('orderStatusPage').classList.remove('active')
              let e = document.getElementById('orderStatusPage');
              console.log(e);
              e = document.getElementById('orderStatusPage');
              console.log(e);
              loaderPage.classList.remove('active')
              orderStatusDiv.classList.add('active')
              exchangePageDiv.classList.add('active')
              // backBtn.innerHTML = `<div class="base-button hoverable-cell utility grey-menu-button disableable left-back-button" style="cursor: default; -webkit-app-region: no-drag; position: absolute; opacity: 1; left: 0px;"></div>`;
              orderTimer = setInterval(() => {
                if (orderStatusResponse.hasOwnProperty('expires_at')) {
                  orderStatusResponse.orderTick++
                  exchangeHelper.renderOrderStatus(orderStatusResponse)
                  const expiryTime = orderStatusResponse.expires_at
                  const secondsElement = document.getElementById('secondsRemaining')
                  const minutesElement = document.getElementById('minutesRemaining')
                  if (secondsElement !== null) {
                    const minutesElement = document.getElementById('minutesRemaining')
                    const timeRemaining = exchangeHelper.timerHelper.getTimeRemaining(expiryTime)
                    minutesElement.innerHTML = timeRemaining.minutes
                    if (timeRemaining.seconds <= 9) {
                      timeRemaining.seconds = '0' + timeRemaining.seconds
                    }
                    secondsElement.innerHTML = timeRemaining.seconds
                    const xmr_dest_address_elem = document.getElementById('in_address')
                    xmr_dest_address_elem.value = response.receiving_subaddress
                  }

                  if (orderStatusResponse.status == 'PAID' || orderStatusResponse.status == 'TIMED_OUT' ||
                                orderStatusResponse.status == 'DONE' || orderStatusResponse.status == 'FLAGGED_DESTINATION_ADDRESS' ||
                                orderStatusResponse.status == 'PAYMENT_FAILED' || orderStatusResponse.status == 'REJECTED' ||
                                orderStatusResponse.status == 'EXPIRED') {
                    clearInterval(localOrderTimer)
                  }
                }
                if ((orderStatusResponse.orderTick % 10) == 0) {
                  ExchangeFunctions.getOrderStatus().then(function (response) {
                    const elemArr = document.getElementsByClassName('provider-name')
                    if (firstTick == true || elemArr[0].innerHTML == 'undefined') {
                      exchangeHelper.renderOrderStatus(response)
                      elemArr[0].innerHTML = response.provider_name
                      elemArr[1].innerHTML = response.provider_name
                      elemArr[2].innerHTML = response.provider_name

                      firstTick = false
                    }
                    let orderTick = orderStatusResponse.orderTick
                    orderTick++
                    response.orderTick = orderTick
                    orderStatusResponse = response
                  })
                }
              }, 1000)
              document.getElementById('orderStatusPage').classList.remove('active')
            }).catch((error) => {
              //exchangeHelper.ErrorHelper.handleOfferError(error, exchangeElements);
              let errorDiv = handleOfferError(error);
              serverValidation.appendChild(errorDiv);
              orderBtn.style.display = 'block'
              orderStarted = false
            })
          }).catch((error) => {
            let errorDiv = handleOfferError(error);
            serverValidation.appendChild(errorDiv);
            orderBtn.style.display = 'block'
            orderStarted = false
          })
        } catch (Error) {
          console.log(Error)
        }
      }
      
      setTimeout(() => {
        const exchangeRendered = document.getElementById('orderStatusPage')
        if (exchangeRendered == null) {
          // do nothing -- this loop will run when order page is locked
        } else {
          function clearValidationMessages(callbackFunction = null) {
            if (typeof(callbackFunction) === "function") {
              callbackFunction('test');
            }
          }
  
          // bind to listener that will update the coin labels when the outCurrency is changed
          //document.getElementById('outCurrencySelectList').addEventListener('change', exchangeHelper.eventListeners.updateCurrencyLabels);

          getRates()
          // Safe to set fee because the DOM will have rendered
          let estimatedTotalFee_JSBigInt = this.monero_utils.estimated_tx_network_fee(null, 1, '24658');
          let estimatedFeeStr = newEstimatedNetworkFeeString(estimatedTotalFee_JSBigInt);
          let feeElement = document.getElementById('tx-fee')
          // Safe to set up wallet selector since it'll have been rendered
          let walletSelector = document.getElementById('wallet-selector');

          renderWalletSelector(this.walletsListController.records, walletSelector);
          set_sending_fee(estimatedFeeStr, feeElement)
          initialized = true
        }
      }, 100)
    }

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
    //ecvSelf._setup_views()
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

  _renderWalletSelector() {
    const self = this;
    if (self.context.walletsListController.records.length > 0) {
      let walletHtml = exchangeHelper.walletSelectorTemplate(self.context.walletsListController.records)
      console.log(walletHtml);
      let walletSelector = document.getElementById('wallet-selector');
      walletSelector.innerHTML = walletHtml;
    }   
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
      // layer.classList.add("xmr_input");
      // const html = `
      //       <style>
      //           .NavigationBarView + div {}
      //       </style>
      //       <div class="exchangeScreen exchange-page-panel">
      //           <div class="content-container exchange-page-content-container">
      //               <div id="server-rates-messages"></div>
      //               <div id="loader" class="active">
      //                   <!-- gets replaced by loader -->
      //               </div>`
      // layer.innerHTML = html
      
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
      // const layer = document.createElement("div")
      // layer.id = "localmonero";
      // layer.innerHTML = "Buy Monero using LocalMonero";
      // layer.style.textTransform = "uppercase";
      // layer.style.display = "none";

      // contentContainerLayer.appendChild(layer)
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
    setTimeout(() => {
      
      console.log(context);
      let tabElement = document.getElementById('tabButton-exchange');
      tabElement.addEventListener('click', initialiseFunction.bind(context));
      
    }, 500)
    
  }

  // Balance_JSBigInt (wallet) {
  //   const self = this
  //   let total_received = wallet.total_received
  //   let total_sent = wallet.total_sent
  //   if (typeof total_received === 'undefined') {
  //     total_received = new JSBigInt(0) // patch up to avoid crash as this doesn't need to be fatal
  //   }
  //   if (typeof total_sent === 'undefined') {
  //     total_sent = new JSBigInt(0) // patch up to avoid crash as this doesn't need to be fatal
  //   }
  //   const balance_JSBigInt = total_received.subtract(total_sent)
  //   if (balance_JSBigInt.compare(0) < 0) {
  //     return new JSBigInt(0)
  //   }
  //   return balance_JSBigInt
  // }

  // UnlockedBalance_FormattedString (wallet) { // provided for convenience mainly so consumers don't have to require monero_utils
  //   const self = this
  //   const balance_JSBigInt = self.UnlockedBalance_JSBigInt(wallet)
  //   return monero_amount_format_utils.formatMoney(balance_JSBigInt)
  // }

  // Balance_FormattedString (wallet) { // provided for convenience mainly so consumers don't have to require monero_utils
  //   const self = this
  //   const balance_JSBigInt = self.Balance_JSBigInt(wallet)
  //   return monero_amount_format_utils.formatMoney(balance_JSBigInt)
  // }

  // Balance_DoubleNumber (wallet) {
  //   const self = wallet
  //   return parseFloat(self.Balance_FormattedString()) // is this appropriate and safe?
  // }

  // UnlockedBalance_JSBigInt (wallet) {
  //   const self = wallet
  //   const difference = self.Balance_JSBigInt().subtract(
  //     self.locked_balance || new JSBigInt(0)
  //   )
  //   if (difference.compare(0) < 0) {
  //     return new JSBigInt(0)
  //   }
  //   return difference
  // }

  // LockedBalance_JSBigInt (wallet) {
  //   const self = wallet
  //   let lockedBalance_JSBigInt = self.locked_balance
  //   if (typeof lockedBalance_JSBigInt === 'undefined') {
  //     lockedBalance_JSBigInt = new JSBigInt(0)
  //   }
  //   //
  //   return lockedBalance_JSBigInt
  // }

  // LockedBalance_FormattedString () { // provided for convenience mainly so consumers don't have to require monero_utils
  //   const self = this
  //   const lockedBalance_JSBigInt = self.LockedBalance_JSBigInt()
  //   //
  //   return monero_amount_format_utils.formatMoney(lockedBalance_JSBigInt)
  // }

  // LockedBalance_DoubleNumber () {
  //   const self = this
  //   return parseFloat(self.LockedBalance_FormattedString()) // is this appropriate and safe?
  // }

  new_xmr_estFeeAmount () {
    const self = this
    const estimatedNetworkFee_JSBigInt = new JSBigInt(self.context.monero_utils.estimated_tx_network_fee(
      null, // deprecated - will be removed soon
      1,
      '24658' // TODO: grab this from wallet via API request
    ))
    const estimatedTotalFee_JSBigInt = estimatedNetworkFee_JSBigInt // no tx hosting service fee
    //
    return estimatedTotalFee_JSBigInt
  }

  // Eventually it'd be cool to move this into the exchange-helper library
  _new_estimatedNetworkFee_displayString () {
    const self = this
    const estimatedTotalFee_JSBigInt = self.new_xmr_estFeeAmount()
    const estimatedTotalFee_str = monero_amount_format_utils.formatMoney(estimatedTotalFee_JSBigInt)
    const estimatedTotalFee_moneroAmountDouble = parseFloat(estimatedTotalFee_str)

    // const estimatedTotalFee_moneroAmountDouble = 0.028
    // Just hard-coding this to a reasonable estimate for now as the fee estimator algo uses the median blocksize which results in an estimate about twice what it should be
    const displayCcySymbol = self.context.settingsController.displayCcySymbol
    const finalizable_ccySymbol = displayCcySymbol
    const finalizable_formattedAmountString = estimatedTotalFee_str// `${estimatedTotalFee_moneroAmountDouble}`
    const final_formattedAmountString = finalizable_formattedAmountString
    const final_ccySymbol = 'XMR'
    const displayString = `${final_formattedAmountString}`
    //
    return displayString
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
