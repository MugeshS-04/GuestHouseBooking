import React from 'react'
import { useState, CSSProperties } from "react";
import RingLoader from "react-spinners/RingLoader";

function Loader() {
    
  
      
       let [loading, setLoading] = useState(true);
 

  return (
    <div className='text-center' style={{marginTop:'300px' ,marginLeft:'600px'}}>
    <div className="sweet-loading">
      
   
<RingLoader color="#36d7b7"  loading={loading} css='' size={80}/>
    </div>
    </div>
  )



}

export default Loader
