const express = require('express');
const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
let currUser = require('../models/userModel');

router.get('/signupView',(req,res)=>{
    res.render('userSignup')
})

router.post('/signup',(req,res)=>{
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const mobile = req.body.phoneNumber;
    if(password === confirmPassword){
        bcrypt.hash(password,10, function(err, hashedPass){
            if(err){
                res.json({error:err})
            }
            const newUser = new currUser({email,username, password:hashedPass, mobile});
            newUser.save()
                .then(()=>res.render('userLogin'))
                .catch(err=>res.json('error : '+err))
        })   
    }
    else{
        res.json({
            message:'Enter same password in both fields'
        })
    }
});


router.get('/loginView',(req,res)=>{
    res.render('userLogin');
})
router.post('/login',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    currUser.findOne({email:email})
        .then(user=>{
            if(user){
                bcrypt.compare(password, user.password, function(err,result){
                    if(err){
                        res.json({error:err})
                    }
                    if(result){
                        console.log('Successful login');
                        obj={user:user};
                        res.render('userView',obj)
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

module.exports = router;