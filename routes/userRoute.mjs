import express from 'express';
import User from '../modules/user.mjs';
import { HTTPCodes } from "../modules/httpConstants.mjs";
import hashPassword from '../modules/passwordHasher.mjs';



const USER_API = express.Router(); 
USER_API.use(express.json());


const users = [];


USER_API.get("/", (req, res, next) => {
    res.json(users)
})

USER_API.get("/new", (req, res, next) => {
    res.send("User New Form")
})

USER_API.use(async (req, res, next) => {
    const { password } = req.body;
    if (password) {
        try {
            req.body.pswHash = await hashPassword(password); // Hash the password
            next();
        } catch (error) {
            console.error('Error hashing password:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(400).json({ error: 'Missing password field' });
    }
});

USER_API.post('/', (req, res) => {
    const { name, email, pswHash } = req.body;

    if (name && email && pswHash) {
        
        const exists = users.some(user => user.email === email);
        if (!exists) {

            const user = new User();
            user.name = name;
            user.email = email;
            user.pswHash = pswHash

            users.push(user);

            res.status(200).json({ message: 'User registered successfully' });
        } else {
            res.status(400).json({ error: 'User already exists' });
        }
    } else {
        res.status(400).json({ error: 'Missing data fields' });
    }
});

USER_API.get("/:id", (req, res) => {
    req.params.id
    res.send("Get user with ID " + req.params.id)
})

USER_API.put('/:id', (req, res) => {
    /// TODO: Edit user
})

USER_API.delete('/:id', (req, res) => {
    /// TODO: Delete user.
})

export default USER_API