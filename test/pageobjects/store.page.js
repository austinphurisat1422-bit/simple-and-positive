import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class StorePage extends Page {
    /**
     * define selectors using getter methods
     */
    get cartLink () {
        return $('a.shopping_cart_link');
    }

    get inventoryHeader () {
        return $('span.title');
    }

    get productImgs () {
        return $('img.inventory_item_img');
    }

    get backpackProductImg () {
        return $('img.inventory_item_img[alt="Sauce Labs Backpack"]');
    }

    get backpackPrice () {
        return $('.inventory_item_price:has(+ #add-to-cart-sauce-labs-backpack)');
    }

    get backpackAddToCart () {
        return $('#add-to-cart-sauce-labs-backpack');
    }

    get backpackRemoveFromCart () {
        return $('#remove-sauce-labs-backpack');
    }

    get hamburgerMenu () {
        return $('#react-burger-menu-btn')
    }

    get resetAppStateBtn () {
        return $('#reset_sidebar_link')
    }

    async resetAppState () {
        await this.hamburgerMenu.click();
        await this.resetAppStateBtn.click();
    }
}

export default new StorePage();
