class OrderDetailPage {
    constructor(page) {
        this.page = page;
        // Update to look for the actual order ID element that exists on the page
        this.orderIdLocator = page.locator("text=Order Id").locator("..").locator("text=/^[0-9a-f]{24}$/");
    }

    async getOrderDetails() {
        // Wait for the order summary page to load
        console.log("Waiting for order summary page to load...");
        await this.page.waitForLoadState('networkidle');
        
        // Look for the order ID on the order summary page
        await this.orderIdLocator.waitFor({ timeout: 10000 });
        console.log("Order ID element found, extracting text...");
        const orderidordersummary = await this.orderIdLocator.textContent();
        console.log(`Order ID from summary: ${orderidordersummary}`);
        return orderidordersummary;
    }
}

export {OrderDetailPage};