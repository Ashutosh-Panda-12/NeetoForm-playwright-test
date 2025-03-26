import { expect, Page } from "@playwright/test";
import { FORM_FIELD_SELECTORS } from "../constants/selectors/formField";
import { FORM_FIELD_TEXT } from "../constants/texts/formField";
import { CREATE_FORM_SELECTORS } from "../constants/selectors/createForm";

export class FormFieldElements {

  constructor(private page: Page) {};

  addSingleChoiceElements = () => this.page.getByTestId(FORM_FIELD_SELECTORS.singleChoiceElement).click();


  addMultipleChoiceElements = () => this.page.getByRole("button", {name: FORM_FIELD_TEXT.multiChoice}).click();

  clickSingleChoiceButton =() => this.page.getByTestId(FORM_FIELD_SELECTORS.multipleChoicePreviewGroup).getByTestId(FORM_FIELD_SELECTORS.singleChoiceOptionsContainer).click();

  addOptionsForSingleChoice = async () => {
    const client = await this.page.context().newCDPSession(this.page);

    await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      latency: 1000,
      downloadThroughput: 500 * 1024,
      uploadThroughput: 500 * 1024,
    });

    await this.page.getByTestId(FORM_FIELD_SELECTORS.bulkOptionsLink).click();
    await this.page.getByTestId(FORM_FIELD_SELECTORS.bulkOptionsTextarea).fill(FORM_FIELD_TEXT.optionsList);
    await this.page.getByTestId(FORM_FIELD_SELECTORS.bulkSubmitButton).click();

    await this.page.getByTestId(FORM_FIELD_SELECTORS.choicesCard).getByTestId(FORM_FIELD_SELECTORS.spinner).waitFor({ state: "visible" });
    await this.page.getByTestId(FORM_FIELD_SELECTORS.choicesCard).getByTestId(FORM_FIELD_SELECTORS.spinner).waitFor({ state: "hidden" });

    await client.send('Emulation.setCPUThrottlingRate', { rate: 1 });
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      latency: 0,
      downloadThroughput: -1,
      uploadThroughput: -1,
    });

    await this.randomizeOptions();
  };

  addOptionsForMultipleChoice = async() =>{
    const client = await this.page.context().newCDPSession(this.page);

    await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      latency: 1000,
      downloadThroughput: 500 * 1024,
      uploadThroughput: 500 * 1024,
    });

    await this.page.getByTestId(FORM_FIELD_SELECTORS.bulkOptionsLink).click();
    await this.page.getByTestId(FORM_FIELD_SELECTORS.bulkOptionsTextarea).fill(FORM_FIELD_TEXT.optionsList);
    await this.page.getByTestId(FORM_FIELD_SELECTORS.bulkSubmitButton).click();

    await expect(this.page.getByTestId(CREATE_FORM_SELECTORS.publishButton)).toBeDisabled();
    await expect(this.page.getByTestId(CREATE_FORM_SELECTORS.publishButton)).toBeEnabled();

    await client.send('Emulation.setCPUThrottlingRate', { rate: 1 });
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      latency: 0,
      downloadThroughput: -1,
      uploadThroughput: -1,
    });
    await this.hideQuestion();
   }

  randomizeOptions =() => this.page.getByTestId(FORM_FIELD_SELECTORS.randomizeLabel).click();

  clickMultiChoiceButton = () => this.page.getByTestId(FORM_FIELD_SELECTORS.multipleChoicePreviewGroup).getByTestId(FORM_FIELD_SELECTORS.multipleChoiceOptionsContainer).click();

  hideQuestion =() => this.page.getByTestId(FORM_FIELD_SELECTORS.hideQuestion).click();

  isRandomized = async( originalArr) => {
    const displayedArr = await this.page.getByTestId(FORM_FIELD_SELECTORS.singleChoiceOptionsContainer).allTextContents();
    const isRandomized = JSON.stringify(displayedArr) !==JSON.stringify(originalArr);
    await expect(isRandomized).toBeTruthy();
  }

  isHidden = () => expect(this.page.getByTestId(FORM_FIELD_SELECTORS.multipleChoiceOptionsContainer)).toBeHidden();
  isVisible = () => expect(this.page.getByTestId(FORM_FIELD_SELECTORS.multipleChoiceOptionsContainer)).toBeVisible();

}
