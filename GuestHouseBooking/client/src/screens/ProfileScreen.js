import React, { useEffect } from 'react'
import axios from 'axios';
import { Tabs } from 'antd';
import MyBookingscreen from './MyBookingscreen';


const {TabPane} = Tabs

function ProfileScreen() {

    const user = JSON.parse(localStorage.getItem('currentuser'))


    useEffect(function()
  {
     if(!user)
     {
        window.location.href("/login")
     }
  },[]) 



  return (
    <div className='ml-3 mt-3'>
        <Tabs
    defaultActiveKey="2"
  >
    <TabPane tab="Profile" key="1">
         <h1>My Profile </h1>
         <br/>
         <h1>Name : {user.name}</h1>
         <h1>Email : {user.email} </h1>
         <h1>Category : {user.isAdmin ? 'Admin' : 'Customer'} </h1>
         <h1>Mobile : {user.phone}</h1>
    </TabPane>
    <TabPane tab="Bookings" key="2">
         <MyBookingscreen/>
    </TabPane>


  </Tabs>
    </div>
  )
}

export default ProfileScreen


