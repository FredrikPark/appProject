import express from "express";
import { HTTPCodes } from "../modules/httpConstants.mjs";
import hashPassword from '../modules/passwordHasher.mjs';
import client from '../postgresql.mjs';

const LOGIN_API = express.Router(); 
LOGIN_API.use(express.json());

LOGIN_API.get('/', (req, res) => {
    const bootstrapCDN = `
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    `;

    const loginForm = `
        <div class="container">
            <div class="row justify-content-center mt-5">
                <div class="col-md-6">
                    <form action="/login" method="post">
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="email" class="form-control" id="email" name="email">
                        </div>
                        <div class="form-group">
                            <label for="password">Password:</label>
                            <input type="password" class="form-control" id="password" name="password">
                        </div>
                        <button type="submit" class="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    `;

    res.send(`${bootstrapCDN}${loginForm}`);
});

LOGIN_API.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await client.query(query, [email]);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            // Compare hashed password with input password
            const isPasswordValid = await verifyPassword(password, user.pswHash); // Assuming pswHash is the hashed password
            if (isPasswordValid) {
                res.status(HTTPCodes.Success.Ok).json({ message: 'Login successful' });
            } else {
                res.status(HTTPCodes.ClientError.BadRequest).json({ error: 'Invalid email or password' });
            }
        } else {
            // Redirect to registration form if user doesn't exist
            res.redirect('/'); // Adjust the route as per your application
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(HTTPCodes.ServerError.InternalServerError).json({ error: 'Internal server error' });
    }
});

export default LOGIN_API