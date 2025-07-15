class OrderConfirmationPage {
    constructor(page) {
        this.page = page;
        this.orderConfirmationText = page.locator(".hero-primary");
        this.orderIdLocator = page.locator(".em-spacer-1 .ng-star-inserted");
        this.orderHistoryButton = page.locator("button[routerlink*='myorders']");
        this.tableBodyLocator = page.locator("tbody");
    }

    async orderConfirmationCheck() {
        // Add logic to retrieve order details from the page
            const confirmationText = await this.orderConfirmationText.textContent();
            return confirmationText;
    }

    async collectOrderId() {
        // Add logic to verify the success message on the order confirmation page
        const orderid = await this.orderIdLocator.textContent();

        const sanitizedOrderId = orderid.replace(/\|/g, '');
        console.log("Sanitized Order ID: " + sanitizedOrderId);
        const cleanorderid = sanitizedOrderId.trim();
        console.log("Clean Order ID: " + cleanorderid);
        return cleanorderid;

        
    }

    async clickOrderHistoryButton(){
        await this.orderHistoryButton.click();
        await this.tableBodyLocator.waitFor();

    }
}

module.exports = {OrderConfirmationPage};