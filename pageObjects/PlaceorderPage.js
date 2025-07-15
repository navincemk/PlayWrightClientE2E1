class PlaceorderPage {
    constructor(page) {
        this.page = page;
        this.countryInput = page.getByPlaceholder('Select Country');
        this.countrySelection = page.locator(".ta-results button");
        this.countryTable = page.locator(".ta-results");
        this.submitOrdetButton = page.locator(".action__submit");
        this.orderConfirmationText = page.locator(".hero-primary");
    }

    async placeOrder(seqpress,country) {
        await this.countryInput.pressSequentially(seqpress);
        await this.countryTable.waitFor();
        const buttoncount = await this.countrySelection.count();

            for(let j=0 ; j<buttoncount ; j++) {

                const text = await this.countrySelection.nth(j).textContent();
                if(text === country) {
                    await this.countrySelection.nth(j).click();
                    break;
                }


            }

        await this.submitOrdetButton.click();

        await this.orderConfirmationText.waitFor();
    }

    
}

module.exports = {PlaceorderPage};