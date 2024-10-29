const bookingmodel = require("../model/BookingModel")







const getallbookings = async function(req,res)
{
     try{
          const bookings = await bookingmodel.find({})
          res.send(bookings)
     }
     catch(error)
     {
              return res.status(400).json({error})
     }
}
module.exports = {getallbookings}