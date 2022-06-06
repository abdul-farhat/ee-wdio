import RegisterPage from '../pageobjects/register.page'
import WelcomePage from '../pageobjects/welcome.page'
import { faker } from '@faker-js/faker';
import axios from 'axios';

describe('Juice Shop API', () => {

    const email: string = faker.internet.email(faker.random.alphaNumeric(10));
    const password: string = "pass123";
    const message: string = faker.lorem.sentence();
    
    let token: string;

    beforeAll(async function () { 
        
        //Create User
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

        //Get Token
        await axios.post(`http://127.0.0.1:3000/rest/user/login`, {
            headers: {'Content-Type': 'application/json'},
            email: email,
            password: password
            
        })
        .then((response) => {
            expect(response.status).toBe(200);
            token = JSON.stringify(response.data.authentication.token);
        })  
        .catch(err => console.log(err));

    });

    it('Confirm items can be reviewed', async () => {
        let joc = jasmine.objectContaining;
        let jac = jasmine.arrayContaining;

        // Make request
        await axios.get(`http://127.0.0.1:3000/rest/products/search`, {
            headers: {'Content-Type': 'application/json'}
        })
        .then((response) => {
            expect(response.status).toBe(200);
            expect(response.data).toEqual(joc({
                "status": "success",
                "data": jac([
                    joc({"name": "Apple Pomace"}),
                    joc({"image": "apple_pressings.jpg"})
                ])
                }
            ));
          })
        .catch(err => console.log(err))

        await axios.put(`http://127.0.0.1:3000/rest/products/1/reviews`, {
            headers: { Authorization: `Bearer ${token}`,  'Content-Type': 'application/json'},
            message: message,
            author: email

        })
        .then((response) => {
            expect(response.status).toBe(201);
            console.log(JSON.stringify(response.data));
            expect(response.data).toEqual(joc({
                "status": "success"
                }
            ));
          })
        .catch(err => console.log(err))

        await axios.get(`http://127.0.0.1:3000/rest/products/1/reviews`, {
            headers: {'Content-Type': 'application/json'}
        })
        .then((response) => {
            expect(response.status).toBe(200);
            expect(response.data).toEqual(joc({
                "status": "success",
                "data": jac([
                    joc({"message": message}),
                    joc({"author": email})
                ])
                }
            ));
          })
        .catch(err => console.log(err))

    });
});
