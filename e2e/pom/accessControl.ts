import { Page } from "@playwright/test";
import { ACCESS_CONTROL_SELECTORS } from "../constants/selectors/accessControl";


export class AccessControl {

  constructor(private page: Page) {}

  goToSettingsTab =() => this.page.getByTestId(ACCESS_CONTROL_SELECTORS.settingsTab).click();

  clickAccessControlTab =() => this.page.getByTestId(ACCESS_CONTROL_SELECTORS.accessControlTab).click();

  addPassword = async(password: string) =>{
   await this.page.getByTestId(ACCESS_CONTROL_SELECTORS.securePasswordRadio).click();
   await this.page.getByTestId(ACCESS_CONTROL_SELECTORS.passwordInput).fill(password);
   await this.page.getByTestId(ACCESS_CONTROL_SELECTORS.saveChangesButton).click();
  }

  goToShareButton = () => this.page.getByTestId(ACCESS_CONTROL_SELECTORS.shareTab).click();

  async copyLink(): Promise<string> {
    await this.page.context().grantPermissions(["clipboard-read", "clipboard-write"]);

    await this.page.getByTestId(ACCESS_CONTROL_SELECTORS.copyLinkButton).click();

    const copiedText = await this.page.evaluate(async () => {
      return await navigator.clipboard.readText();
    });

    await this.page.context().clearPermissions();

    return copiedText;
  }


  goToIncognitoPage = async(copiedText: string) => {
    await this.page.goto(copiedText);
  };

  enterPassword = async(password: string) => {
    await this.page.getByTestId(ACCESS_CONTROL_SELECTORS.passwordTextField).fill(password);
    await this.page.getByTestId(ACCESS_CONTROL_SELECTORS.submitFormButton) .click();
  }

  fillForm = async(email: string) => {
    await this.page.getByTestId(ACCESS_CONTROL_SELECTORS.emailTextField).fill(email);
    await this.page.getByTestId(ACCESS_CONTROL_SELECTORS.submitButton).click();
  }

}
