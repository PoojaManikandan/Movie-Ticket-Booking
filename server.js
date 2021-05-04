const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app=express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.static(__dirname));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

const uri = "mongodb+srv://pooja17:pooja17122@cluster0.mp5ub.mongodb.net/MovieTicket?retryWrites=true&w=majority";
//console.log('uri '+uri);
mongoose.connect(uri,{useCreateIndex:true, useFindAndModify:true, useNewUrlParser:true, useUnifiedTopology:true});
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('MongoDB connected successfully');
})

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+ '/views/index.html'));
})

app.get('/adminloginView',(req,res)=>{
    res.render('adminLogin');
})

const admin = require('./routes/admin');
const user = require('./routes/user');
const ticket = require('./routes/ticket');
app.use('/admin',admin);
app.use('/user',user);
app.use('/ticket',ticket);
app.get('*',(req,res) => 
{
    res.render('404page');
})

app.listen(port,()=>{
    console.log(`Server running at port ${port}`)
})