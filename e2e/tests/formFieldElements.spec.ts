import { expect, Page } from "@playwright/test";
import { test } from "../fixtures";
import { FORM_FIELD_SELECTORS } from "../constants/selectors/formField";
import { FormFieldElements } from "../pom/formFieldElements";
import { CREATE_FORM_SELECTORS } from "../constants/selectors/createForm";


test.describe("Customize field form elements", async() => {
  let page1: Page;
  let page2: Page;
  let newPage: FormFieldElements;
  let originalArr =[
    "Option 1, Option 2, Option 3, Option 4, Option 5, Option 6, Option 7, Option 8, Option 9, Option 10"
  ];

  test.beforeEach(async({createForm}) => {
    await test.step("Step 1: Go to the dashboard page", createForm.goToWebsiteDashboard);
  })

  test("Customize field form elements using a step-by-step process", async({createForm, formFieldElements, page}) => {
    await test.step("Step 2: Go to the form dashboard", createForm.goToFormDashboard);

    await test.step("Step 3: Add single choice elements", formFieldElements.addSingleChoiceElements);

    await test.step("Step 4: Add multiple choice elements", formFieldElements.addMultipleChoiceElements);

    await test.step("Step 5: Add options to multiple choice", async() => {
      await formFieldElements.clickMultiChoiceButton();
      await formFieldElements.addOptionsForMultipleChoice();
      await expect(page.getByTestId(FORM_FIELD_SELECTORS.multipleChoiceOption)).toHaveCount(10);
    });

    await test.step("Step 7: Add options to the single choice element", async() => {
      await formFieldElements.clickSingleChoiceButton();
      await formFieldElements.addOptionsForSingleChoice();
      await expect(page.getByTestId(FORM_FIELD_SELECTORS.singleOptionContainer)).toHaveCount(10);
    });

    await test.step("Step 9: Publish and preview the form", async() => {
      await createForm.publishForm();
      await createForm.previewForm();
      page1 = await page.waitForEvent('popup');
      newPage = new FormFieldElements(page1);
    });


    await test.step("Step 10: Ensure that single options are randomized",() => newPage.isRandomized(originalArr));

    await test.step("Step 11: Ensure multiple choice options are hidden",() => newPage.isHidden());

    await test.step("Step 12: Uncheck the hide option and publish and preview the form", formFieldElements.clickMultiChoiceButton);

    await test.step("Step 13: Unhide the form", formFieldElements.hideQuestion);

    await test.step("Step 14: Fill the form", async() => {
      await createForm.publishForm();
      await createForm.previewForm();
      page2 = await page.waitForEvent('popup');
      newPage = new FormFieldElements(page2);
    })

    await test.step("Step 15: Verify that multi-choice element is visible",() => formFieldElements.isVisible());

  })

  test.afterEach(async({createForm}) => {
    await test.step("Step 16::  Delete the form", createForm.deleteForm);
  })

})
