class OrderHistoryPage {
    constructor(page) {
        this.page = page;
        this.tableRowLocator = page.locator("tbody tr");
    }

    async getOrderList(cleanorderid) {
        await this.page.locator("tbody").waitFor();
        const rowcount = await this.tableRowLocator.count();
        console.log(`Found ${rowcount} orders in history`);
        console.log(`Looking for order ID: ${cleanorderid}`);

        for(let k=0 ; k<rowcount ; k++) {
            const placedorderid = await this.tableRowLocator.nth(k).locator("th").textContent();
            console.log(`Order ${k}: ${placedorderid}`);
            
            if(placedorderid === cleanorderid) {
                console.log(`Found matching order, clicking View button`);
                await this.tableRowLocator.nth(k).getByRole('button', { name: 'View' }).click();
                // Wait for navigation to order detail page
                await this.page.waitForLoadState('networkidle');
                break;
            }
        }
    }
}

export {OrderHistoryPage};