import {test} from "../fixtures/";

test.describe("Add theme to the form", async() => {
  test.beforeEach(async({createForm}) => {
    await test.step("Step 1: Go to the website dashboard", createForm.goToWebsiteDashboard);
    await test.step("Step 2: Go to the form dashboard", createForm.goToFormDashboard);
  })

  test("Add theme to the form using a step-by-step method",async({themeSelection}) => {
    await test.step("Step 3: Create a new theme", async() => {
      await themeSelection.goToSettingsTab();
      await themeSelection.createNewTheme();
      await themeSelection.goToBuildTab();
      await themeSelection.addLogo();
    })
  });

  test.afterEach(async({createForm}) => {
    test.step("Step 4: Delete the form", createForm.deleteForm);
  })

})
