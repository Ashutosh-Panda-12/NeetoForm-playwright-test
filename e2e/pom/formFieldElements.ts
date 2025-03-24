import { expect, Page } from "@playwright/test";
import { FORM_FIELD_SELECTORS } from "../constants/selectors/formField";
import { FORM_FIELD_TEXT } from "../constants/texts/formField";

export class FormFieldElements {

  constructor(private page: Page) {};

  addSingleChoiceElements = async() => {
    await this.page.getByTestId(FORM_FIELD_SELECTORS.singleChoiceElement).click();
  }

  addMultipleChoiceElements = async() => {
    await this.page.getByRole("button", {name: FORM_FIELD_TEXT.multiChoice}).click();
  }

  clickSingleChoiceButton =() => this.page.getByTestId(FORM_FIELD_SELECTORS.multipleChoicePreviewGroup).getByTestId(FORM_FIELD_SELECTORS.singleChoiceOptionsContainer).click();

  addOptionsForSingleChoice = async() =>{
   await this.page.getByTestId(FORM_FIELD_SELECTORS.bulkOptionsLink).click();
   await this.page.getByTestId(FORM_FIELD_SELECTORS.bulkOptionsTextarea).fill(FORM_FIELD_TEXT.optionsList);
   await this.page.getByTestId(FORM_FIELD_SELECTORS.bulkSubmitButton).waitFor();
   await this.page.getByTestId(FORM_FIELD_SELECTORS.bulkSubmitButton).click();
  //  await expect(this.page.getByTestId(FORM_FIELD_SELECTORS.multipleChoiceOption)).toHaveCount(10);
  }

  addOptionsForMultipleChoice = async() =>{
    await this.page.getByTestId(FORM_FIELD_SELECTORS.bulkOptionsLink).click();
    await this.page.getByTestId(FORM_FIELD_SELECTORS.bulkOptionsTextarea).fill(FORM_FIELD_TEXT.optionsList);
    await this.page.getByTestId(FORM_FIELD_SELECTORS.bulkSubmitButton).click();
    // await expect(this.page.getByTestId(FORM_FIELD_SELECTORS.multipleChoiceOption)).toHaveCount(10);
   }

  randomizeOptions =() => this.page.getByTestId(FORM_FIELD_SELECTORS.randomizeLabel).click();

  clickMultiChoiceButton = () => this.page.getByTestId(FORM_FIELD_SELECTORS.multipleChoicePreviewGroup).getByTestId(FORM_FIELD_SELECTORS.multipleChoiceOptionsContainer).click();

  hideQuestion =() =>{
    this.page.getByTestId(FORM_FIELD_SELECTORS.hideQuestion).click();
    console.log("Done");
  }

  isRandomized = async( originalArr) => {
    const displayedArr = await this.page.getByTestId(FORM_FIELD_SELECTORS.singleChoiceOptionsContainer).allTextContents();
    const isRandomized = JSON.stringify(displayedArr) !==JSON.stringify(originalArr);
    await expect(isRandomized).toBeTruthy();
  }

  isHidden = () => expect(this.page.getByTestId(FORM_FIELD_SELECTORS.multipleChoiceOptionsContainer)).toBeHidden();
  isVisible = () => expect(this.page.getByTestId(FORM_FIELD_SELECTORS.multipleChoiceOptionsContainer)).toBeVisible();

}
