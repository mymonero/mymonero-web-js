// This file is a copy of lit-html branch's navigation controller. Move this to appropriate component folder once we roll out lit

// NavigationController is a function that takes a superclass as an argument, and mixins the superclass with navigation controller methods
const ExchangeNavigationController = (superClass) => class extends superClass {
    /* class fields & methods to extend superClass with */
    navigateToPage(destination) {
        let routeMap = {
            "changenowBuyWithFiatView": "changenow-buy-with-fiat-view",
            "changenowFixedRateView": "changenow-fixed-rate-view",
            "changenowFloatingRateView": "changenow-floating-rate-view",
            "landingPageView": "exchange-landing-page"
        }
        console.log("We want to navigate to " + destination)
        let contentView = document.getElementById('exchange-content-container');
        contentView.innerHTML = "";
        let pageElement = document.createElement(routeMap[destination]);
        pageElement.context = this.context;
        contentView.appendChild(pageElement);
        if (destination !== "landingPageView") {
            this.drawBackButton("landingPageView");
        } else {
            let backButtonDiv = document.getElementById("leftBarButtonHolderView");
            backButtonDiv.innerHTML = "";
        }
    }

    drawBackButton(destination) {
        let backButtonDiv = document.getElementById("leftBarButtonHolderView");
        // Since the backButtonDiv might have an event listener, we clone and replace it to make sure we don't end up with multiple listener
        backButtonDiv.innerHTML = backButtonDiv.cloneNode(true);
        backButtonDiv.innerHTML = '<div class="base-button hoverable-cell utility grey-menu-button disableable left-back-button" style="cursor: default; -webkit-app-region: no-drag; position: absolute; opacity: 1; left: 0px;"></div>';
        let instance = this;
        backButtonDiv.firstChild.addEventListener('click', (event) => {
            //
            instance.navigateToPage(destination);
        })
    }

    clearBackButton() {

    }

    handleBackButtonClickEvent() {

    }

    handleBackButtonTouchEvent() {

    }

    selfNavigate(page) {
        let routeMap = {
            "changenowBuyWithFiatView": "changenow-buy-with-fiat-view",
            "changenowFixedRateView": "changenow-fixed-rate-view",
            "changenowFloatingRateView": "changenow-floating-rate-view"
        }
        
        console.log(this.context);
        //let destination = event.path[0].dataset.pageDestination;
        console.log("We want to navigate to " + page)
        let contentView = document.querySelector('content-view');
        contentView.innerHTML = "";
        let pageElement = document.createElement(routeMap[page]);
        pageElement.context = this.context;
        contentView.appendChild(pageElement);
    }

    // initialiseContent() {
    //     let contentView = document.querySelector('content-view');
    //     let landingPage = document.createElement('landing-page-greeting');
    //     landingPage.context = this.context;
    //     contentView.appendChild(landingPage);
    // }
}

module.exports = ExchangeNavigationController;