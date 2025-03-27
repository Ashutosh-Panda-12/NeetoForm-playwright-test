import {  expect, Page } from "@playwright/test";
import { CONDITIONAL_LOGIC_SELECTORS } from "../constants/selectors/conditionalLogic";
import { CONDITIONAL_LOGIC_TEXTS } from "../constants/texts/conditionalLogic";
import { CREATE_FORM_TEXTS } from "../constants/texts/createForm";
import { CREATE_FORM_SELECTORS } from "../constants/selectors/createForm";

export class ConditionalLogic {
  constructor(private page: Page) {}

  addSingleChoiceElement =() => this.page.getByTestId(CONDITIONAL_LOGIC_SELECTORS.singleChoiceElement).click();

  // makeSingleChoiceAsTheFirstElement = async() => {
  //   await this.page.getByTestId(CONDITIONAL_LOGIC_SELECTORS.summaryButton).click();
  //   const target = this.page.getByRole("button", {name: CONDITIONAL_LOGIC_TEXTS.emailAddress});
  //   const source = this.page.getByRole("button", {name: CONDITIONAL_LOGIC_TEXTS.singleChoiceOption});
  //   await source.scrollIntoViewIfNeeded();
  //   await target.scrollIntoViewIfNeeded();
  //   await source.dragTo(target);
  // }

  makeSingleChoiceAsTheFirstElement = async() => {
  const client = await this.page.context().newCDPSession(this.page);

        await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });
        await client.send('Network.emulateNetworkConditions', {
          offline: false,
          latency: 1000,
          downloadThroughput: 500 * 1024,
          uploadThroughput: 500 * 1024,
        });

        const start = this.page.getByTestId(CONDITIONAL_LOGIC_SELECTORS.multipleChoicePreviewGroup);
        const end = this.page.getByTestId(CONDITIONAL_LOGIC_SELECTORS.emailAddressGroup);
        const box = await start.boundingBox();
        if (box) {
            const startX = box.x + box.width / 2;
            const startY = box.y + box.height / 2;
            const endY = startY - 100;
            await this.page.mouse.move(startX, startY);
            await this.page.mouse.down();
            await this.page.mouse.move(startX, endY, { steps: 10 });
            await this.page.mouse.up();
        }

        await expect(this.page.getByTestId(CREATE_FORM_SELECTORS.publishButton)).toBeDisabled();
        await expect(this.page.getByTestId(CREATE_FORM_SELECTORS.publishButton)).toBeEnabled();

        await client.send('Emulation.setCPUThrottlingRate', { rate: 1 });
        await client.send('Network.emulateNetworkConditions', {
          offline: false,
          latency: 0,
          downloadThroughput: -1,
          uploadThroughput: -1,
        });

  }

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
