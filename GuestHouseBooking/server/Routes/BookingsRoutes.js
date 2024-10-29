
const express = require("express")
const { roombooking } = require("../Controller/Bookingroom")

const bookingmodel = require("../model/BookingModel")
const { cancelbooking } = require("../Controller/Cancelbooking")
const { getallbookings } = require("../Controller/getallbookings")
const { approvebooking } = require("../Controller/Approvebooking")


const router = express.Router()


router.post("/bookroom",roombooking)
console.log("hello")
router.post("/getbookingbyuserid", async function(req, res) {
    const userid = req.body.userid;
    try {
        console.log("UserID:", userid);
   
        const bookings = await bookingmodel.find({ userid: userid });
      
        // console.log("Bookings:", bookings);
      
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return res.status(400).json({ error: 'Error fetching bookings' });
    }
});


router.post('/cancelbooking' , cancelbooking)
router.get('/getallbooking',getallbookings)
router.post('/approvebooking' ,approvebooking )

module.exports = router
