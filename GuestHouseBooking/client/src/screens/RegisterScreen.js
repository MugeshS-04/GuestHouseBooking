import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";
import style from "../styles/register.module.css"
import image from "../assets/user.png";
import {Link} from "react-router-dom";
function RegisterScreen() {
  const [name, setname] = useState();
  const [phone, setphone] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [confirmpassword, setconfirmpassword] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setsuccess] = useState();

  const handleregister = async function () {
    if (password === confirmpassword) {
      const user = {
        name,
        phone,
        email,
        password,
        confirmpassword,
      };
      console.log(user);
      try {
        setLoading(true);
        const res = await axios.post(
          "http://localhost:5000/api/users/register",
          user
        );
        setLoading(false);
        setsuccess(true);
        setError(false);
        console.log(res.data);
        setname("");
        setemail("");
        setpassword("");
        setconfirmpassword("");
        setphone("");
        window.location.href = '/login'
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    } else {
      alert("Password doesnot matched");
    }
  };

  return (
    <>
    {loading && <Loader />}
      {success && <Success message="Registration Success" />}
    <div className={style.container}>
      {error && <Error />}
          <div className={style.left}><span>Welcome!</span><h1>Our user-friendly interface<br/> ensures efficient management of your accommodation needs.</h1></div>
        <div className={style.right}>
          <div className={style.main}>
          <div className={style.header}>
          <img src={image} alt="profile" className={style.img2}></img>
          <h1>Sign Up</h1>
          </div>
            <div className={style.input_field}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={function (e) {
                setname(e.target.value);
              }}
            />
            <input
              type="number"
              placeholder="Phone Number"
              value={phone}
              onChange={function (e) {
                setphone(e.target.value);
              }}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={function (e) {
                setemail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={function (e) {
                setpassword(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmpassword}
              onChange={function (e) {
                setconfirmpassword(e.target.value);
              }}
            />
            </div>
            <button className={style.button} onClick={handleregister}>
              Submit
            </button>
            <div className={style.login}>
            <p>Already an User?</p>
            <Link to={'/login'} className={style.log}>Login</Link>
            </div>
        </div>
        </div>
    </div>
   </>
  );
}

export default RegisterScreen;


