const express = require("express");
const app = express();
const path = require('path');
const logger = require('morgan');
const cors=require("cors");
require('dotenv').config();
const PORT = process.env.PORT || 4000;
const cookieParser=require('cookie-parser');
//cookie-parser - what is this and why we need this ?

app.use(express.json());
app.use(cors())
app.use(logger('dev'))
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));
require("./config/database").connect();

//route import and mount

app.use('/api/v1', require('./routes'))

app.get("/",(req,res)=>{
    res.send("MY APIpp");
})
//actuivate

app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
})