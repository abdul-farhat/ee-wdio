import RegisterPage from '../pageobjects/register.page'
import WelcomePage from '../pageobjects/welcome.page'
import { faker } from '@faker-js/faker';

describe('Juice Shop Homepage', () => {

    const email: string = faker.internet.email();
    const password: string = "pass123";

    it('Can register a new user', async () => {
        
        await RegisterPage.open();
        
        (await WelcomePage.dismiss).click();

        await RegisterPage.register(
            email, 
            password,
            password
        );

        await RegisterPage.securityQuestion("mother");

        (await RegisterPage.registerButton).click();

        await expect(RegisterPage.successful).toBeExisting();
    });
});


