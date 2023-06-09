import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import UserRouter from './routes/UserRouter';
import UserResourcesRouter from './routes/Resources';
import path from 'path';
// import cors from "cors"
const cors = require('cors');

const app = express();
// Origins Allow
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     next();
//   });
  
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(cors());
  

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }))
app.use("/uploads", express.static(path.join(__dirname, '../uploads')));

app.use('/api', UserRouter);
app.use('/api', UserResourcesRouter);


app.use('**', (req, res) => {
    return res.status(400).json({
        message: "Route not match bad request",
        hasError: true
    })
})

const PORT = 5000;
const MONGODB_URL = "mongodb://user:user@netlands-shard-00-00.ba8lw.mongodb.net:27017,netlands-shard-00-01.ba8lw.mongodb.net:27017,netlands-shard-00-02.ba8lw.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-xyf3mq-shard-0&authSource=admin&retryWrites=true&w=majority"
mongoose
    .connect(MONGODB_URL, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useFindAndModify: false,
        // useCreateIndex: true
    })
    .then((result) => {
        app.listen(PORT, () => {
            console.log(`app listening: ${PORT}`)
        })
    }).catch((err) => {
        console.log(err)
    })
