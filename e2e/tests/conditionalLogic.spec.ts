import { Page } from "@playwright/test";
import {test} from "../fixtures/";
import { ConditionalLogic } from "../pom/conditionalLogic";

test.describe("Apply conditional logic to the NeetoForm", async() => {
  let page1: Page;
  let newPage: ConditionalLogic;
  test.beforeEach(async({createForm}) => {
    await test.step("Step 1: Go to the website dashboard", createForm.goToWebsiteDashboard);
    await test.step("Step 2: Go to the form dashboard", createForm.goToFormDashboard);
  });

  test("Apply conditional logic in a step-by-step manner", async({conditionalLogic, accessControl, createForm, page}) => {
    await test.step("Step 3: Add a single choice element and keep it above the email address",async() => {
      await conditionalLogic.addSingleChoiceElement();
      await conditionalLogic.makeSingleChoiceAsTheFirstElement();
    });

    await test.step("Step 4: Delete two options from the single choice options", async() => {
      for(let i=0;i<2;i++){
        await conditionalLogic.removeOptionsFromSingleChoice();
      }
      await conditionalLogic.renameOptions();
    });

    await test.step("Step 5: Go to the conditional tab card and assign some conditions", async() => {
      await accessControl.goToSettingsTab();
      await conditionalLogic.createNewCondition();
    });

    await test.step("Step 6: Publish and preview the form", async() => {
      await createForm.publishForm();
      await createForm.previewForm();
      page1 = await page.waitForEvent('popup');
      newPage = new ConditionalLogic(page1);
    });

    await test.step("Step 7: Verify that email address is only shown when the option is clicked as yes", async() => {
      await newPage.checkIfVisibleOnClickingYes();
      await page1.close();
      await createForm.previewForm();
      page1 = await page.waitForEvent('popup');
      newPage = new ConditionalLogic(page1);
      await newPage.checkIfVisibleOnClickingYes();
    })

  })

  test.afterEach(async({createForm}) => {
    await test.step("Step 8: Delete the form", createForm.deleteForm);
  })

})
