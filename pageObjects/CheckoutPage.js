class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.checkoutbutton = page.getByRole('button', { name: 'Checkout' });
    }

  
    async productVisible() {
        const bool = await this.page.getByText("ZARA COAT 3").isVisible();
        return bool;
    }

    async checkoutBtn() {
        await this.checkoutbutton.click();
    }

    
}

export {CheckoutPage};