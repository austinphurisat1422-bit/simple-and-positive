import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import StorePage from '../pageobjects/store.page.js'

describe('Login', () => {
    it('should login and direct to the store page', async () => {
        await LoginPage.open()

        await LoginPage.login('standard_user', 'secret_sauce')
        await expect(StorePage.cartLink).toBeExisting()
        await expect(StorePage.inventoryHeader).toHaveText(
            expect.stringContaining('Products'))
    })
})

