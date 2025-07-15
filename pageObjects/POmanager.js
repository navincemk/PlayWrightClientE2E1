const {LoginPage} = require("../pageObjects/LoginPage");
const {LandingPage} = require("../pageObjects/LandingPage");
const {CheckoutPage} = require("../pageObjects/CheckoutPage");
const {PlaceorderPage} = require("../pageObjects/PlaceorderPage");
const {OrderConfirmationPage} = require("../pageObjects/OrderconfirmationPage");
const {OrderHistoryPage} = require("../pageObjects/OrderhistoryPage");
const {OrderDetailPage} = require("../pageObjects/OrderdetailPage");

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.landingPage = new LandingPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.placeOrderPage = new PlaceorderPage(page);
        this.orderConfirmationPage = new OrderConfirmationPage(page);
        this.orderHistoryPage = new OrderHistoryPage(page);
        this.orderDetailPage = new OrderDetailPage(page);
    }

    // Add methods to initialize and manage page objects
}

module.exports = {POManager};