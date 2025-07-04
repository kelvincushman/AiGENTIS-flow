import { expect, test } from "@playwright/test";
import { adjustScreenView } from "../../utils/adjust-screen-view";
import { awaitBootstrapTest } from "../../utils/await-bootstrap-test";
import { initialGPTsetup } from "../../utils/initialGPTsetup";

test(
  "user must be able to save or delete a global variable",
  { tag: ["@release", "@workspace", "@api"] },
  async ({ page }) => {
    await awaitBootstrapTest(page);

    await page.waitForSelector('[data-testid="blank-flow"]', {
      timeout: 30000,
    });
    await page.getByTestId("blank-flow").click();
    await page.getByTestId("sidebar-search-input").click();
    await page.getByTestId("sidebar-search-input").fill("openai");

    await page.waitForSelector('[data-testid="openaiOpenAI"]', {
      timeout: 1000,
    });

    await page
      .getByTestId("openaiOpenAI")
      .hover()
      .then(async () => {
        await page.getByTestId("add-component-button-openai").last().click();
      });

    await page.getByTestId("fit_view").click();

    await initialGPTsetup(page, {
      skipAdjustScreenView: true,
      skipUpdateOldComponents: true,
      skipAddNewApiKeys: true,
      skipSelectGptModel: true,
    });

    const genericName = Math.random().toString();
    const credentialName = Math.random().toString();

    await page.getByTestId("icon-Globe").nth(0).click();
    await page.getByText("Add New Variable", { exact: true }).click();
    await page
      .getByPlaceholder("Enter a name for the variable...")
      .fill(genericName);
    await page.getByText("Generic", { exact: true }).first().isVisible();
    await page
      .getByPlaceholder("Enter a value for the variable...")
      .fill("This is a test of generic variable value");
    await page.getByText("Save Variable", { exact: true }).click();
    expect(page.getByText(genericName, { exact: true })).not.toBeNull();
    await page.getByText(genericName, { exact: true }).isVisible();

    await page.getByText("Add New Variable", { exact: true }).click();
    await page
      .getByPlaceholder("Enter a name for the variable...")
      .fill(credentialName);
    await page.getByTestId("credential-tab").click();
    await page
      .getByPlaceholder("Enter a value for the variable...")
      .fill("This is a test of credential variable value");
    await page.getByText("Save Variable", { exact: true }).click();
    expect(page.getByText(credentialName, { exact: true })).not.toBeNull();
    await page.getByText(credentialName, { exact: true }).isVisible();

    await page
      .getByText(credentialName, { exact: true })
      .hover()
      .then(async () => {
        await page.getByTestId("icon-Trash2").last().click();
        await page.getByText("Delete", { exact: true }).nth(1).click();
      });
  },
);
