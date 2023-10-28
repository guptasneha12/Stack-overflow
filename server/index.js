import express from 'express';
import mongoose, { Mongoose } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import questionRoutes from './routes/Questions.js';
import answerRoutes from './routes/Answers.js';

// to create our server

const app = express();
dotenv.config();

// json is used to make request so we set limit for it
app.use(express.json({limit:"30mb" , extended: true}));
app.use(express.urlencoded({limit:"30mb", extended:true}));
app.use(cors());

app.get('/',(req, res)=>{
    // this will show message when our server is working and liatening fine on the first page
    res.send("This is a stack overflow clone API");
} )

// here we use userRoutes as a middleware
app.use('/user',userRoutes)
app.use('/questions',questionRoutes)
app.use('/answer',answerRoutes)

// API for authentication
// this is only for singal request so we can't do things like that
// app.post('auth/signup',()=>{

// })

// process environment port if it is not available then we use port of 5000
const PORT =process.env.PORT || 5000 

const DATABASE_URL =process.env.CONNECTION_URL
mongoose.connect(DATABASE_URL,{ useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>{console.log(`server running on port ${PORT}`)}))
.catch((err)=> console.log(err.message))

