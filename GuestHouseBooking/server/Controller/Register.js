const UserModel = require("../model/UserModel");
const userModel = require("../model/UserModel");
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const twilio = require('twilio')
const dotenv = require('dotenv')
dotenv.config()


const registerfunc = async function (req, res) {
   const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)

   const mess = "You have Successfully registered into Kec Guest House"

   const to = "+91" + req.body.phone
   console.log(typeof to)
   console.log(to)

   client.messages.create({
      body: mess,
      to: to,
      from: '+14194926922'
   })

   try {

      const newuser = await new UserModel(req.body)
      const user = newuser.save()
      console.log(user)

      res.send("User Registered Successfully")
   }
   catch (error) {
      return res.status(400).json({ error })
   }
}

module.exports = { registerfunc }


// const UserModel = require("../model/UserModel");
// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// const registerfunc = async function(req, res) {
//     try {
//         // Extract password from the request body
//         const { password, ...userData } = req.body;

//         // Hash the password using bcrypt
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create a new user object with the hashed password
//         const newUser = new UserModel({
//             ...userData,
//             password: hashedPassword
//         });

//         // Save the user to the database
//         await newUser.save();

//         res.send("User Registered Successfully");
//     } catch (error) {
//         return res.status(400).json({ error: error.message });
//     }
// }

// module.exports = { registerfunc };
