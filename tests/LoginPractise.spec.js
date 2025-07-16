import {test , expect} from "@playwright/test";

const url = "https://rahulshettyacademy.com/loginpagePractise/";
const username = "rahulshettyacademy";
const userpassword = "learning";
const selectOption = "Consultant";
const productName = "iphone X";

test.describe.configure({ mode: 'parallel' });
test(`Login Practise Test` , async({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(url);
    await page.locator("#username").fill(username);
    await page.locator("#password").fill(userpassword);
    await page.getByRole("radio", { name: "user" }).check();
    await page.getByRole("button", { name: "Okay" }).click();
    await page.getByRole("combobox").selectOption(selectOption);
    await page.getByRole("checkbox", { name: "I Agree to the terms and conditions" }).click();
    await page.getByRole("button", { name: "Sign In"}).click();

    //await page.pause();

    await page.locator(".card-body").first().waitFor({state: "visible"});
    await page.locator("app-card").filter({hasText : productName}).getByRole("button").click();
    await page.locator(".ml-auto .nav-link").click();
    await page.locator(".media-body").waitFor();
    const checkoutText = await page.getByText(productName).textContent();
    expect(checkoutText).toContain(productName);

}),

test(`Incorrect username test` , async ({browser})=> {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(url);
    await page.locator("#username").fill("wrongusername");
    await page.locator("#password").fill(userpassword);
    await page.getByRole("radio", { name: "user" }).check();
    await page.getByRole("button", { name: "Okay" }).click();
    await page.getByRole("button", { name: "Sign In"}).click();
    
    // Wait for the error message to appear with a longer timeout
    await page.locator(".alert-danger").waitFor({state: "visible", timeout: 15000});
    const errorText = await page.locator(".alert-danger").textContent();
    console.log(errorText);
    expect(errorText).toContain("Incorrect username/password.");


}),

test(`New Window Test`, async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(url);


    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.locator("[href*='documents-request']").click()
    ]);

    const fullText = await newPage.locator(".red").textContent();
    const userid = fullText.split("@")[1].split(".")[0];
    console.log(userid);
    expect(userid).toContain("rahulshettyacademy");

    await page.locator("#username").fill(userid);
    await page.locator("#password").fill(userpassword);
    await page.getByRole("radio", { name: "user" }).check();
    await page.getByRole("button", { name: "Okay" }).click();
    await page.getByRole("combobox").selectOption("Consultant");
    await page.getByRole("checkbox", { name: "I Agree to the terms and conditions" }).click();
    await page.getByRole("button", { name: "Sign In"}).click();

    

});