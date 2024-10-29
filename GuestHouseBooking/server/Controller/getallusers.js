const userModel = require("../model/UserModel");



const getallusers = async function(req,res)
{
    try{
        const users = await userModel.find({})
        res.send(users)
   }
   catch(error)
   {
            return res.status(400).json({error})
   }
}

module.exports = {getallusers}