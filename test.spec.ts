import { test, expect } from "@playwright/test";
import { fakerEN_GB as faker } from "@faker-js/faker";
import * as fs from "fs";

test.describe("Presta Shop", () => {

    // 1. User should successfully log in with valid credentials - click on account.
    test("AC1: User should successfully log in with valid credentials - click on account", async ({ page }) => {
    
    // Navigate automationteststore
    await page.goto("https://automationteststore.com/");

    // Access login

    await page.waitForLoadState("networkidle");

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
    
        // Hover account botton
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

        // Access login or register

        await page.waitForLoadState("networkidle");

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

    // 4. Register a new user
    test("AC4: User should be able to register a new account with valid details.", async ({ page }) => {

        // Navigate automationteststore
        await page.goto("https://automationteststore.com/");

        // Access login or register

        await page.waitForLoadState("networkidle");

        await page.locator("#customer_menu_top > li > a").click();
        console.log("- User clicks 'login or register' button"); // ok

        // User access Register
        await page.waitForSelector("#accountFrm > fieldset > button", { timeout: 10000 });
        await page.locator("#accountFrm > fieldset > button").click();

        console.log("- User clicks continue button"); //ok

        await page.waitForLoadState('networkidle');
        await page.waitForSelector("#AccountFrm_firstname", { state: 'visible' });

        // Fill with a random name
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();

        await page.locator("#AccountFrm_firstname").fill(firstName);
        await page.locator("#AccountFrm_firstname").fill(lastName);

        console.log("- User firstname:",firstName); 
        console.log("- User lastName:",lastName); 

        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@sharklasers.com`;

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
        const loginName = `${firstName.toLowerCase()}${lastName.toLowerCase()}`;
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
        console.log("- A new user was registered"); // ok

        console.log("AC4: Passes");

        fs.writeFileSync("credentials.json", JSON.stringify({ loginName, password }));

    });

    // 5. User should successfully log in with valid credentials - click on account.
    test("AC5: User should successfully log in with valid credentials - click on account", async ({ page }) => {
    
        const json = JSON.parse(fs.readFileSync("credentials.json","utf-8"));
        const loginName = json["loginName"];
        const password = json["password"];

        // Navigate automationteststore
        await page.goto("https://automationteststore.com/");
    
        // Access login
    
        await page.waitForLoadState("networkidle");
    
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
    
        console.log("AC5: Passes");
      
        });

  });
  