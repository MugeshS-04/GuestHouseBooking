const express = require("express")
const { FeedbackAdd } = require("../Controller/FeedbackAdd")

const router = express.Router()

router.post('/add',FeedbackAdd)

module.exports = router