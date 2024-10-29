const roomModel = require("../model/RoomModel")


const addroomctrl = async function(req,res)
{

    try{
        // console.log(req.body)
     const newroom = new roomModel(req.body)
     await newroom.save()
     res.send('New Room Added')
    }
    catch(error)
    {
        // console.log(error)
        return res.status(400).json(error)
    }
}
module.exports = {addroomctrl}