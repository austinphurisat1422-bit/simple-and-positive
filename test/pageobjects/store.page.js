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
}

export default new StorePage();
