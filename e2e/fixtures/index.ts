import {test as base} from "@playwright/test";
import { LoginPage } from "../pom/loginPage";
import { CreateForm } from "../pom/createForm";
import { FormFieldElements } from "../pom/formFieldElements";
import { FormInsights } from "../pom/formInsights";
import { AccessControl } from "../pom/accessControl";

interface Fixtures {
  loginPage: LoginPage;
  createForm: CreateForm;
  formFieldElements: FormFieldElements;
  formInsights: FormInsights;
  accessControl: AccessControl;
}

export const test = base.extend<Fixtures>({
  loginPage: async({page}, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  createForm: async({page}, use) => {
    const createForm = new CreateForm(page);
    await use(createForm);
  },

  formFieldElements: async({page}, use) => {
    const formFieldElements = new FormFieldElements(page);
    await use(formFieldElements);
  },

  formInsights: async({page}, use) => {
    const formInsights = new FormInsights(page);
    await use(formInsights);
  },

  accessControl: async({page}, use) => {
    const accessControl = new AccessControl(page);
    await use(accessControl);
  }

})
