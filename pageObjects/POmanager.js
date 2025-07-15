import {LoginPage} from "../pageObjects/LoginPage.js";
import {LandingPage} from "../pageObjects/LandingPage.js";
import {CheckoutPage} from "../pageObjects/CheckoutPage.js";
import {PlaceorderPage} from "../pageObjects/PlaceorderPage.js";
import {OrderConfirmationPage} from "../pageObjects/OrderconfirmationPage.js";
import {OrderHistoryPage} from "../pageObjects/OrderhistoryPage.js";
import {OrderDetailPage} from "../pageObjects/OrderdetailPage.js";

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

export {POManager};