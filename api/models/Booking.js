const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    place: {type:mongoose.Schema.Types.ObjectId, require:true},
    user: {type:mongoose.Schema.Types.ObjectId, require:true},
    checkIn:{type:Date, require:true},
    checkOut:{type:Date, require:true},
    name:{type:String, require:true},
    phone:{type:Number, require:true},
    guests:{type:Number},
    price:{type:Number},
})

const BookingModel = mongoose.model('booking',bookingSchema)

module.exports = BookingModel;