const mongoose = require("mongoose")

const booksch = mongoose.Schema({
    room: {
        type: String,
        required: true
    },
    roomid: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    fromdate: {
        type: String,
        required: true
    },
    todate: {
        type: String,
        required: true
    },
    totalamount: {
        type: Number,
        required: true
    },
    totalDays: {
        type: Number,
        required: true
    },
    transactionId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        // required:true,
        default: "Pending"
    },
    imageurls:[]
}, { timestamps: true })

const bookingmodel = mongoose.model('bookings', booksch)


module.exports = bookingmodel