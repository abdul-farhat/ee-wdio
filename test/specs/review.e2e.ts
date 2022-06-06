import LoginPage from  '../pageobjects/login.page';
import SecurePage from '../pageobjects/secure.page';
import RegisterPage from '../pageobjects/register.page';
import WelcomePage from '../pageobjects/welcome.page';
import ProductsPage from '../pageobjects/products.page';
import { faker } from '@faker-js/faker';

describe('Juice Shop Homepage', () => {

    const email: string = faker.internet.email(faker.random.alphaNumeric(10));
    const password: string = "pass123";
    const reviewComment: string = faker.lorem.sentence();

    beforeAll(async function () { 
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

        await LoginPage.open();
        await LoginPage.login(email, password);

        await expect(SecurePage.basket).toBeExisting();
    });

    it('Can post a product review', async () => {
        (await ProductsPage.appleJuice).click();
        
        (await ProductsPage.writeReview).setValue(reviewComment);
        await expect(ProductsPage.submitButton).toBeEnabled();

        (await ProductsPage.submitButton).click();
        (await ProductsPage.allReviews).click();

        await expect(ProductsPage.reviewerEmail(email)).toBeExisting();
        await expect(ProductsPage.reviewerComment(reviewComment)).toBeExisting();
    });
});


