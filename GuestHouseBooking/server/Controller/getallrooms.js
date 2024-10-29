const roomModel = require("../model/RoomModel");
const mongoose = require("mongoose")


const getallrooms = async function(req,res)
{
    try{
      
       const rooms = await roomModel.find({})
       console.log("All room datas fetched")
       return res.send(rooms)
    }
    catch(error)
    {
       console.log(error)
       return res.status(500).json({message:error})
    }
}

const getroombyid = async function(req, res) {
   try {
     const roomid = req.body.roomid;
     const room = await roomModel.findOne({ _id: roomid });
     res.send(room); // Sending room data as JSON response
   } catch (error) {
     return res.status(400).json({ message: error.message }); // Sending error message as JSON response
   }
 }

module.exports = {getallrooms,getroombyid}