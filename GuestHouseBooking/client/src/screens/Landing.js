import React from "react";
import { Link } from "react-router-dom";
import style from "../styles/landing.module.css";
import video from "../assets/mixkit-man-putting-on-virtual-reality-glasses-43597-4k.mp4";
function Landing() {
  return (
    <div className={style.container}>
      <video autoPlay muted loop>
        <source src={video}/>
      </video>
      <div className={style.overlay}>
        <h2>Pick your Choice</h2> 
        <Link to={"/home"}>
            <button className={style.button}>Visualize</button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
