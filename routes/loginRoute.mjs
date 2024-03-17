import express from 'express';
import bcrypt from 'bcrypt';
import client from '../postgresql.mjs';
import jwt from 'jsonwebtoken';
import { HTTPCodes } from '../modules/httpConstants.mjs';


const LOGIN_API = express.Router();
LOGIN_API.use(express.json());

const JWT_SECRET = 'key';

LOGIN_API.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await client.query(query, [email]);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {

                const token = jwt.sign({ userId: user.id}, JWT_SECRET, { expiresIn: '1h' });

                res.status(HTTPCodes.SuccesfullRespons.Ok).json({ token });
            } else {
                res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).json({ error: 'Invalid email or password' });
            }
        } else {
            res.status(HTTPCodes.ClientSideErrorRespons.NotFound).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(HTTPCodes.ServerErrorRespons.InternalError).json({ error: 'Internal server error' });
    }
});

export default LOGIN_API;
