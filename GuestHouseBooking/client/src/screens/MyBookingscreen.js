import React, { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import Loader from '../components/Loader';
import Swal from "sweetalert2"
import { Tag } from 'antd';
import style from '../styles/booking.module.css'

function MyBookingscreen() {
  const user = JSON.parse(localStorage.getItem('currentuser'));
  const [bookings, setbookings] = useState()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.post('http://localhost:5000/api/bookings/getbookingbyuserid', { userid: user._id });
        console.log(response.data);
        setbookings(response.data)
        setLoading(false) // Log 
      } catch (error) {
        setError(error)
        setLoading(false)
        console.error('Error fetching bookings:', error);
      }
    };

    if (user && user._id) {
      fetchData();
    }
  }, []);


  const cancelbooking = async function (bookingid, roomid) {
    try {
      setLoading(true)
      const res = (await axios.post("http://localhost:5000/api/bookings/cancelbooking", { bookingid, roomid })).data
      console.log(res)
      setLoading(false)
      Swal.fire('Congrats', 'Your Booking has Been Cancelled Successfully', 'success').then(res => {
        window.location.reload()
      })
    }
    catch (error) {
      setError(true)
      setLoading(false)
      Swal.fire('Oops', 'Something Went Wrong', 'error')
      console.log(error)

    }
  }
  return (
    <div>
      <div className={style.container}>
          {loading && (<Loader />)}
        <div className={style.column}>
          {bookings && bookings.map(booking => (
            <div className={style.booking}>
              <div className={style.row}>
                <img src={booking.imageurls[0]} alt="booked_image"></img>
              </div>
              <div className={style.content}>
                <h1>{booking.room}</h1>
                <div className={style.date}>
                  <h5>Check In: {booking.fromdate}</h5>
                  <h5>Check Out: {booking.todate}</h5>
                </div>
                <h5>Total Amount: {booking.totalamount}</h5>
                <h5>
                  Status : {
                    booking.status === 'booked' ? (
                      <Tag color="green">Confirmed</Tag>
                    ) : booking.status === 'cancel' ? (
                      <Tag color="red">Cancelled</Tag>
                    ) : (
                      <Tag color="yellow">Pending</Tag>
                    )
                  }
                </h5>


                {booking.status !== 'cancel' && (
                  <div className='text-right'>
                    <button onClick={function () {
                      cancelbooking(booking._id, booking.roomid)
                    }} className={style.button}>Cancel Booking</button>
                  </div>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default MyBookingscreen