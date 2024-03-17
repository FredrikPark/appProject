import express from 'express';
import client from '../postgresql.mjs';
import { HTTPCodes } from '../modules/httpConstants.mjs';

const POST_API = express.Router();



POST_API.get('/', (req, res) => {

    const posts = [{
        title: 'test post',
        createdAt: Date.now(),
        description: 'testDescription'
    }]
    res.render('posts/posts', {posts: posts })
});

POST_API.get('/new', (req, res) => {
    res.render('posts/new')
});

POST_API.post('/', async (req, res) => {
    const { title, description, markdown } = req.body;
    const userId = req.userId; // Assuming you have set the userId in the token payload

    try {
        const query = 'INSERT INTO posts (title, description, markdown, createdat) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [title, description, markdown, new Date()]; 
        const result = await client.query(query, values);
        const newPost = result.rows[0];
        
        res.status(HTTPCodes.SuccesfullRespons.Ok).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(HTTPCodes.ServerErrorRespons.InternalError).json({ error: 'Internal server error' });
    }
});



export default POST_API;
