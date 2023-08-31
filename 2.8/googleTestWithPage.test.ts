import {Google} from './googlePage';
const page = new Google()
const fs = require('fs')

    test('do a search', async () => {
        await page.navigate();
        await page.search('Mario Wonder');
        let text = await page.getResults();
        expect(text).toContain('Mario Wonder');
        await fs.writeFile(`${__dirname}/smwr.png`, 
        await page.driver.takeScreenshot(), 'base64',
        (e) => {
            if (e) console.error(e)
        else console.log('Working')
    })
})
