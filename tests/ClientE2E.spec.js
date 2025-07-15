const { test, expect } = require('@playwright/test');
const {POmanager} = require("../pageObjects/POmanager");
const {LoginPage} = require("../pageObjects/LoginPage");
const {LandingPage} = require("../pageObjects/LandingPage");
const {CheckoutPage} = require("../pageObjects/CheckoutPage");
const {PlaceorderPage} = require("../pageObjects/PlaceorderPage");
const {OrderConfirmationPage} = require("../pageObjects/OrderconfirmationPage");
const {OrderHistoryPage} = require("../pageObjects/OrderhistoryPage");
const {OrderDetailPage} = require("../pageObjects/OrderdetailPage");

//test.describe.configure({ mode: 'serial' });
//--reporter=line,allure-playwright
test(`Place order` , async ({browser}) => {

    const url = "https://rahulshettyacademy.com/client/";
    const username = "reply4navin@gmail.com";
    const userpassword = "Navin@1987";
    const productName = "ZARA COAT 3";
    const seqpress = "ind";
    const country = " India";

    const context = await browser.newContext();
    const page = await context.newPage();

    //Login to the application
    const loginpage = new LoginPage(page);
    await loginpage.navigateTourl(url);
    await loginpage.login(username, userpassword);

    const landingpage = new LandingPage(page);
    await landingpage.addtocart(productName);

    const checkoutpage = new CheckoutPage(page);
    const bool = await checkoutpage.productVisible();
    expect(bool).toBeTruthy();
    await checkoutpage.checkoutBtn();

    const placeorderpage = new PlaceorderPage(page);
    await placeorderpage.placeOrder(seqpress, country);

    const orderconfpage = new OrderConfirmationPage(page);
    const confirmationText = await orderconfpage.orderConfirmationCheck();
    expect(confirmationText).toContain("Thankyou for the order.");
    const cleanorderid = await orderconfpage.collectOrderId();
    await orderconfpage.clickOrderHistoryButton();

    const orderhistorypage = new OrderHistoryPage(page);
    await orderhistorypage.getOrderList(cleanorderid);

    const orderdetailpage = new OrderDetailPage(page);
    const orderidordersummary = await orderdetailpage.getOrderDetails();
    expect(orderidordersummary).toContain(cleanorderid);

});