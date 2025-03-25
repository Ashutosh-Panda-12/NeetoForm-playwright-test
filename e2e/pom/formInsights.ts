import { expect, Page } from "@playwright/test";
import { CREATE_FORM_SELECTORS } from "../constants/selectors/createForm";
import { FORM_INSIGHTS_SELECTORS } from "../constants/selectors/formInsights";

export class FormInsights {

  constructor(private page: Page) {}

  goToAnalytics = async() => {
    await this.page.getByTestId(FORM_INSIGHTS_SELECTORS.moreTab).click();
    await this.page.getByTestId(FORM_INSIGHTS_SELECTORS.moreDropdownContainer).getByTestId(FORM_INSIGHTS_SELECTORS.analyticsTab).click();
  }

  checkAnalytics = async(visits:number, starts: number, submissions: number, completion: number) => {
    await Promise.all([
      expect(this.page.getByTestId(FORM_INSIGHTS_SELECTORS.visitsMetric).getByTestId(FORM_INSIGHTS_SELECTORS.insightsCount)).toHaveText(visits.toString()),
      expect(this.page.getByTestId(FORM_INSIGHTS_SELECTORS.startsMetric).getByTestId(FORM_INSIGHTS_SELECTORS.insightsCount)).toHaveText(starts.toString()),
      expect(this.page.getByTestId(FORM_INSIGHTS_SELECTORS.submissionsMetric).getByTestId(FORM_INSIGHTS_SELECTORS.insightsCount)).toHaveText(submissions.toString()),
      expect(this.page.getByTestId(FORM_INSIGHTS_SELECTORS.completionRateMetric).getByTestId(FORM_INSIGHTS_SELECTORS.insightsCount)).toHaveText(`${completion}%`),
    ])
  }

  fillValueInEmail =(randomEmail: string) => this.page.getByTestId(CREATE_FORM_SELECTORS.emailTextField).fill(randomEmail);
  submitForm = () => this.page.getByTestId(CREATE_FORM_SELECTORS.startOrSubmitButton).click();

}
