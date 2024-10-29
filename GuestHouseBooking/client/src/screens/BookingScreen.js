// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Loader from '../components/Loader';
// import Error from '../components/Error';
// import Success from '../components/Success';
// import moment from 'moment';
// import StripeCheckout from 'react-stripe-checkout'
// import Swal from "sweetalert2"


// function BookingScreen() {
//     const user = JSON.parse(localStorage.getItem('currentuser'));
//     const { roomid } = useParams();
//     const { fromdate } = useParams()
//     const { todate } = useParams()
//     const fromDateMoment = moment(fromdate, 'DD-MM-YYYY');
//     const toDateMoment = moment(todate, 'DD-MM-YYYY');


//     var totalDays = toDateMoment.diff(fromDateMoment, 'days');
//     totalDays = totalDays + 1

//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(false);
//     const [room, setRoom] = useState(null);
//     const [totalamount, settotal] = useState()



//     useEffect(() => {

//         if (!user) {
//             window.location.href = '/login' ///not working 
//         }


//         const fetchRoomById = async () => {
//             try {
//                 setLoading(true);
//                 const res = await axios.post("http://localhost:5000/api/rooms/getroombyid", { roomid });
//                 setRoom(res.data);
//                 console.log(totalDays) ////////////////////////////////////////////////////////////////////////////moment object
//                 settotal(res.data.rentperday * totalDays)
//                 setLoading(false);
//             } catch (error) {
//                 setError(true);
//                 console.error(error);
//                 setLoading(false);
//             }
//         };

//         fetchRoomById();
//     }, [roomid]);


//     if (!room) {
//         return (
//             <div className='container'>
//                 {loading ? <h1><Loader /></h1> : error ? <Error /> : null}
//             </div>
//         );
//     }



//     const onToken = async function (token) {
//         console.log(token)
//         try {
//             setLoading(true)
//             const bookdetails = {
//                 room,
//                 userid: JSON.parse(localStorage.getItem('currentuser'))._id,
//                 fromdate,
//                 todate,
//                 totalamount,
//                 totalDays,
//                 token,
//                 imageurls: room.imageurls

//             }
//             console.log(bookdetails)
//             const res = await axios.post('http://localhost:5000/api/bookings/bookroom', bookdetails)
//             setLoading(false)
//             Swal.fire("Congrats ", "your room boooked successfully", 'success').then(
//                 res => {
//                     window.location.href = '/profile'
//                 }
//             )
//         }
//         catch (error) {
//             setError(true)
//             setLoading(false)
//             Swal.fire('Congrats', "Something went wrong", 'error')
//             console.log(error)
//         }
//     }

//     return (
//         <div className='container m-5'>
//             <Success />
//             <div>
//                 <h1>{room.guesthousename}</h1>
//                 <div className="row justify-content-center mt-5 bs">
//                     <div className="col-md-5 mt-2 mb-2 ">
//                         <img src={room.imageurls[0]} alt="" className='bigimg' />
//                     </div>

//                     <div className="col-md-5">
//                         <div style={{ textAlign: "right" }}>
//                             <h5>BookingDetails</h5>
//                             <hr />
//                             <b>
//                                 <p>Name : {JSON.parse(localStorage.getItem('currentuser')).name} </p>
//                                 <p>From Date : {fromdate}   </p>
//                                 <p>To Date {todate}</p>
//                                 <p>Max Count : {room.maxcount} </p>
//                                 <select name="guest" id="guest">
//                                     <option value="chief_guest">Chief_Guest</option>
//                                     <option value="alumini">Alumini</option>
//                                 </select>
//                             </b>
//                         </div>

//                         <div style={{ textAlign: 'right' }}>
//                             <b>
//                                 <h1>
//                                     Amount
//                                 </h1>
//                                 <hr />
//                                 <p>Total Days :{totalDays}  </p>
//                                 <p>Rent Per Day: {room.rentperday}</p>
//                                 <h4>Total Amount :{totalDays * room.rentperday} </h4></b>
//                         </div>

//                         <div style={{ float: 'right' }}>

//                             <StripeCheckout
//                                 token={onToken}
//                                 amount={totalamount * 100}
//                                 stripeKey="pk_test_51PA5GUSFzceLDgj2NACSZD0YI1rAf08ccP9agXruaiuKq4Vk9emgNVLxGTlmDktD8rqGdwFJJgATj1xFiWxp5Fgx00AvUH8Ago"
//                                 currency='INR'
//                             >
//                                 <button className='btn btn-primary'>Pay Now</button>
//                             </StripeCheckout>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </div>

