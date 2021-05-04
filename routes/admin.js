const express = require('express');
const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
let admin = require('../models/adminModel');
let ticket = require('../models/ticketModel');
var isLogin=false;

router.post('/signup',(req,res)=>{
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if(password === confirmPassword){
        bcrypt.hash(password,10, function(err, hashedPass){
            if(err){
                res.json({error:err})
            }
            const newAdmin = new admin({email,username, password:hashedPass});
            newAdmin.save()
                .then(()=>res.render('adminLogin'))
                
                .catch(err=>res.json('error : '+err))
        })   
    }
    else{
        res.json({
            message:'Enter same password in both fields'
        })
    }
});


router.post('/login',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    admin.findOne({email:email})
        .then(user=>{
            if(user){
                console.log('user found')
                bcrypt.compare(password, user.password, function(err,result){
                    if(err){
                        res.json({error:err})
                    }
                    if(result){
                        console.log('Successful login');
                        console.log(user);
                        obj={user:user}

                        res.render('adminView',obj);
                        isLogin:true;
                       
                    }
                    else{
                        res.json({message:'Enter correct password'})
                    }
                })
            }
            else{
                res.json({message:'User not found'})
            }

        })
})

router.get('/manageTicketView',(req,res)=>{
    res.render('../views/manageTickets')
})
router.post('/manageTicket',(req,res)=>{
    const screen = req.body.screen;
    const seatNumber = req.body.seatNumber;
    const newTicket = new ticket({screen, seatNumber, customerId:" ", customerName:" ", isBooked:false})
    newTicket.save()
        .then(()=>res.render('manageTickets'))
        .catch(err=>res.json('error '+err))
})
module.exports = router;