import { expect, Page, test } from "@playwright/test";
import { routes } from "../constants/routes";
import { CREATE_FORM_SELECTORS } from "../constants/selectors/createForm";
import { CREATE_FORM_TEXTS } from "../constants/texts/createForm";

export class CreateForm {

  constructor(private page: Page) {}

  goToWebsiteDashboard = () => this.page.goto(routes.goToDashboard);

  goToFormDashboard = async() => {
    await this.page.getByTestId('add-form-button').click();
    await this.page.getByTestId('start-from-scratch-button').click();
  }

  addElementsToTheForm = async() => {
    await this.page.getByTestId(CREATE_FORM_SELECTORS.elementsContainer).getByTestId(CREATE_FORM_SELECTORS.fullNameElement).click();
    await this.page.reload();
    await this.page.getByTestId(CREATE_FORM_SELECTORS.elementsContainer).getByTestId(CREATE_FORM_SELECTORS.phoneNumberElement).click();
  }

  publishForm =() => this.page.getByTestId(CREATE_FORM_SELECTORS.publishButton).click();

  previewForm =() => this.page.getByTestId(CREATE_FORM_SELECTORS.publishPreviewButton).click();

  checkIfFieldsAreVisible = async({page}:{page: Page}) => {
    await Promise.all([
      expect(page.getByTestId(CREATE_FORM_SELECTORS.emailGroup)).toBeVisible(),
      expect(page.getByTestId(CREATE_FORM_SELECTORS.fullNameGroup)).toBeVisible(),
      expect(page.getByTestId(CREATE_FORM_SELECTORS.phoneNumberGroup)).toBeVisible(),
      expect(page.getByTestId(CREATE_FORM_SELECTORS.submitButton)).toBeVisible(),
    ]);
  }

  checkIfInvalidValuesAreChecked = async({page}: {page: Page}, randomName, randomNumber) => {
    await page.getByTestId(CREATE_FORM_SELECTORS.emailTextField).fill(randomName);
    await page.getByTestId(CREATE_FORM_SELECTORS.phoneNumberInputField).fill(randomNumber);
    await page.getByTestId(CREATE_FORM_SELECTORS.startOrSubmitButton).click();
    await expect(page.getByTestId(CREATE_FORM_SELECTORS.emailGroup).getByTestId(CREATE_FORM_SELECTORS.formErrorText)).toBeVisible();
    await expect(page.getByTestId(CREATE_FORM_SELECTORS.phoneGroup).getByTestId(CREATE_FORM_SELECTORS.formErrorText)).toBeVisible();
  }

  submitFormButton = ({page}: {page: Page}) => page.getByTestId(CREATE_FORM_SELECTORS.startOrSubmitButton).click();

  checkErrorsAreBeingShown = async({page}: {page: Page}) => {
    await Promise.all([
      expect(page.getByTestId(CREATE_FORM_SELECTORS.emailGroup).getByTestId(CREATE_FORM_SELECTORS.formErrorText)).toBeVisible(),
      expect(page.getByTestId(CREATE_FORM_SELECTORS.fullNameFields).getByTestId(CREATE_FORM_SELECTORS.formErrorText).filter({hasText: CREATE_FORM_TEXTS.firstName})).toBeVisible(),
      expect(page.getByRole("paragraph").filter({hasText: CREATE_FORM_TEXTS.lastName})).toBeVisible(),
      expect(page.getByTestId(CREATE_FORM_SELECTORS.phoneGroup).getByTestId(CREATE_FORM_SELECTORS.formErrorText)).toBeVisible(),
    ]);
  }

  fillTheFormUsingSuitableValues = async({page}: {page: Page}, randomEmail: string, firstName: string, lastName: string) => {
    await page.getByTestId(CREATE_FORM_SELECTORS.emailTextField).fill(randomEmail);
    await page.getByTestId(CREATE_FORM_SELECTORS.firstNameTextField).fill(firstName);
    await page.getByTestId(CREATE_FORM_SELECTORS.lastNameTextField).fill(lastName);
    await page.getByTestId(CREATE_FORM_SELECTORS.phoneNumberInputField).fill(CREATE_FORM_TEXTS.phoneNumberInput);
  }

  verifyThankYouMessage = ({page}: {page: Page}) => expect(page.getByTestId(CREATE_FORM_SELECTORS.thankYouMessage)).toBeVisible();

  verifySubmissions = async() => {
    await this.page.getByTestId(CREATE_FORM_SELECTORS.submissionsTab).click();
    await expect(this.page.getByTestId(CREATE_FORM_SELECTORS.submissionCountLabel)).toHaveText(CREATE_FORM_TEXTS.singleElementText);
  }

  deleteForm = async() => {
    await this.page.getByTestId(CREATE_FORM_SELECTORS.navigationHeaderBlock).getByTestId(CREATE_FORM_SELECTORS.dropdownIcon).click();
    await this.page.getByTestId(CREATE_FORM_SELECTORS.formDeleteButton).click();
    await this.page.getByTestId(CREATE_FORM_SELECTORS.deleteCheckbox).click();
    await this.page.getByTestId(CREATE_FORM_SELECTORS.deleteButton).click();
  }

}
