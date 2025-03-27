import {Page, expect} from "@playwright/test";
import { UNIQUE_SUBMISSIONS_SELECTOR } from "../constants/selectors/uniqueSubmissions";
import { ACCESS_CONTROL_SELECTORS } from "../constants/selectors/accessControl";

export class UniqueSubmission {

  constructor(private page: Page) {}

  preventDuplicateSubmissions = () => this.page.getByTestId(UNIQUE_SUBMISSIONS_SELECTOR.preventDuplicateSubmissionsLink).click();

  useCookiesRadio = async() =>{
   await this.page.getByTestId(UNIQUE_SUBMISSIONS_SELECTOR.useCookies).click();
   await this.page.getByTestId(UNIQUE_SUBMISSIONS_SELECTOR.saveChangesButton).click();
  }

  alreadySubmittedWarning = () => expect(this.page.getByTestId(UNIQUE_SUBMISSIONS_SELECTOR.alreadySubmittedWarning)).toBeVisible();

  fillForm = async(email: string) => {
      await this.page.getByTestId(ACCESS_CONTROL_SELECTORS.emailTextField).fill(email);
      await this.page.getByTestId(UNIQUE_SUBMISSIONS_SELECTOR.submitButton).click();
  }


}
