import http from 'http'
import express from 'express';
import {Server} from 'socket.io'
import cookieParser from 'cookie-parser';
import passport from './config/passport';
import path from 'path';
import connectDB from './config/connectDB'
import authRouter from './routers/user.route';
import courseRouter from './routers/course.route';
import instrRouter from './routers/instructor.route'
import {routerChat} from './routers/chat.route'

import { errorHandler } from './shared/middlewares/errorHandler.middleware';
import dotenv  from 'dotenv';
dotenv.config()

//  1. server

const app = express();
const server=http.createServer(app)
const io=new Server(server)

io.on('connection',socket=>{
    console.log(socket.id)
    socket.on('joinRoom',({chatId,userId})=>{
        socket.join(chatId)
    })
})

// 2. View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

//3. DB
connectDB().then(()=>{console.log('connect DB successful')})

// 4. Middlewares الأساسية
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 5. (Static Files)

app.use(
    '/bootstrap',
    express.static(path.join(__dirname, './node_modules/bootstrap/dist'))
);
app.use(
    '/uploads',
    express.static(path.join(__dirname, './uploads'))
);

//  6. Passport
app.use(passport.initialize());


// 7. Routes

const authrouter = new authRouter();
const courserouter =new courseRouter();
const instrrouter= new instrRouter()
const chatrouter= new routerChat()

app.use('/', chatrouter.router);
app.use('/', authrouter.router);
app.use('/', courserouter.router);
app.use('/', instrrouter.router);


// 8. Middleware لمعالجة الأخطاء
app.use(errorHandler);

// 9. server
const port =process.env.PORT

server.listen(port, () => {
    console.log('Server is running');
});
