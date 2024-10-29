const bookingmodel = require("../model/BookingModel")
const roomModel = require("../model/RoomModel")


const cancelbooking = async function(req,res)
{
   const {bookingid,roomid} = req.body
   try{
        const bookingitem = await bookingmodel.findOne({_id:bookingid})
        bookingitem.status = "cancel"
        await bookingitem.save()

        const room = await roomModel.findOne({_id:roomid})

        const bookings = room.currentbookings

        const temp = bookings.filter(booking => booking.bookingid.toString()!==bookingid)

        room.currentbookings=temp

        await room.save()
        // await booking.save()

        res.send("Your Booking Cancelled Successsfully")

   }

   catch(error)
   {
               return res.status(400).json(error)
   }
}

module.exports = {cancelbooking}