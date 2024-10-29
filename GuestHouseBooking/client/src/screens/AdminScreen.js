import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'

import Swal from 'sweetalert2'

const { TabPane } = Tabs

function AdminScreen() {

    useEffect(() => {
        const checkAdmin = async () => {
            const currentUser = JSON.parse(localStorage.getItem('currentuser'));
            console.log(currentUser.isAdmin)
            if (!currentUser.isAdmin) {
                window.location.href = '/home';
            }
        };

        checkAdmin();
    }, []);



    return (
        <div className='mt-3 ml-3  r-3 bs'>
            <b><h2 style={{ fontSize: '30px' }}>Admin Panel</h2></b>
            <Tabs defaultActiveKey='1'>
                <TabPane tab="Bookings of user" key='1'>

                    <Bookings />

                </TabPane>
                <TabPane tab="Rooms" key='2'>

                    <Rooms />

                </TabPane>
                <TabPane tab="Add Rooms" key='3'>

                    <Addroom />


                </TabPane>
                <TabPane tab="Users" key='4'>

                    <Users />

                </TabPane>
                <TabPane tab="Approve" key='5'>


                    <ApproveBooking />
                </TabPane>

            </Tabs>
        </div>
    )
}

export default AdminScreen



export function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [count, setcount] = useState(0)


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await axios.get("http://localhost:5000/api/bookings/getallbooking");
                setBookings(res.data)
                console.log(bookings);
                setLoading(false)
            } catch (error) {
                setError(true)
                setLoading(false)
                console.log(error);
            }
        };

        fetchData();


    }, []);

    return (
        <div className="row">
            <h1 style={{ textAlign: 'center' }}>Bookings</h1>
            <div className="col-md-8">
                {loading && (<Loader />)}


                <table className='table table-bordered table-dark text-center justify-content-center ml-5'>
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Booking Id</th>
                            <th>User Id</th>
                            <th>Room</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings && bookings.map(booking => (
                            <tr key={booking._id}>
                                <td>count</td>
                                <td>{booking._id}</td>
                                <td>{booking.userid}</td>
                                <td>{booking.room}</td>
                                <td>{booking.fromdate}</td>
                                <td>{booking.todate}</td>
                                <td>{booking.status}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>





            </div>
        </div>
    );
}




export function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [count, setcount] = useState(0)


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await axios.get("http://localhost:5000/api/rooms/getallrooms");
                setRooms(res.data)
                console.log(rooms);
                setLoading(false)
            } catch (error) {
                setError(true)
                setLoading(false)
                console.log(error);
            }
        };

        fetchData();


    }, []);

    return (
        <div className="row">
            <h1 style={{ textAlign: 'center' }}>Rooms</h1>
            <div className="col-md-8">
                {loading && (<Loader />)}


                <table className='table table-bordered table-dark text-center justify-content-center ml-5'>
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Room Id</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Rent Per Day</th>
                            <th>Max Count</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms && rooms.map(room => (
                            <tr key={room._id}>
                                <td>count</td>
                                <td>{room._id}</td>
                                <td>{room.guesthousename}</td>
                                <td>{room.types}</td>
                                <td>{room.rentperday}</td>
                                <td>{room.maxcount}</td>
                                <td>{room.phonenumber}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>





            </div>
        </div>
    );
}


export function Users() {
    const [users, setuser] = useState()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await axios.get("http://localhost:5000/api/users/getallusers");
                setuser(res.data)
                setLoading(false)
            } catch (error) {
                setError(true)
                setLoading(false)
                console.log(error);
            }
        };

        fetchData();


    }, []);


    return (

        <div className="row">
            <h1 style={{ textAlign: 'center' }}>Users List</h1>
            <div className="col-md-8">
                {loading && (<Loader />)}


                <table className='table table-bordered table-dark text-center justify-content-center ml-5'>
                    <thead>
                        <tr>
                            <th>SNo</th>
                            <th>User Id</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Is Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map(user => (
                            <tr key={user._id}>
                                <td>count</td>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? 'Yes' : 'No'}</td>

                            </tr>
                        ))}
                    </tbody>

                </table>





            </div>
        </div>
    )

}


