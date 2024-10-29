const express = require('express')
const { Contactus } = require('../Controller/Contact')
const router = express.Router()


router.post('/send',Contactus)


module.exports=router