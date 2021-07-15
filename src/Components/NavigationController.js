// NavigationController is a function that takes a superclass as an argument, and mixins the superclass with navigation controller methods
const NavigationController = (superClass) => class extends superClass {
    /* class fields & methods to extend superClass with */
    navigateToPage(event) {
        let routeMap = {
            "fundRequest": "fund-request",
            "contacts": "contacts-view",
            "loginWithMnemonic": "login-mnemonic-view"
        }
        console.log(event);
        console.log(this.context);
        let destination = event.path[0].dataset.pageDestination;
        console.log("We want to navigate to " + destination)
        let contentView = document.querySelector('content-view');
        contentView.innerHTML = "";
        let pageElement = document.createElement(routeMap[destination]);
        pageElement.context = this.context;
        contentView.appendChild(pageElement);
    }

    selfNavigate(page) {
        let routeMap = {
            "fundRequest": "fund-request",
            "contacts": "contacts-view",
            "loginWithMnemonic": "login-mnemonic-view"
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

    initialiseContent() {
        let contentView = document.querySelector('content-view');
        let landingPage = document.createElement('landing-page-greeting');
        landingPage.context = this.context;
        contentView.appendChild(landingPage);
    }
}

module.exports = NavigationController;