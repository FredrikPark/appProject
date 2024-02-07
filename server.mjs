import express from 'express';
import USER_API from './routes/userRoute.mjs';

const server = express();

const port = (process.env.PORT || 8080);
server.set('port', port);

server.use(express.static('public'));

server.use("/users", USER_API)


server.listen(server.get('port'), function () {
    console.log('server up and running', server.get('port'));
});