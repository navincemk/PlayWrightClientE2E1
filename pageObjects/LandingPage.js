class LandingPage {
    constructor(page) {
        this.page = page;
        this.cardbody = page.locator(".card-body");
        this.cartbutton = page.locator("button[routerlink*='cart']");
        this.producttextvisible = page.getByText("ZARA COAT 3");
    }

    async addtocart(productName) {

        const countcardbody = await this.cardbody.count();
        for(let i=0 ; i<countcardbody; i++){
        const productText = await this.cardbody.nth(i).locator("b").textContent();
        if(productText === productName){
            await this.cardbody.nth(i).getByRole('button', { name: 'Add To Cart' }).click()
            break;
        }
    }

    await this.cartbutton.click();
    await this.producttextvisible.waitFor();
    }

   
}

export {LandingPage};