import { test } from "../fixtures";
import { Page } from "@playwright/test";
import { FormInsights } from "../pom/formInsights";
import { faker } from "@faker-js/faker";

test.describe("Verify form Insights", async() => {
  let page1: Page;
  let page2: Page;
  let page3: Page;
  let newPage: FormInsights;
  let visits: number =0;
  let starts: number =0;
  let submissions: number =0;
  let completion: number =0;
  let randomEmail: string;

  test.beforeEach(async({createForm}) => {
    randomEmail= faker.internet.email();
    await test.step("Step 1: Go to website dashboard", createForm.goToWebsiteDashboard);
  });

  test("Verify form insights from a step-by-step process", async({createForm, page, formInsights}) => {
    await test.step("Step 2: Create a new form", async() => {
      await createForm.goToFormDashboard();
      await createForm.publishForm();
    });

    await test.step("Step 3: Go to submissions tab and check analytics", async() => {
      await formInsights.goToAnalytics();
      await formInsights.checkAnalytics(visits, starts, submissions, completion);
    });

    await test.step("Step 4: Open the published form and verify the visits has increased by one", async() => {
      await createForm.previewForm();
      page1 = await page.waitForEvent('popup');
      visits++;
      await page.reload();
      await formInsights.checkAnalytics(visits, starts, submissions, completion);
    });

    await test.step("Step 5: Open the form again and fill value in the email and make sure that the visits value and starts value increases by one", async() => {
      await createForm.previewForm();
      page2 = await page.waitForEvent('popup');
      visits++;
      newPage = new FormInsights(page2);
      await newPage.fillValueInEmail(randomEmail);
      starts++;
      await page.reload();
      await formInsights.checkAnalytics(visits, starts, submissions, completion);
    });

    await test.step("Open another form and complete the form and make sure that the values increment the same way", async() => {
      await createForm.previewForm();
      page3 = await page.waitForEvent('popup');
      visits++;
      newPage = new FormInsights(page3);
      await newPage.fillValueInEmail(randomEmail);
      await newPage.submitForm();
      submissions++;
      completion+=100;
      await page.reload();
      await formInsights.checkAnalytics(visits, starts, submissions, completion);
    })

  })

  test.afterEach(async({createForm}) => {
    await test.step("Delete the form", createForm.deleteForm);
  })

})
