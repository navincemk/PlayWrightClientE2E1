class OrderDetailPage {
    constructor(page) {
        this.page = page;
        this.verificationTextLocator = page.locator(".col-text");
    }

    async getOrderDetails() {
        // Wait for the element to be available and add debugging
        console.log("Waiting for order detail page to load...");
        await this.verificationTextLocator.waitFor({ timeout: 10000 });
        console.log("Order detail element found, extracting text...");
        const orderidordersummary = await this.verificationTextLocator.textContent();
        console.log(`Order detail text: ${orderidordersummary}`);
        return orderidordersummary;
    }
}

export {OrderDetailPage};