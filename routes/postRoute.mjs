import express from 'express';

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

POST_API.post('/', (req, res) => {

});



export default POST_API;
