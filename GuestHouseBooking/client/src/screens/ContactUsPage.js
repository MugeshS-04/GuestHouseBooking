import React, { useState } from 'react';
import axios from 'axios';

function ContactUsPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
  const user = localStorage.getItem('currentuser')

    if(!user)
    {
        window.location.href="/login"
    }

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  const handleEmailClick = () => {
    setShowForm(true);
  };
  const sendemail = async function()
  {
    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
    setName('');
    setEmail('');
    setMessage('');
    const contact={
        name,
        email,
        message
    }
    try{
        setLoading(true)
   const res = await axios.post("http://localhost:5000/api/contact/send" ,contact)
   console.log(res)
   setLoading(false)

    }
    catch(error)
    {
        setLoading(false)
        setError(true)
        console.log(error)
    } 

  }

  return (
    <div style={{ display: "flex", flexDirection:"column",height:"90vh", alignItems : "center",justifyContent :"center"}}>
      <h1>Contact Us</h1>
      {!showForm && (
        <a href="#" style={{textDecoration: "underline", padding: "10px"}} onClick={handleEmailClick}>Email us at kec@gmail.com</a>
      )}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <br></br>
          <br></br>

          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <br></br>
          <br></br>

          <div>
            <label htmlFor="message">Message:</label>
            <textarea
            style={{border:'2px solid black' , borderRadius:'5px'}}
              id="message"
              rows={3}
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <br></br>
          <br></br>
          <br></br>

          <button type="submit" className='btn btn-primary'  onClick={sendemail}>
            Submit
          </button>
        </form>




      )}
    </div>
  );
}

export default ContactUsPage;