//     );
// }




// export default BookingScreen
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import Swal from "sweetalert2";
import style from '../styles/bookingscreen.module.css'
function BookingScreen() {
    const user = JSON.parse(localStorage.getItem('currentuser'));
    const { roomid, fromdate, todate } = useParams();
    const fromDateMoment = moment(fromdate, 'DD-MM-YYYY');
    const toDateMoment = moment(todate, 'DD-MM-YYYY');
    const [totalDays, setTotalDays] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [room, setRoom] = useState(null);
    const [totalamount, setTotalAmount] = useState(0);
    const [guestType, setGuestType] = useState("chief_guest");

    useEffect(() => {
        if (!user) {
            window.location.href = '/login';
        }

        const fetchRoomById = async () => {
            try {
                setLoading(true);
                const res = await axios.post("http://localhost:5000/api/rooms/getroombyid", { roomid });
                setRoom(res.data);
                const days = toDateMoment.diff(fromDateMoment, 'days') + 1;
                setTotalDays(days);
                setTotalAmount(res.data.rentperday * days);
                setLoading(false);
            } catch (error) {
                setError(true);
                console.error(error);
                setLoading(false);
            }
        };

        fetchRoomById();
    }, [roomid]);


const handlePayment = async function()
{
    try {
        setLoading(true);
        const bookdetails = {
            room,
            userid: JSON.parse(localStorage.getItem('currentuser'))._id,
            fromdate,
            todate,
            totalamount,
            totalDays,
            imageurls: room.imageurls
        };

        const res = await axios.post('http://localhost:5000/api/bookings/bookroom', bookdetails);
        setLoading(false);

        Swal.fire("Congrats ", "Your room booked successfully", 'success').then(() => {
            window.location.href = '/profile';
        });
    } catch (error) {
        setError(true);
        setLoading(false);
        Swal.fire('Error', "Something went wrong", 'error');
        console.log(error);
    }

}


    const onToken = async token => {

        console.log(token);
        try {
            setLoading(true);
            const bookdetails = {
                room,
                userid: JSON.parse(localStorage.getItem('currentuser'))._id,
                fromdate,
                todate,
                totalamount,
                totalDays,
                imageurls: room.imageurls
            };

            const res = await axios.post('http://localhost:5000/api/bookings/bookroom', bookdetails);
            setLoading(false);

            Swal.fire("Congrats ", "Your room booked successfully", 'success').then(() => {
                window.location.href = '/profile';
            });
        } catch (error) {
            setError(true);
            setLoading(false);
            Swal.fire('Error', "Something went wrong", 'error');
            console.log(error);
        }

    };

    return (
        <div className={style.container}>

            <div className={style.row}>
                <div className={style.left}>

                    <img src={room && room.imageurls[0]} alt="" className={style.bigimg} />
                </div>

                <div className={style.right}>
                    <h3>{room && room.guesthousename}</h3>

                    <h5>Booking Details</h5>

                    <b>
                        <p>Name : {user && user.name} </p>
                        <p>From Date : {fromdate}   </p>
                        <p>To Date {todate}</p>
                        <p>Max Count : {room && room.maxcount} </p>
                        <select name="guest" id="guest" onChange={e => setGuestType(e.target.value)}>
                            <option value="chief_guest">Chief_Guest</option>
                            <option value="alumini">Alumini</option>
                        </select>
                    </b>





                    {guestType === "alumini" ? (
                        <div>
                            <StripeCheckout
                                token={onToken}
                                amount={totalamount * 100}
                                stripeKey="pk_test_51P9lghSIjX8vul5aYLT9ydnuMcjeiwjGUPaMFBbIYpuORg958nCnn1Ma89bxRkUGCjvHeihxCBsldxTNNhXwqbjt00O8dVj6eX"
                                currency='INR'
                            >
                                <div style={{ textAlign: 'right' }}>
                                    <b>
                                        <h1>
                                            Amount
                                        </h1>
                                        <hr />
                                        <p>Total Days : {totalDays}  </p>
                                        <p>Rent Per Day: {room && room.rentperday}</p>
                                        <h4>Total Amount : {totalamount} </h4>
                                    </b>
                                </div>

                                <button className='btn btn-primary' >Pay Now</button>
                            </StripeCheckout>
                        </div>
                    ) : (
                        <button className='btn btn-primary' onClick={handlePayment}>Book Now</button>
                    )}
                </div>
            </div>


        </div>


    );
}

export default BookingScreen;
