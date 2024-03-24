import express from 'express';
import connectDb from './Config/mongodb.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import router from './routes/routes.js';

dotenv.config();

connectDb();
const Port = process.env.PORT ||5000
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/',router);

app.listen(Port,()=>{
    console.log(`listening on port ${Port}`);
});