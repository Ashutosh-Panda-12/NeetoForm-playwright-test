import { test } from "../fixtures";
import { faker } from "@faker-js/faker";
import { AccessControl } from "../pom/accessControl";
import { Page } from "@playwright/test";

test.describe("Verify access control of the form", async() => {

  let randomPassword: string;
  let newPage: Page;
  let incognitoPagePOM: AccessControl;
  let email: string;
  let copiedLink: string;

  test.beforeEach(async({createForm}) => {
    randomPassword = faker.internet.password();
    email = faker.internet.email();
    await test.step("Step 1: Go to the website dashboard", createForm.goToWebsiteDashboard);
    await test.step("Steo 2: Go to the form dashboard", createForm.goToFormDashboard);
    await test.step("Step 3: Publish the form", createForm.publishForm);
  });

  test("Verify access control of the form using a step by step method", async({ accessControl, browser, page }) => {
    await test.step("Step 4: Go to the settings tab and set a new password", async() => {
      await accessControl.goToSettingsTab();
      await accessControl.clickAccessControlTab();
      await accessControl.addPassword(randomPassword);
      await accessControl.goToShareButton();
      copiedLink = await accessControl.copyLink();
    });

    await test.step("Step 5: Click on a new user context", async() => {
      const newContext = await browser.newContext({storageState: {cookies: [], origins: []}});
      newPage = await newContext.newPage();
      incognitoPagePOM = new AccessControl(newPage);
    })

    await test.step("Step 6: Fill the form", async() => {
      await incognitoPagePOM.goToIncognitoPage(copiedLink);
      await incognitoPagePOM.enterPassword(randomPassword);
      await incognitoPagePOM.fillForm(email);
      newPage.close();
    })
  })

  test.afterEach(async({createForm}) => {
    await test.step("Step 7: Delete the form", createForm.deleteForm);
  })

})