export function Addroom() {


    const [guesthousename, setguesthousename] = useState()
    const [rentperday, setrentpreday] = useState()
    const [maxcount, setmaxcount] = useState()
    const [description, setdesc] = useState()
    const [phonenumber, setphone] = useState()
    const [types, settype] = useState()
    const [imageurl1, setimgurl1] = useState()
    const [imageurl2, setimgurl2] = useState()
    const [imageurl3, setimgurl3] = useState()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();


    const addRoom = async function () {
        const newroom = {
            guesthousename,
            rentperday,
            maxcount,
            types,
            description,
            phonenumber,

            imageurls: [imageurl1, imageurl2, imageurl3]

        }
        // console.log(newroom)

        try {
            setLoading(true)
            const res = await axios.post('http://localhost:5000/api/rooms/addroom', newroom)
            console.log(res.data)
            setLoading(false)
            Swal.fire('Congrats', "Your New Room Added Successfully", 'success').then(result => {
                window.location.href = '/home'
            })

        }
        catch (error) {
            setError(true)
            console.log(error)
            setLoading(false)
            Swal.fire('Oops', "Something Went Wrong Try Again", 'error')
        }
    }

    return (
        <div className='row'>
            {loading && <Loader />}
            <h1>Add room</h1>
            <div className="col-md-5">
                <input type="text" className='form-control' placeholder='Room name' value={guesthousename} onChange={function (e) {
                    setguesthousename(e.target.value)
                }} />

                <input type="text" className='form-control' placeholder='Rent per day' value={rentperday} onChange={
                    function (e) {
                        setrentpreday(e.target.value)
                    }
                } />

                <input type="text" className='form-control' placeholder='Maxcount' value={maxcount} onChange={
                    function (e) {
                        setmaxcount(e.target.value)
                    }} />

                <input type="text" className='form-control' placeholder='description'
                    value={description} onChange={
                        function (e) {
                            setdesc(e.target.value)
                        }} />

                <input type="text" className='form-control' placeholder='Phone Number' value={phonenumber} onChange={
                    function (e) {
                        setphone(e.target.value)
                    }} />

            </div>


            <div className="col-md-5">
                <input
                    type="text"
                    className='form-control'
                    placeholder='Type'
                    value={types}
                    onChange={function (e) {
                        settype(e.target.value)  // <-- Issue is here
                    }}
                />

                <input type="text" className='form-control' placeholder='Image Url 1' value={imageurl1} onChange={
                    function (e) {
                        setimgurl1(e.target.value)
                    }} />

                <input type="text" className='form-control' placeholder='Image Url 2' value={imageurl2} onChange={
                    function (e) {
                        setimgurl2(e.target.value)
                    }} />

                <input type="text" className='form-control' placeholder='Image Url 3' value={imageurl3} onChange={
                    function (e) {
                        setimgurl3(e.target.value)
                    }} />

                <div className="text-right">
                    <button className="btn btn-primary mt-2" onClick={addRoom}>Add Room</button>
                </div>

            </div>
        </div>
    )
}

///////////////////////////////////////////////////////////////////////////////
export function ApproveBooking() {

    const [bookings, setBookings] = useState()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {

                setLoading(true)
                const res = await axios.get("http://localhost:5000/api/bookings/getallbooking");
                setBookings(res.data)
                console.log(bookings);
                setLoading(false)

            } catch (error) {

                setError(true)
                setLoading(false)
                console.log(error);
            }
        };

        fetchData();


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


    const approvebooking = async function (bookingid, roomid) {


        try {
            setLoading(true)
            const res = (await axios.post("http://localhost:5000/api/bookings/approvebooking", { bookingid, roomid })).data
            console.log(res)
            setLoading(false)
            Swal.fire('Congrats', 'Your Booking has Been Approved Successfully', 'success').then(res => {
                window.location.reload()
            })
        }
        catch (error) {
            setError(true)
            setLoading(false)
            Swal.fire('Congrats', 'Your Booking has Been Approved  Successfully', 'success').then(res => {
                window.location.reload()
            })
            console.log(error)

        }
         
    }






    return (
        <div className="row">
            <h1 style={{ textAlign: 'center' }}>Bookings</h1>
            <div className="col-md-12">
                {loading && (<Loader />)}


                <table className='table table-bordered table-dark text-center justify-content-center ml-5'>
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Booking Id</th>
                            <th>User Id</th>
                            <th>Room</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Action</th>
                            <th>Status</th>


                        </tr>
                    </thead>
                    <tbody>
                        {bookings && bookings.map(booking => (
                            <tr key={booking._id}>
                                <td>count</td>
                                <td>{booking._id}</td>
                                <td>{booking.userid}</td>
                                <td>{booking.room}</td>
                                <td>{booking.fromdate}</td>
                                <td>{booking.todate}</td>
                                
                                {booking.status === "Pending" ? (
    <td>
        <button className='btn btn-success mx-3' onClick={() => approvebooking(booking._id, booking.roomid)}>Approve</button>
        <button className='btn btn-danger' onClick={() => cancelbooking(booking._id, booking.roomid)}>Cancel booking</button>
    </td>
) : (
    <td>No action</td>
)}
                                <td>{booking.status}</td>

                            </tr>
                        ))}
                    </tbody>

                </table>





            </div>
        </div>
    );
}