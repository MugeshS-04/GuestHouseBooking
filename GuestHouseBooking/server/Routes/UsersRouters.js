const express = require("express")
const { registerfunc } = require("../Controller/Register")
const { Loginfunc } = require("../Controller/Login")
const { getallusers } = require("../Controller/getallusers")
const router = express.Router()



router.post("/register" ,registerfunc )
router.post("/login",Loginfunc)
router.get('/getallusers',getallusers)


module.exports = router
