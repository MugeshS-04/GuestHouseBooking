const feedbackModel = require("../model/FeedbackModel")


const FeedbackAdd = async function(req,res)
{
    const feed = req.body
    console.log(req.body)

  try{
    const feedback = await new feedbackModel(feed)
    const f = feedback.save()
    console.log(f)
    res.send("Feed Back Taken")
  }
  catch(error)
  {
    console.log(error)
    return res.status(400).json({error})
  }
}


module.exports = {FeedbackAdd}