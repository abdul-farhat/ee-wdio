import { ChainablePromiseElement } from 'webdriverio';

import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class RegisterPage extends Page {
    /**
     * define selectors using getter methods
     */
    public get email () {
        return $('[id="emailControl"]');
    }

    public get password () {
        return $('[id="passwordControl"]');
    }    
    
    public get repeatPassword () {
        return $('[id="repeatPasswordControl"]');
    }

    public get securityQuestionDropDown () {
        return $('[id="mat-select-0"]');
    }

    public get securityQuestionAnswer () {
        return $('[id="securityAnswerControl"]');
    }
    
    public securityQuestionSelection (question: string) {
        return $(`//span[text()=" `+ question +  ` "]`);
    }

    public get successful () {
        return $('//span[text()="Registration completed successfully. You can now log in."]')
    }
    
    public get registerButton () {
        return $('[id="registerButton"]')
    }

    public async register (email: string, password: string, repeatPassword: string) {
        await this.email.setValue(email);
        await this.password.setValue(password);
        await this.repeatPassword.setValue(repeatPassword);        
    }

    public async securityQuestion (securityQuestionAnswer: string) {
        await this.securityQuestionDropDown.click();
        (await this.securityQuestionSelection("Mother\'s maiden name?")).click();
        await this.securityQuestionAnswer.setValue(securityQuestionAnswer);
    }

    public open () {
        return super.open('#/register');
    }

}

export default new RegisterPage();
