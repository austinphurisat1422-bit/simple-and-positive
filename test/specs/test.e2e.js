import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import StorePage from '../pageobjects/store.page.js'

let usernames = [
    'standard_user', 
    'locked_out_user', 
    'problem_user', 
    'performance_glitch_user', 
    'error_user', 
    'visual_user'
];

describe('Login', () => {
    it('every login should work and lead to the correct store page', async () => {        
        for (let i = 0; i < usernames.length; i++) {
            await LoginPage.open();
            
            await LoginPage.login(usernames[i], 'secret_sauce');
            switch (usernames[i]) {
                case usernames[0]:
                    await expect(StorePage.cartLink).toBeExisting();
                    await expect(StorePage.inventoryHeader).toHaveText(
                        expect.stringContaining('Products'));
                    await StorePage.resetAppState();
                    break;
                case usernames[1]:
                    await expect(LoginPage.errorMsg).toHaveText(
                        expect.stringContaining('Sorry, this user has been locked out'));
                    break;
                case usernames[2]:
                    await expect(StorePage.productImgs).toHaveAttribute('src', '/static/media/sl-404.168b1cce.jpg');
                    await StorePage.resetAppState();
                    break;
                case usernames[3]:
                    await expect(StorePage.cartLink).toBeExisting();
                    await expect(StorePage.inventoryHeader).toHaveText(
                        expect.stringContaining('Products'));
                    await StorePage.resetAppState();
                    break;
                case usernames[4]:
                    await StorePage.backpackAddToCart.click();
                    await StorePage.backpackRemoveFromCart.click();
                    await expect(StorePage.backpackRemoveFromCart).toBeExisting();
                    await StorePage.resetAppState();
                    break;
                case usernames[5]:
                    await expect(StorePage.backpackProductImg).toHaveAttribute('src', '/static/media/sl-404.168b1cce.jpg');
                    await expect(StorePage.backpackPrice).not.toHaveText(expect.stringContaining('$29.99'));
                    await StorePage.resetAppState();
                    break;
            }
        }
    })
    it('no login should work when using an invalid password', async () => {
        for (let i = 0; i < usernames.length; i++) {
            await LoginPage.open();
            await LoginPage.login(usernames[i], 'unsecrets_your_sauce');

            await expect(LoginPage.errorMsg).toHaveText(
                expect.stringContaining('Username and password do not match'));
        }
    })
})
