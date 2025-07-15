class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder('email@example.com'); 
        this.passwordInput = page.getByPlaceholder('enter your passsword'); 
        this.loginButton = page.getByRole('button', { name: 'Login' }); 
        this.cardBody = page.locator(".card-body");
    }

    async navigateTourl(url) {
        await this.page.goto(url , {timeout: 60000});
    }

    async login(username,userpassword) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(userpassword);
        await this.loginButton.click();
        await this.cardBody.first().waitFor();
    }

}

module.exports = {LoginPage};