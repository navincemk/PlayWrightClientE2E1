class OrderHistoryPage {
    constructor(page) {
        this.page = page;
        this.tableRowLocator = page.locator("tbody tr");
    }

    async getOrderList(cleanorderid) {
        await this.page.locator("tbody").waitFor();
        const rowcount = await this.tableRowLocator.count();

        for(let k=0 ; k<rowcount ; k++) {
            const placedorderid = await this.tableRowLocator.nth(k).locator("th").textContent();
            
            if(placedorderid === cleanorderid) {
                await this.tableRowLocator.nth(k).getByRole('button', { name: 'View' }).click();
                break;
            }
        }
    }
}

module.exports = {OrderHistoryPage};