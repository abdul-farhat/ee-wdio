import { ChainablePromiseElement } from 'webdriverio';

import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ProductsPage extends Page {
    /**
     * define selectors using getter methods
     */
    public get appleJuice () {
        return $('[alt="Apple Juice (1000ml)"]');
    }
    
    public get writeReview () {
        return $('[placeholder="What did you like or dislike?"]');
    }
    
    public get submitButton () {
        return $('[id="submitButton"]');
    }
    
    public get allReviews () {
        return $('[aria-label="Expand for Reviews"]');
    }
    
    public reviewerEmail (email: string) {
        return $(`//cite[text()="`+ email +  `"]`);
    }

    public reviewerComment (comment: string) {
        return $(`//p[text()="`+ comment +  `"]`);
    }

}

export default new ProductsPage();
