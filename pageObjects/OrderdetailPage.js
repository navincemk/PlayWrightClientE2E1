class OrderDetailPage {
    constructor(page) {
        this.page = page;
        this.verificationTextLocator = page.locator(".col-text");
    }

    

    async getOrderDetails() {
        // Add logic to retrieve order details
        const orderidordersummary = await this.verificationTextLocator.textContent();
        return orderidordersummary;
    }

    
}

module.exports = {OrderDetailPage};