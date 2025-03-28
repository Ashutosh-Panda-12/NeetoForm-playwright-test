import {  expect, Page } from "@playwright/test";
import { CONDITIONAL_LOGIC_SELECTORS } from "../constants/selectors/conditionalLogic";
import { CONDITIONAL_LOGIC_TEXTS } from "../constants/texts/conditionalLogic";

export class ConditionalLogic {
  constructor(private page: Page) {}

  addSingleChoiceElement =() => this.page.getByTestId(CONDITIONAL_LOGIC_SELECTORS.singleChoiceElement).click();

  makeSingleChoiceAsTheFirstElement = async () => {
    await this.page.getByTestId(CONDITIONAL_LOGIC_SELECTORS.summaryButton).click();

    const source = await this.page.getByRole("button", { name: CONDITIONAL_LOGIC_TEXTS.emailAddress });
    const target = await this.page.getByRole("button", { name: CONDITIONAL_LOGIC_TEXTS.singleChoiceOption });

    await source.waitFor({state: "visible"});
    await target.waitFor({state: "visible"});

    const sourceBox = await source.boundingBox();
    const targetBox = await target.boundingBox();

    if (!sourceBox || !targetBox) {
        throw new Error("Source or Target bounding box not found!");
    }

    await this.page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + targetBox.height / 2);
    await this.page.mouse.down();

    const targetX = sourceBox.x + sourceBox.width / 2;
    const targetY = sourceBox.y - 20;

    await this.page.mouse.move(targetX, targetY, { steps: 5 });
    await this.page.mouse.up();
  };



  removeOptionsFromSingleChoice =async() =>{
   await this.page.getByTestId(CONDITIONAL_LOGIC_SELECTORS.singleChoiceOptionContainer).click();
   await this.page.getByTestId(CONDITIONAL_LOGIC_SELECTORS.thirdOption).hover();
   await this.page.getByTestId(CONDITIONAL_LOGIC_SELECTORS.deleteThirdOption).click();
  }

  renameOptions = async() => {
    await this.page.getByTestId(CONDITIONAL_LOGIC_SELECTORS.questionHeader).fill('Interested in Playwright ?');
    await this.page.getByTestId(CONDITIONAL_LOGIC_SELECTORS.firstOption).fill(CONDITIONAL_LOGIC_TEXTS.no);
    await this.page.getByTestId(CONDITIONAL_LOGIC_SELECTORS.secondOption).fill(CONDITIONAL_LOGIC_TEXTS.yes);
  }

  clickConditionalLogicCard =() => this.page.getByTestId(CONDITIONAL_LOGIC_SELECTORS.conditionalLogicCard).click();

  createNewCondition = async() => {
    await this.page.getByTestId(CONDITIONAL_LOGIC_SELECTORS.conditionalLogicCard).click();
    await this.page.getByTestId(CONDITIONAL_LOGIC_SELECTORS.neetoMoleculesHeader).getByTestId(CONDITIONAL_LOGIC_SELECTORS.addNewCondition).click();
    await this.page.getByTestId(CONDITIONAL_LOGIC_SELECTORS.questionWrapper).click();
    await this.page.getByTestId(CONDITIONAL_LOGIC_SELECTORS.menuList).getByTestId(CONDITIONAL_LOGIC_SELECTORS.playwrightOption).click();
    await this.page.getByTestId(CONDITIONAL_LOGIC_SELECTORS.verbWrapper).click();
    await this.page.getByTestId(CONDITIONAL_LOGIC_SELECTORS.menuList).getByTestId(CONDITIONAL_LOGIC_SELECTORS.isEqualTo).click();
    await this.page.getByTestId(CONDITIONAL_LOGIC_SELECTORS.conditionWrapper).click();
    await this.page.getByTestId(CONDITIONAL_LOGIC_SELECTORS.menuList).getByTestId(CONDITIONAL_LOGIC_SELECTORS.yesOption).click();
    await this.page.getByTestId(CONDITIONAL_LOGIC_SELECTORS.actionTypeSelectField).click();
    await this.page.getByTestId(CONDITIONAL_LOGIC_SELECTORS.menuList).getByTestId(CONDITIONAL_LOGIC_SELECTORS.showOption).click();
    await this.page.getByTestId(CONDITIONAL_LOGIC_SELECTORS.actionFieldInput).click();
    await this.page.getByTestId(CONDITIONAL_LOGIC_SELECTORS.menuList).getByTestId(CONDITIONAL_LOGIC_SELECTORS.selectEmailAddress).click();
    await this.page.getByTestId(CONDITIONAL_LOGIC_SELECTORS.saveChangesButton).click();
  }

  checkIfVisibleOnClickingYes = async() => {
    await this.page.getByTestId(CONDITIONAL_LOGIC_SELECTORS.singleChoiceOption).filter({hasText: CONDITIONAL_LOGIC_TEXTS.yes}).click();
    await expect(this.page.getByTestId(CONDITIONAL_LOGIC_SELECTORS.emailTextField)).toBeVisible();
  }

  checkIfHiddenOnClickingNo = async() => {
    await this.page.getByTestId(CONDITIONAL_LOGIC_SELECTORS.singleChoiceOption).filter({hasText: CONDITIONAL_LOGIC_TEXTS.no}).click();
    await expect(this.page.getByTestId(CONDITIONAL_LOGIC_SELECTORS.emailTextField)).toBeHidden();
  }

}
