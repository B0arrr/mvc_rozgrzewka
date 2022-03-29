const assert = require('assert')
const {Builder, By, until} = require('selenium-webdriver')

function RandomPass(length) {
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let retVal = ""
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n))
    }
    return retVal
}

let name = RandomPass(8)
let surname = RandomPass(8)
let password= RandomPass(8)
let email= `${RandomPass(5)}@${RandomPass(3)}.pl`

let driver = ''

async function TestRegister() {
    try {
        await driver.get('http://localhost:2137/register')
        await driver.wait(until.elementLocated(By.className('registerView')), 1000)
        await driver.findElement(By.name('firstName')).sendKeys(name)
        await driver.findElement(By.name('lastName')).sendKeys(surname)
        await driver.findElement(By.id('email1')).sendKeys(email)
        await driver.findElement(By.id('email2')).sendKeys(email)
        await driver.findElement(By.id('password1')).sendKeys(password)
        await driver.findElement(By.id('password2')).sendKeys(password)
        await driver.findElement(By.className('btnRegister')).click()
        assert.strictEqual(await driver.findElement(By.xpath('//div[@class=\'loginView\']/h2')).getText(), 'Konto zostało utworzone')
    } catch (e) {
        console.log(e)
    }
}

async function TestLogin() {
    try {
        await driver.get('http://localhost:2137/login')
        await driver.wait(until.elementLocated(By.className('loginView')), 1000)
        await driver.findElement(By.name('email')).sendKeys(email)
        await driver.findElement(By.name('password')).sendKeys(password)
        await driver.findElement(By.className('btnLogin')).click()
        await driver.wait(until.urlContains('/'), 1000)
        assert.strictEqual(await driver.findElement(By.xpath('//a[@href=\'/logout\']')).getText(), 'Wyloguj się')
    } catch (e) {
        console.log(e)
    }
}

async function TestLogout() {
    try {
        await driver.get('http://localhost:2137/')
        await driver.wait(until.elementLocated(By.tagName('header')), 1000)
        await driver.findElement(By.xpath('//a[@href=\'/logout\']')).click()
        assert.strictEqual(await driver.findElement(By.xpath('//div[@class=\'searchContainer text-center\']/h2')).getText(), 'Wylogowano pomyślnie')
    } catch (e) {
        console.log(e)
    }
}

(async function Tests() {
    driver = new Builder().forBrowser('chrome').build()

    await TestRegister()
    await TestLogin()
    await TestLogout()

    driver.quit()
})()
