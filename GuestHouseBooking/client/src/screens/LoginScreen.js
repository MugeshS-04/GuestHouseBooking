// import React from 'react'
// import { useState,useEffect } from 'react'
// import axios from "axios"

// function LoginScreen() {

//     const [email,setemail] = useState()
//     const [password,setpassword] = useState()

// const handlelogin = async function(values)
// {

//     const user = {

//         email,
//         password
//     }
//     console.log(user)
//     try{
//         const res = await axios.post("http://localhost:5000/api/users/login", user)

//         console.log(res.data)

//        }
//        catch(error)
//        {
//         // console.log("hiiiiii")
//           console.log(error)
//        }

// }

// return (
//     <div>
//       <div className='bs'>
//       <div className="row justify-content-center mt-3 mb-5">
//         <div className="col-md-3">
//             <div><h1>
//                 Login
//                 </h1>

//                 <input type="email" className='form-control' placeholder='Email' value={email} onChange={function(e)
//                 {
//                     setemail(e.target.value)
//                 }}/>

//                 <input type="password" className='form-control' placeholder='Password' value={password} onChange={function(e)
//                 {
//                     setpassword(e.target.value)
//                 }}/>

//        <br />
//                 <button className='btn btn-primary' onClick={handlelogin}>Login</button>
//                 </div>
//         </div>
//       </div>
//     </div>

//     </div>
//   )
// }

// export default LoginScreen

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";
import style from "../styles/login.module.css";
import image from "../assets/user.png";
function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setsuccess] = useState();
  const navi = useNavigate();
  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data);
      setsuccess(true);
      setLoading(false);
      localStorage.setItem("currentuser", JSON.stringify(response.data.data));
    //   localStorage.setItem('currentuser' ,JSON.stringify(response.data.data))
      console.log("Login successful");

      setEmail("");
      setPassword("");
      setError("");
      window.location.href = '/home'
    } catch (error) {
      setLoading(false);
      setError(true);
      console.error("Login error:", error.response.data.message);
      setError(error.response.data.message);
    }
  };

  return (
    <>
        {loading && <Loader />}
        {success && <Success message="LoginSuccess" />}
    <div className={style.container}>
    <div className={style.left}><span>Welcome!</span><h1>Our user-friendly interface<br/> ensures efficient management of your accommodation needs.</h1></div>
  
    <div className={style.right}>
        <div className={style.main}>
          
          <div className={style.header}>
            <img src={image} alt="profile"></img>
            <h1>Sign In</h1>
          </div>
          <div className={style.input_field}>
            <input
              type="email"
            
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
            
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
         
            {error && <p style={{ color: "red" }}>{error}</p>}
            <br />
            <button className={style.button} onClick={handleLogin}>
              Login
            </button>
            <div className={style.register}>
            <p>Don't have an account ? </p>
            <Link to={'/register'} className={style.reg}>Register</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    
</>

  );
}

export default LoginScreen;
