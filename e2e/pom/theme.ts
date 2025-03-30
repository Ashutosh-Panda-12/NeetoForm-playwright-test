import { expect, Page } from "@playwright/test";
import { THEME_SELECTORS } from "../constants/selectors/theme";
import { THEME_TEXTS } from "../constants/texts/theme";
export class ThemeSelection {
  constructor(private page: Page) {}

  goToSettingsTab = () => this.page.getByTestId(THEME_SELECTORS.settingsTab).click();

  goToBuildTab = () => this.page.getByTestId(THEME_SELECTORS.buildTab).click();

  createNewTheme = async() => {
    await this.page.getByTestId(THEME_SELECTORS.addNewTheme).click();
    await this.page.getByTestId(THEME_SELECTORS.saveChangesButton).click();
    await this.page.getByRole("button", {name: THEME_TEXTS.applyTheme}).click();
  }

  addLogo = async() => {
    await this.page.getByTestId(THEME_SELECTORS.logoElement).click();
    await this.page.getByTestId(THEME_SELECTORS.imageLibraryButton).click();
    await this.page.getByTestId(THEME_SELECTORS.myImagesTab).click();
    await this.page.getByTestId(THEME_SELECTORS.firstImageTab).click();
    await this.page.getByTestId(THEME_SELECTORS.selectOriginalTab).click();
    await this.page.getByTestId(THEME_SELECTORS.uploadButton).click(); 4
    await expect(this.page.getByTestId(THEME_SELECTORS.logoImage)).toBeVisible();
  }

}
