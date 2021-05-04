const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
let ticket = require('../models/ticketModel');

router.get('/', (req,res)=>{
    ticket.find()
        
        .then(tickets =>{
            if(tickets){
                obj = {tickets:tickets},
                console.log(tickets),
                res.render('booking',obj)
            }
            else{
                res.render('/');
            }
            
            // console.log('obj '+obj),
        })
})

router.get('/restore',(req,res)=>{
    ticket.find()
        .then(tickets=>{
            tickets.customerId = null;
            tickets.customerName = null;
            tickets.isBooked = false;

            tickets.save()
                .then(()=>res.json('Ticket default restored'))
                .catch(err=>res.json('Error : '+err));
        })
        .catch(err=>res.json('Err : '+err))
})

module.exports = router;