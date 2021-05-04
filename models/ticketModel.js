const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    screen:{type:Number, required:true},
    seatNumber:{type:Number, required:true},
    customerId:{type:String, required:true},
    customerName:{type:String, required:true},
    isBooked:{type:Boolean , required:true},
},{
    timestamps:true
});
const ticket =new mongoose.model('ticket',ticketSchema);

module.exports = ticket;