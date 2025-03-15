const{test,expect} = require('@playwright/test')

test("Verify Application Title1",async function ({page}){

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    await page.getByPlaceholder("Username").fill("Admin",{delay:100})
    await page.locator("input[placeholder='Password']").fill("admin123",{delay:100})
    page.locator("button[type='submit']").click
    await expect(page).toHaveURL(/.*login.*/);
   
})

test.only("Verify Application link2",async function ({page}){

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    await page.getByPlaceholder("username").pressSequentially("Admin")
    await page.getByPlaceholder("password").pressSequentially("admin123")
    page.locator("button[type='submit']").click()
    await page.waitForTimeout(5000)
    await expect(page).toHaveURL(/.*dashboard.*/);
    //await expect(page).toHaveScreenshot();
    await page.getByAltText("profile picture").first().click()
    await page.getByText("Logout").click()
    await page.waitForTimeout(5000)
    //await expect(page).toHaveURL(/.*login./);
    await expect(page).toHaveURL(/.*\/login$/);
})