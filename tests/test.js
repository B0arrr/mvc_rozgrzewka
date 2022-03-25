const {Builder, By, until} = require('selenium-webdriver');
const assert = require('assert');

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build()
    try {
        await driver.get('http://localhost:2137/login')
        await driver.findElement(By.name('email')).sendKeys('a')
        await driver.findElement(By.name('password')).sendKeys('a')
        await driver.findElement(By.className('btnLogin')).click()
        await driver.wait(until.urlContains('/'), 1000)
        assert.strictEqual(await driver.findElement(By.xpath('//a[@href=\'/logout\']')).getText(), 'Wyloguj się')
    } finally {
        await driver.quit()
    }
})()