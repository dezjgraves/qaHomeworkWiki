//import all the necessary functions to utilize selenium

import {
    Builder,
    By,
    Capabilities,
    until,
    WebDriver,
    WebElement,
    Key,
} from "selenium-webdriver";

//set up variables that will be located by webdriver
const chromedriver = require("chromedriver");
const driver: WebDriver = new Builder()
    .withCapabilities(Capabilities.chrome())
    .build();
const bernice: By = By.name("employee1");
const marnie: By = By.name("employee2");
const phillip: By = By.name("employee3");
const nameDisplay: By = By.id("employeeTitle");
const nameInput: By = By.name("nameEntry");
const phoneInput: By = By.name("phoneEntry");
const titleInput: By = By.name("titleEntry");
const saveButton: By = By.id("saveBtn");
const cancelButton: By = By.name("cancel");
const errorCard: By = By.css(".errorCard");

//I am unclear on what the purpose of => is specifically and what describe is doing exactly
describe("Employee Manager 1.2", () => {
//before each test wait for the web driver to display page being tested
    beforeEach(async () => {
        await driver.get(
        "https://devmountain-qa.github.io/employee-manager/1.2_Version/index.html"
        );
    });
    //after all tests completely close the browser. What difference is close? I cannot remember....
    afterAll(async () => {
        await driver.quit();
    });
    describe("handles unsaved, canceled, and saved changes correctly", () => {
        test("An unsaved change doesn't persist", async () => {
        /*
        This test follows these steps:
        1. Open Bernice Ortiz
        2. Edit the name input
        3. Open Phillip Weaver
        4. Open Bernice Ortiz
        5. Verify the name field is the original name
        */
        await driver.findElement(bernice).click();
        await driver.wait(
            until.elementIsVisible(await driver.findElement(nameInput))
        );
        await driver.findElement(nameInput).clear();
        await driver.findElement(nameInput).sendKeys("Boris McFee");
        await driver.findElement(phillip).click();
        await driver.wait(
            until.elementTextContains(
            await driver.findElement(nameDisplay),
            "Phillip"
            )
        );
        await driver.findElement(bernice).click();
        await driver.wait(
            until.elementTextContains(
            await driver.findElement(nameDisplay),
            "Bernice"
            )
        );
        expect(
            await (await driver.findElement(nameInput)).getAttribute("value")
        ).toBe("Bernice Ortiz");
        });

        test("A canceled change doesn't persist", async () => {
            /*
            This test follows these steps:
            1. Open Phillip Weaver
            2. Edit the name input
            3. Click cancel
            5. Verify the name field is the original name
            */
            await driver.findElement(phillip).click();
            await driver.wait(
                until.elementIsVisible(await driver.findElement(nameInput))
            );
            await driver.findElement(nameInput).clear();
            await driver.findElement(nameInput).sendKeys("Rocky Balboa");
            await driver.findElement(cancelButton).click();
            expect(
                await (await driver.findElement(nameInput)).getAttribute("value")
            ).toBe("Phillip Weaver");
        });

        test("A saved change persists", async () => {
            /*
            This test follows these steps:
            1. Open Bernice Ortiz
            2. Edit the name input
            3. Save the change
            4. Open Phillip Weaver
            5. Open Bernice Ortiz's old record
            5. Verify the name field is the edited name
            */
            await driver.findElement(bernice).click();
            await driver.wait(
                until.elementIsVisible(await driver.findElement(nameInput))
            );
            await driver.findElement(nameInput).clear();
            await driver.findElement(nameInput).sendKeys("Saved Name");
            await driver.findElement(saveButton).click();
            await driver.findElement(phillip).click();
            await driver.wait(
                until.elementTextContains(
                await driver.findElement(nameDisplay),
                "Phillip"
                )
            );
            await driver.findElement(bernice).click();
            expect(
                await (await driver.findElement(nameInput)).getAttribute("value")
            ).toBe("Saved Name");
    });
});

    describe("handles error messages correctly", () => {
        test("shows an error message for an empty name field", async () => {
            /*
            This test follows these steps:
            1. Open Bernice Ortiz
            2. Clear the name input
            3. Save the change
            4. Verify the error is present
            */
            await driver.findElement(bernice).click();
            await driver.wait(
                until.elementIsVisible(await driver.findElement(nameInput))
            );
            await driver.findElement(nameInput).clear();
            await driver.findElement(nameInput).sendKeys(Key.SPACE, Key.BACK_SPACE);
            await driver.findElement(saveButton).click();
            await driver.wait(until.elementLocated(errorCard));
            expect(await (await driver.findElement(errorCard)).getText()).toBe(
                "The name field must be between 1 and 30 characters long."
            );
        });
        test("lets you cancel out of an error message", async () => {
            /*
            This test follows these steps:
            1. Open Bernice Ortiz
            2. Clear the name input
            3. Save the change
            4. Verify the error is present
            5. Cancel the change
            6. Verify the error is gone
            */
            await driver.findElement(bernice).click();
            await driver.wait(
                until.elementIsVisible(await driver.findElement(nameInput))
            );
            await driver.findElement(nameInput).clear();
            await driver.findElement(nameInput).sendKeys(Key.SPACE, Key.BACK_SPACE);
            await driver.findElement(saveButton).click();
            await driver.wait(until.elementLocated(errorCard));
            expect(await (await driver.findElement(errorCard)).getText()).toBe(
                "The name field must be between 1 and 30 characters long."
            );
            await driver.findElement(nameInput).sendKeys(Key.SPACE);
            await driver.findElement(saveButton).click();
            driver.wait(() => true, 500);
            expect(await driver.findElements(errorCard)).toHaveLength(0);
        });
    });
});