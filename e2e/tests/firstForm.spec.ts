import { Page } from "@playwright/test";
import { test } from "../fixtures";
import { faker } from "@faker-js/faker";
import { CreateForm } from "../pom/createForm";

test.describe("Create a new form", async() => {

  let page1: Page;
  let page2: Page;
  let randomNumber: string;
  let randomEmail: string;
  let firstName: string;
  let lastName: string;
  let randomName: string;
  let newPage: CreateForm;

  test.beforeEach(({createForm}) =>{
    randomName = faker.person.fullName();
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    randomNumber = faker.number.bigInt().toString();
    randomEmail = faker.internet.email();
    test.step("Step 1: Go to the dashboard page", createForm.goToWebsiteDashboard);
  });

  test("Create a new form using a step-by-step process", async({createForm, page}) => {
    await test.step("Step 2: Go to the form dashboard", createForm.goToFormDashboard);

    await test.step("Step 3: Add elements to the form", createForm.addElementsToTheForm);

    await test.step("Step 4: Publish the form", async() => {
      await createForm.publishForm();
      await createForm.previewForm();
      page1 = await page.waitForEvent('popup');
      newPage = new CreateForm(page1);
    })

    await test.step("Step 5: Check if all the fields are visible",() => newPage.checkIfFieldsAreVisible());

    await test.step("Step 6: Make sure that the fields show error when filled invalid emails or phone numbers",() => newPage.checkIfInvalidValuesAreChecked(randomName, randomNumber));

    await test.step("Step 7: Click the form button without a and make sure that all the fields show error", async() => {
      await createForm.previewForm();
      page2 = await page.waitForEvent('popup');
      newPage = new CreateForm(page2);
      await newPage.submitFormButton();
      await newPage.checkErrorsAreBeingShown();
    });

    await test.step("Step 8: Fill the form with valid credentials and submit the form", async() => {
      await newPage.fillTheFormUsingSuitableValues(randomEmail, firstName, lastName);
      await newPage.submitFormButton();
      await newPage.verifyThankYouMessage();
      await createForm.goToSubmissions();
      await createForm.verifySubmissions();
    })
  })

  test.afterEach(async({createForm}) => {
    await test.step("Step 9: Delete the form", createForm.deleteForm);
  })

})
