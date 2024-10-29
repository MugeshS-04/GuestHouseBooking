import axios from 'axios'
import React, { useState } from 'react'
import Swal from "sweetalert2"

function Feedback() {

  const [name,setname] = useState()
  const [email,setemail] = useState()
  const [phonenumber,setphone] = useState()
  const [description,setdescription] = useState()
  const [rating,setrating] = useState()
  const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

  const feedback = async function()
  {
    const feed = {
      name,
      email,
      phonenumber,
      description,
      rating
    }
       try{
        setLoading(true)
        const res = await axios.post("http://localhost:5000/api/feedback/add",feed)
        console.log(res.body)
        Swal.fire('ThankYou','FeedBack Sumbitted Successfully','success')
        setLoading(false)

       }
       catch(error)
       {
        setError(true)
        setLoading(false)
        console.log(error)
       }
  }


  return (
    <div>
      Feed Back Form
      <div className="row">
        <div className="col-md-8">
            <input type="text"  placeholder='name' value={name} onChange={
              function(e)
              {
                setname(e.target.value)
              }
            }/>
            <br></br>
            <br></br>
            <input type="text"  placeholder='Email' value={email} onChange={
              function(e)
              {
                setemail(e.target.value)
              }
            }/>
            <br></br>
            <br></br>
            <input type="number"  placeholder='Number' value={phonenumber} onChange={
              function(e)
              {
                setphone(e.target.value)
              }
            }/>
            <br></br>
            <br></br>
            <input type="text"  placeholder='Description'
            value={description} onChange={function(e)
            {
              setdescription(e.target.value)
            }}/>
            <br></br>
            <br></br>
            <input type="number"  placeholder='Rating'
            value={rating} onChange={
              function(e)
              {
                setrating(e.target.value)
              }
            }/>
           <br></br>
           <br></br>
           <br></br>
            <button className='btn btn-primary' onClick={feedback}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Feedback
