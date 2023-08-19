import {Builder, Capabilities, By} from 'selenium-webdriver';
const chromedriver = require('chromedriver');
const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

class Employees {
    name: string;
    phone: number;
    title: string;
constructor(name:string, phone:number, title: string) {
    this.name = name;
    this.phone = phone;
    this.title = title;
}
}

let employees: Array<Employees> = [
    new Employees('Blossom', 1234567890, 'Power Puff Girl'),
    new Employees('Buttercup', 1234567890, 'Power Puff Girl'),
    new Employees('Bubbles', 1234567890, 'Power Puff Girl'),
    new Employees('Miss Sara Bellum', 9876543210, 'Seceretary')
]

const addEmployee: By = By.name('addEmployee');
const newEmployee: By = By.xpath('//li[text() = "New Employee"]');
const nameInput: By = By.name( 'nameEntry');
const phoneInput: By = By.name('phoneEntry'); 
const titleInput: By = By.name('titleEntry'); 
const saveBtn: By = By.css('#saveBtn');

let addEmployeeFunction = async (employees) => {
    await driver.findElement(addEmployee).click();
    await driver.findElement(newEmployee).click();
    await driver.findElement(nameInput).click();
    await driver.findElement(nameInput).clear();
    await driver.findElement(nameInput).sendKeys(employees.name);
    await driver.findElement(phoneInput).click();
    await driver.findElement(phoneInput).clear();
    await driver.findElement(phoneInput).sendKeys(employees.phone);
    await driver.findElement(titleInput).click();
    await driver.findElement(titleInput).clear();
    await driver.findElement(titleInput).sendKeys(employees.title);
    await driver.findElement(saveBtn).click()
}

describe('should add employees to employee manager', () => {
    test('the function works and is the coolest thing youve seen', async () => {
        await driver.get('https://devmountain-qa.github.io/employee-manager/1.2_Version/index.html');
        for (let i = 0; i < employees.length; i++) {
            await addEmployeeFunction(employees[i])
        }
        await driver.quit()
    })
})