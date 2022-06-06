import { ChainablePromiseElement } from 'webdriverio';

import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class WelcomePage extends Page {
    /**
     * define selectors using getter methods
     */
    public get dismiss () {
        return $('//span[text()="Dismiss"]');
    }

}

export default new WelcomePage();
