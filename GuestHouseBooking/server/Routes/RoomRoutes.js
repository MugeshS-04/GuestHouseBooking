const express = require("express")
const { getallrooms, getroombyid } = require("../Controller/getallrooms")
const { addroomctrl } = require("../Controller/addroomctrl")
// const authmiddleware = require("../middleware/authmiddleware")
const router = express.Router()


router.get("/getallrooms",getallrooms)
console.log("helloroom")
router.post("/getroombyid",getroombyid)
router.post('/addroom',addroomctrl)
module.exports = router

