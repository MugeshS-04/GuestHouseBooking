// const bookingmodel = require('../model/BookingModel')
// const mongoose = require("mongoose")
// const roomModel = require('../model/RoomModel')
// const stripe  = require('stripe')('sk_test_51PA5GUSFzceLDgj2q0EZbpkzfcXCFtxehy8jyuiiaGquA8DF2gGxf1zKHC4dGxs4O0hIA98tVpIc5nGje7pYecHC00c7WBASxG')


// const roombooking = async function(req,res)
// {

//     try{



//         const {
//             room,
//             userid,
//             fromdate,
//             todate,
//             totalamount,
//             totalDays

//            } = req.body


//            const newbooking = new bookingmodel ( {
//             room:room.guesthousename,
//             roomid:room._id,
//             userid,
//             fromdate,
//             todate,
//             totalamount,
//             totalDays,
//             transactionId: '1234'
//            })
//         //    console.log(room.name)

//            const booking = await newbooking.save()

//            const roomtemp = await roomModel.findOne({_id: room._id})

//            roomtemp.currentbookings.push({bookingid : booking._id ,
//              fromdate:fromdate,
//              todate:todate,
//              userid:userid,
//              status:booking.status})
//         // console.log(roomtemp.currentbookings)

//         await roomtemp.save()
//            res.send("Room Booked Successfully")

//     }
//     catch(error)
//     {
//        console.log(error)
//     }
// }

// module.exports = { roombooking };



const bookingmodel = require('../model/BookingModel')
const mongoose = require("mongoose")
const roomModel = require('../model/RoomModel')
const Stripe = require('stripe')('sk_test_51PA5GUSFzceLDgj2q0EZbpkzfcXCFtxehy8jyuiiaGquA8DF2gGxf1zKHC4dGxs4O0hIA98tVpIc5nGje7pYecHC00c7WBASxG');




const { v4: uuidv4 } = require('uuid')

const roombooking = async function (req, res) {
  const { room, userid, fromdate, todate, totalamount, totalDays, token,imageurls } = req.body;

  console.log(totalamount)

  const newbooking = new bookingmodel({
    room: room.guesthousename,
    roomid: room._id,
    userid,
    fromdate,
    todate,
    totalamount,
    totalDays,
    transactionId: '1234',
    imageurls
  });

  const booking = await newbooking.save();

  const roomtemp = await roomModel.findOne({ _id: room._id });

  roomtemp.currentbookings.push({
    bookingid: booking._id,
    fromdate: fromdate,
    todate: todate,
    userid: userid,
    status: booking.status // Assuming booking.status is defined in your model
  });

  await roomtemp.save();
  return res.send("Room Booked Successfully");
  //  return res.send("Payment Successful Stripe, Your Room is Booked");

};

module.exports = { roombooking };
























// "use strict";

// /**
//  *  order controller
//  */

// const stripe = require("stripe")(
//   "sk_test_my_test_code_from_stripe"
// );



// const { createCoreController } = require("@strapi/strapi").factories;



// module.exports = createCoreController("api::order.order", ({ strapi }) => ({
//   async create(ctx) {
//     const {
//       shippingAdress,
//       city,
//       state,
//       amount,
//       pin,
//       mobile_number,
//       name,
//       token,
//       items,
//     } = ctx.request.body;

//     await stripe.charges.create({
//       amount: amount * 100,
//       currency: "INR",
//       source: token,
//       description: `order by user ${ctx.state.user.email}`,
//     });

//     const order = await strapi.db.query("api::order.order").create({
//       data: {
//         shippingAdress,
//         city,
//         state,
//         amount,
//         pin,
//         mobile_number,
//         name,
//         token,
//         items,
//         user: ctx.state.user.email,
//       },
//     });
//     return order;
//   },
// }));
