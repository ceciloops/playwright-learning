import { test, expect } from "@playwright/test"; 
// Se importa test y expect de Playwright para definir pruebas y hacer assertions.

import { fakerEN_GB as faker } from "@faker-js/faker";
// Se importa faker para generar datos aleatorios (nombres, correos, direcciones, etc.).

import * as fs from "fs";
// Se importa fs para leer y escribir archivos (credentials.json) y guardar usuarios creados.

test.describe("Presta Shop", () => {
//Todas las pruebas están dentro de test.describe("Presta Shop", ...) que es un contenedor lógico de pruebas relacionadas con Presta Shop.

   // 1. User should successfully log in with valid credentials - click on account.
     test("AC1: User should successfully log in with valid credentials - click on account", async ({ page }) => {
    
    // Navigate automationteststore
    await page.goto("https://automationteststore.com/");

    // Waits until the page finishes loading
    await page.waitForLoadState("networkidle");

    // Access login
    await page.locator("#main_menu_top > li:nth-child(2) > a > span").click();
    
    console.log("- User clicks account"); // ok

    // User fills username and password
    await page.waitForSelector("#loginFrm_loginname", { timeout: 10000 });
    await page.locator("#loginFrm_loginname").fill("cecilia");
    console.log("- User fills login name"); // ok
      
    await page.locator("#loginFrm_password").fill("ABC_123//");
    console.log("- User fills password"); // ok
  
    // Click "Login"
    await page.locator("#loginFrm > fieldset > button").click(); 
    console.log("- User clicks login"); // ok

    console.log("AC1: Passes");
  
    });

    // 2. User should successfully log in with valid credentials - hover over account.
    test("AC2: User should successfully log in with valid credentials - hover over account", async ({ page }) => {

    // Navigate automationteststore
    await page.goto("https://automationteststore.com/");

    // Hover account button
    // Similar a AC1, pero en vez de click directo, primero hace hover sobre "Account" y luego selecciona "Login".
    // Permite probar que la funcionalidad de login funciona también desde un menú desplegable.
    await page.locator("#main_menu_top > li:nth-child(2) > a > span").hover();
    console.log("- User hovers account"); // ok

    await page.locator("#main_menu_top > li:nth-child(2) > ul > li:nth-child(1) > a > span").click();
    console.log("- User clicks login"); // ok

    // User fills username and password
    await page.waitForSelector("#loginFrm_loginname", { timeout: 10000 });
    await page.locator("#loginFrm_loginname").fill("cecilia");
    console.log("- User fills login name"); // ok

    await page.locator("#loginFrm_password").fill("ABC_123//");
    console.log("- User fills password"); // ok

    // Click "Login"
    await page.locator("#loginFrm > fieldset > button").click(); 
    console.log("- User clicks login"); // ok

    console.log("AC2: Passes");

    });

    // 3. User should successfully log in with valid credentials - click on "Login or Register" button.
    test("AC3: User should successfully log in with valid credentials - click on 'Login or Register' button.", async ({ page }) => {

    // Navigate automationteststore
    await page.goto("https://automationteststore.com/");


    // Waits until the page finishes loading
    await page.waitForLoadState("networkidle");

    // Access login or register
    await page.locator("#customer_menu_top > li > a").click();
    console.log("- User clicks 'login or register' button"); // ok

    // User fills username and password
    await page.waitForSelector("#loginFrm_loginname", { timeout: 10000 });
    await page.locator("#loginFrm_loginname").fill("cecilia");
    console.log("- User fills login name"); // ok

    await page.locator("#loginFrm_password").fill("ABC_123//");
    console.log("- User fills password"); // ok

    // Click "Login"
    await page.locator("#loginFrm > fieldset > button").click(); 
    console.log("- User clicks login"); // ok

    console.log("AC3: Passes");

    });

    // 4. Register a new user using random firstname and lastname
    test("AC4: User should be able to register a new account with valid details.", async ({ page }) => {

    // Navigate automationteststore
    await page.goto("https://automationteststore.com/");


    // Waits until the page finishes loading
    await page.waitForLoadState("networkidle");

    // Access login or register
    await page.locator("#customer_menu_top > li > a").click();
    console.log("- User clicks 'login or register' button"); // ok

    // User access Register
    await page.waitForSelector("#accountFrm > fieldset > button", { timeout: 10000 });
    await page.locator("#accountFrm > fieldset > button").click();

    console.log("- User clicks continue button"); //ok

    // Waits until the page finishes loading
    await page.waitForLoadState('networkidle');
    await page.waitForSelector("#AccountFrm_firstname", { state: 'visible' });

    // Fill with a random name
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    await page.locator("#AccountFrm_firstname").fill(firstName);
    await page.locator("#AccountFrm_lastname").fill(lastName);

    console.log("- User firstname:",firstName); 
    console.log("- User lastName:",lastName); 

    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@sharklasers.com`; // https://www.guerrillamail.com/

    await page.locator("#AccountFrm_email").fill(email);

    console.log("- User email:",email); 

    // Random Address, City, State and Zipcode in GB
    const address1 = faker.location.streetAddress();
    const city = faker.location.city();
    const region = "Greater London"; 
    const zipCode = faker.location.zipCode("??# #??");


    await page.locator("#AccountFrm_address_1").fill(address1);
    await page.locator("#AccountFrm_city").fill(city);
    await page.locator("#AccountFrm_zone_id").selectOption({ label: region });
    await page.locator("#AccountFrm_postcode").fill(zipCode);

    console.log("- User address:",address1); 
    console.log("- User city:",city); 
    console.log("- User region:",region); 
    console.log("- User zip:",zipCode); 


    // Choose login name
    const loginName = `${firstName.toLowerCase()}${lastName.toLowerCase()}`; // interpolation
    await page.locator("#AccountFrm_loginname").fill(loginName);

    console.log("- User loginname:",loginName); 

    // Create password between 4 and 20 characters
    const password = faker.internet.password({ length: 20 });

    await page.locator("#AccountFrm_password").fill(password);

    console.log("- User password creation:",password); 

    // Retype password

    await page.locator("#AccountFrm_confirm").fill(password);
    console.log("- User password confirmation",password); 

    // Newsletter
    await page.locator("#AccountFrm_newsletter0").click();
    console.log("- User doesn't subscribe"); // ok

    // Privacy
    await page.locator("#AccountFrm_agree").click();
    console.log("- User agrees Privacy Policy"); // ok


    await page.locator("#AccountFrm > div.form-group > div > div > button").click();



    await page.waitForURL("https://automationteststore.com/index.php?rt=account/success");


    // the text exists  Your Account Has Been Created!
    const message = await page.locator('text=Your Account Has Been Created!');
    await expect(message).toBeVisible();

    console.log("- A new user was registered"); // ok

    // fs module (File System) with the synchronous method (writeFileSync) writes data to the "credentials.json" file.
    fs.writeFileSync("credentials.json", JSON.stringify({ loginName, password, firstName })); 


    // Click on "Continue" button after registration
    await page.locator("#maincontainer > div > div.col-md-9.col-xs-12.mt20 > div > div > section > a").click();

    // "Continue" button leads to "My account" page
    await page.waitForURL("https://automationteststore.com/index.php?rt=account/account");


    // Locates the "Welcome" element using the specified CSS selector
    const welcome = page.locator("#customer_menu_top > li > a > div"); 

    // Verifies that the element's text is "Welcome back " followed by the value of the variable firstName (string interpolation)
    await expect(welcome).toHaveText(`Welcome back ${firstName}`);

    console.log("- Customer menu top says: " + `Welcome back ${firstName}`);
    console.log("AC4: Passes");
    });

    // 5. User should successfully log in with valid credentials - click on account.
    test("AC5: User should successfully log in with valid credentials - click on account", async ({ page }) => {

    // fs module (File System) with the synchronous method (readFileSync) reads and converts the data from the "credentials.json" file into a JavaScript object.
    const json = JSON.parse(fs.readFileSync("credentials.json","utf-8")); 
    const loginName = json["loginName"];
    const password = json["password"];
    const firstName = json["firstName"];

    // Navigate automationteststore
    await page.goto("https://automationteststore.com/");

    // Waits until the page finishes loading
    await page.waitForLoadState("networkidle"); 

    // Access login
    await page.locator("#main_menu_top > li:nth-child(2) > a > span").click();
    console.log("- User clicks account"); // ok

    // User fills username and password
    await page.waitForSelector("#loginFrm_loginname", { timeout: 10000 });
    await page.locator("#loginFrm_loginname").fill(loginName);
    console.log("- User fills login name of the just registered user:",loginName); // ok

    await page.locator("#loginFrm_password").fill(password);
    console.log("- User fills password of the just registered user:",password); // ok

    // Click "Login"
    await page.locator("#loginFrm > fieldset > button").click(); 
    console.log("- User clicks login"); // ok

    // "Login" button leads to "My account" page
    await page.waitForURL("https://automationteststore.com/index.php?rt=account/account");


    // Locates the "Welcome" element using the specified CSS selector
    const welcome = page.locator("#customer_menu_top > li > a > div"); 

    // Verifies that the element's text is "Welcome back " followed by the value of the variable firstName (string interpolation)
    await expect(welcome).toHaveText(`Welcome back ${firstName}`);

    console.log("- Customer menu top says: " + `Welcome back ${firstName}`);

    console.log("AC5: Passes");

    });
    
        // 6. The user must be able to add a random special offer to the cart and successfully complete the purchase.
        test("AC6: User should successfully add special offers to the cart", async ({ page }) => {

        // fs module (File System) with the synchronous method (readFileSync) reads and converts the data from the "credentials.json" file into a JavaScript object.
        const json = JSON.parse(fs.readFileSync("credentials.json","utf-8")); 
        const loginName = json["loginName"];
        const password = json["password"];
        const firstName = json["firstName"];

        // Navigate automationteststore
        await page.goto("https://automationteststore.com/");

        // Waits until the page finishes loading
        await page.waitForLoadState("networkidle"); 

        // Access login
        await page.locator("#main_menu_top > li:nth-child(2) > a > span").click();
        console.log("- User clicks account"); // ok

        // User fills username and password
        await page.waitForSelector("#loginFrm_loginname", { timeout: 10000 });
        await page.locator("#loginFrm_loginname").fill(loginName);
        console.log("- User fills login name of the just registered user:",loginName); // ok

        await page.locator("#loginFrm_password").fill(password);
        console.log("- User fills password of the just registered user:",password); // ok

        // Click "Login"
        await page.locator("#loginFrm > fieldset > button").click(); 
        console.log("- User clicks login"); // ok

        // "Login" button leads to "My account" page
        await page.waitForURL("https://automationteststore.com/index.php?rt=account/account");


        // Hover Home button
        await page.locator("#categorymenu > nav > ul > li:nth-child(1) > a").hover();

        // Click in Special offers
        await page.locator("#main_menu > li:nth-child(1) > a").click();

        await page.waitForURL("https://automationteststore.com/index.php?rt=product/special");
        console.log("- User navigates to Special Offers");


        // A. Select a Random Special Offer
        // A. 1. all the add to cart buttons:
        const addToCartButtons = await page.locator('.pricetag [title="Add to Cart"]').all(); //  See all the 'Add to cart' buttons that exist
        if (addToCartButtons.length === 0) {
        console.log("No special offers available!");
        return;
        };

        // A. 2. Choose a Random Special Offer
        // const randomIndex = Math.floor(Math.random() * addToCartButtons.length);
        const randomButton = addToCartButtons[0];

        // A. 3. wait that buttons are visible
        await randomButton.scrollIntoViewIfNeeded({ timeout: 60000 });
        await page.waitForTimeout(1000); // Espera breve para estabilidad

        await expect(randomButton).toBeVisible({ timeout: 5000 });
        await expect(randomButton).toBeEnabled({ timeout: 5000 });

        // A. 4. Add a Random Special Offer
        await randomButton.click();
        console.log("- User addes a Random Special offer");

        // B. Make the Purchase
        // B. 1. Go to View Cart
        // Hover items button
        await page.locator(".topcart").hover();
        const cartIcon = page.locator(".dropdown-menu .btn-default");
        await cartIcon.scrollIntoViewIfNeeded();


        // Click on cart icon
        await expect(cartIcon).toBeVisible({ timeout: 5000 });
        await cartIcon.click();

        // Wait for the Cart URL
        await page.waitForURL("https://automationteststore.com/index.php?rt=checkout/cart");
        console.log("- User navigates to Cart");

        // B. 2. Click on Checkout
        await page.locator("#cart_checkout1").click();


        // B. 3. User sees the Checkout confirmation page

        // const checkoutConfirmationText = await page.locator("#maincontainer > div > div.col-md-9.col-xs-12.mt20 > div > h1 > span.maintext");

        const message = page.locator('text=Checkout Confirmation');
        await expect(message).toBeVisible();
        // await expect(checkoutConfirmationText).toContainText("Checkout Confirmation");

        console.log("- User sees 'Checkout Confirmation' text");


        // B. 4. Confirm Order
        // await page.pause();
        // console.log("AC6: Passes");

        });

  });


