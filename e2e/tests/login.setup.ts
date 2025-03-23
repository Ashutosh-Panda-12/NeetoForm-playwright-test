import { test } from "../fixtures";
import { STORAGE_STATE } from "../constants/common";

test.describe("Login with correct credentials", async() => {
  test("Login into the NeetoForm website using a end-to-end process", async({loginPage, page}) => {
    await test.step(" Step 1: Fill the login form with correct login credentials", loginPage.loginToWebsite);
    await test.step(" Step 2: Verify that the user has logged into the website",() => loginPage.verifyLogin());
    await test.step(" Step 3: Save storage state",() => page.context().storageState({ path: STORAGE_STATE }));
  });
});
