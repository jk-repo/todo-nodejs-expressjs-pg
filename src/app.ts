import express from 'express';
import * as middleware from "./middleware/index";
import {
    AppDataSource
} from './ormconfig';
import cookieParser from "cookie-parser";
import path from "path"
import * as dotenv from "dotenv";
import { indexRouter } from "./routes/index";
import "reflect-metadata"

dotenv.config();

export const app = express();
const port = process.env.PORT;

declare module 'express-session' {
  export interface SessionData {
    user: any;
    isSuccess: boolean;
    message: any;
  }
}

const session = require("express-session")({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    name: 'todo-cookie-secure',
    rolling: true,
    cookie: { maxAge: 6000000 }
});


// #================#================# DB Configuration #================#================#
AppDataSource.initialize()
    .then(() => {
        console.log('Connected to database.');
    })
    .catch((error) => console.log(error))


// #================#================# App Configuration #================#================#
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());


app.use('/static', express.static(path.join(__dirname, 'static')));
// app.use('/media', express.static(path.join(__dirname, 'media')));

app.disable('x-powered-by')

app.set('trust proxy', 1) // trust first proxy
app.use(session);


app.use((req, res, next) => {
    next();
});

app.use('/', indexRouter);

app.use(middleware.errorHandler);
app.use(middleware.notFoundHandler);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});