class OrderDetailPage {
    constructor(page) {
        this.page = page;
        // Look specifically for the element that contains the order ID pattern
        this.orderSummaryLocator = page.locator('text=/Order Id[0-9a-f]{24}/');
    }

    async getOrderDetails() {
        // Wait for the order summary page to load
        console.log("Waiting for order summary page to load...");
        await this.page.waitForLoadState('networkidle');
        
        // Look for the element containing the order ID
        await this.orderSummaryLocator.waitFor({ timeout: 10000 });
        console.log("Order summary element found, extracting text...");
        const orderSummaryText = await this.orderSummaryLocator.textContent();
        
        // Extract the order ID using a flexible regex that handles any spacing after "Order Id"
        const orderIdMatch = orderSummaryText.match(/Order Id\s*([0-9a-f]{24})/);
        const orderId = orderIdMatch ? orderIdMatch[1] : ""; // Use [1] to get the captured group
        
        console.log(`Order summary text: ${orderSummaryText}`);
        console.log(`Order ID extracted: ${orderId}`);
        return orderId;
    }
}

export {OrderDetailPage};