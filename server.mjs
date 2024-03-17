import dotenv from 'dotenv';
import express from 'express';
import ejs from 'ejs';
import USER_API from './routes/userRoute.mjs';
import POST_API from './routes/postRoute.mjs';
import LOGIN_API from './routes/loginRoute.mjs';

dotenv.config();


const server = express();

server.use(express.json());

const port = (process.env.PORT || 8080);
server.set('port', port);

server.set('view engine', 'ejs');
server.set('views', './views');


server.use(express.static('public'));

server.use("/users", USER_API);
server.use("/posts", POST_API);
server.use("/login", LOGIN_API);


server.listen(server.get('port'), function () {
    console.log('server up and running', server.get('port'));
});