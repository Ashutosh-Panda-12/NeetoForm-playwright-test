import { Page } from "@playwright/test";
import { test } from "../fixtures";
import { faker } from "@faker-js/faker";
import { UniqueSubmission } from "../pom/uniqueSubmissions";
import { CreateForm } from "../pom/createForm";

test.describe("Verify unqique submissions in the NeetoForm", async() => {
  let page1: Page;
  let page2: Page;
  let newPage: UniqueSubmission;
  let newPagePOM: CreateForm;
  let randomEmail: string;
  test.beforeEach(async({createForm}) => {
    randomEmail = faker.internet.email();
    await test.step("Step 1: Go to the website dashboard", createForm.goToWebsiteDashboard);
    await test.step("Step 2: Go to the form dashboard", createForm.goToFormDashboard);
    await test.step("Step 3: Publish the form", createForm.publishForm);
  });

  test("Verify unique submissions in the NeetoForm using a step-by-step method", async({accessControl, uniqueSubmissions, createForm, page}) => {
    await test.step("Step 4: Go to the settings tab", accessControl.goToSettingsTab);

    await test.step("Step 5: Ensure unique submissions are used", async() => {
      await uniqueSubmissions.preventDuplicateSubmissions();
      await uniqueSubmissions.useCookiesRadio();
    })

    await test.step("Step 6: Ensure one cannot fill the same form twice", async() => {
      await createForm.previewForm();
      page1 = await page.waitForEvent('popup');
      newPage = new UniqueSubmission(page1);
      newPagePOM = new CreateForm(page1);
      await newPage.fillForm(randomEmail);
      await newPagePOM.verifyThankYouMessage();
      await createForm.previewForm();
      page2 = await page.waitForEvent('popup');
      newPage = new UniqueSubmission(page2);
      await newPage.alreadySubmittedWarning();
    })
  })

  test.afterEach(async({createForm}) => {
    await test.step("Delete the form", createForm.deleteForm);
  })

})
