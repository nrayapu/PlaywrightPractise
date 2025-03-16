const{test,expect} = require('@playwright/test')

test('TC_01-OrangeHRM Login & Logout Test', async ({ page }) => {
  // Open the OrangeHRM login page
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  // Wait for the login form to be visible
  await page.waitForSelector('input[name="username"]');

  // Enter Username and Password
  await page.fill('input[name="username"]', 'Admin');
  await page.fill('input[name="password"]', 'admin123');

  // Click the Login button
  await page.click('button[type="submit"]');

  // Wait for the dashboard to load
  await page.waitForURL(/.*dashboard.*/);

  // Verify successful login
  await expect(page).toHaveURL(/.*dashboard.*/);
  console.log("✅ Login successful!");

  // Click on the profile dropdown (User menu)
  await page.click('p.oxd-userdropdown-name');

  // Click on the Logout option
  await page.click('a[href="/web/index.php/auth/logout"]');

  // Wait for the login page to reappear
  await page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  // Verify successful logout
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  console.log("✅ Logout successful!");
});


test('TC_02-OrangeHRM Login & Navigate to Time Page', async ({ page }) => {
  // Open the OrangeHRM login page
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  // Wait for the login form to be visible
  await page.waitForSelector('input[name="username"]');

  // Enter Username and Password
  await page.fill('input[name="username"]', 'Admin');
  await page.fill('input[name="password"]', 'admin123');

  // Click the Login button
  await page.click('button[type="submit"]');

  // Wait for the dashboard to load
  await page.waitForURL(/.*dashboard.*/);

  // Verify successful login
  await expect(page).toHaveURL(/.*dashboard.*/);
  console.log("✅ Login successful!");

  // Click on the "Time" tab in the left menu
  await page.click('a[href="/web/index.php/time/viewTimeModule"]');

  // Wait for the Time page to load
  await page.waitForURL(/.*time.*/);

  // Verify navigation to the Time page
  await expect(page).toHaveURL(/.*time.*/);
  console.log("✅ Navigated to Time Page successfully!");
});

test('TC_03-OrangeHRM Login & Navigate to Performance Page', async ({ page }) => {
  // Open the OrangeHRM login page
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  // Wait for the login form to be visible
  await page.waitForSelector('input[name="username"]');

  // Enter Username and Password
  await page.fill('input[name="username"]', 'Admin');
  await page.fill('input[name="password"]', 'admin123');

  // Click the Login button
  await page.click('button[type="submit"]');

  // Wait for the dashboard to load
  await page.waitForURL(/.*dashboard.*/);

  // Verify successful login
  await expect(page).toHaveURL(/.*dashboard.*/);
  console.log("✅ Login successful!");

  // Click on the "Performance" tab in the left menu
  await page.click('a[href="/web/index.php/performance/viewPerformanceModule"]');

  // Wait for the Performance page to load
  await page.waitForURL(/.*performance.*/);

  // Verify navigation to the Performance page
  await expect(page).toHaveURL(/.*performance.*/);
  console.log("✅ Navigated to Performance Page successfully!");
});

test('TC_04-OrangeHRM Login, Navigate to Time & Buzz, Post Message', async ({ page }) => {
  // Step 1: Open the OrangeHRM login page
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  // Step 2: Wait for login fields and enter credentials
  await page.fill('input[name="username"]', 'Admin');
  await page.fill('input[name="password"]', 'admin123');

  // Step 3: Click the login button
  await page.click('button[type="submit"]');

  // Step 4: Wait for dashboard to load and verify successful login
  await page.waitForURL(/.*dashboard.*/);
  console.log("✅ Successfully logged in!");

  // Step 5: Navigate to "Time" page
  await page.click('a[href="/web/index.php/time/viewTimeModule"]');
  await page.waitForURL(/.*time.*/);
  console.log("✅ Successfully navigated to Time page!");

  // Step 6: Navigate to "Buzz" page
  await page.click('a[href="/web/index.php/buzz/viewBuzz"]');
  await page.waitForURL(/.*buzz.*/);
  console.log("✅ Successfully navigated to Buzz page!");

  // Step 7: Post a message "Naveen First Test"
  await page.waitForSelector('[placeholder="What\'s on your mind?"]'); 
  await page.getByPlaceholder("What's on your mind?").fill("admin123");
  await page.waitForSelector('button[type="submit"]');
  await page.click('button[type="submit"]');

  // Step 8: Wait for the message to appear in the Buzz feed

  await page.waitForSelector('p:has-text("admin123")');
  console.log("✅ Successfully posted message: 'admin123'!");

});

test.only('TC_05-OrangeHRM Login, Navigate to Time & Buzz, Post Message,Like and comment', async ({ page }) => {
  // Step 1: Open the OrangeHRM login page
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  // Step 2: Wait for login fields and enter credentials
  await page.fill('input[name="username"]', 'Admin');
  await page.fill('input[name="password"]', 'admin123');

  // Step 3: Click the login button
  await page.click('button[type="submit"]');

  // Step 4: Wait for dashboard to load and verify successful login
  await page.waitForURL(/.*dashboard.*/);
  console.log("✅ Successfully logged in!");

  // Step 5: Navigate to "Time" page
  await page.click('a[href="/web/index.php/time/viewTimeModule"]');
  await page.waitForURL(/.*time.*/);
  console.log("✅ Successfully navigated to Time page!");

  // Step 6: Navigate to "Buzz" page
  await page.click('a[href="/web/index.php/buzz/viewBuzz"]');
  await page.waitForURL(/.*buzz.*/);
  console.log("✅ Successfully navigated to Buzz page!");

  // Step 7: Post a message "Naveen First Test"
  await page.waitForSelector('[placeholder="What\'s on your mind?"]'); 
  await page.getByPlaceholder("What's on your mind?").fill("admin123");
  await page.waitForSelector('button[type="submit"]');
  await page.click('button[type="submit"]');

  // Step 8: Wait for the message to appear in the Buzz feed

  await page.waitForSelector('p:has-text("admin123")');
  console.log("✅ Successfully posted message: 'admin123'!");

  // Step 9: Like the Latest Post?????********
 

  
  // Step 10: Comment "I love it"
    await page.waitForSelector('.comment-button');
    await page.click('.comment-button');
    await page.fill('.comment-input', 'I love it'); // 🔹 Adjust selector
    await page.press('.comment-input', 'Enter'); // ✅ Submit comment

    // ✅ Done!
    console.log("Successfully completed all actions!");
    await page.waitForTimeout(5000); // Pause to verify actions before closing
    await browser.close();

});