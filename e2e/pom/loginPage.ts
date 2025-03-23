import {expect, Page} from "@playwright/test";
import { STORAGE_STATE } from "../constants/common";
import { LOGIN_SELECTORS } from "../constants/selectors/loginPage";


export class LoginPage {

  constructor(private page: Page) {}

  loginToWebsite= async() => {
    await this.page.goto("/");
    await this.page.getByTestId(LOGIN_SELECTORS.loginEmailField).fill(process.env.LOGIN_EMAIL!);
    await this.page.getByTestId(LOGIN_SELECTORS.loginPasswordField).fill(process.env.LOGIN_PASSWORD!);
    await this.page.getByTestId(LOGIN_SELECTORS.submitButton).click();
    await this.page.context().storageState({ path: STORAGE_STATE });
  }

  verifyLogin = expect(this.page.getByTestId(LOGIN_SELECTORS.profileAvatar)).toBeVisible;
  
}
