import React, { useEffect, useState } from 'react';
import axios from "axios";
import Rooms from '../components/Rooms';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { DatePicker, Space } from 'antd'
import 'antd/dist/reset.css';
import moment from 'moment'
import  style from '../styles/home.module.css'


function HomeScreen() {
    const { RangePicker } = DatePicker;
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [fromdate, setfromdate] = useState()
    const [todate, settodate] = useState()
    const [duprooms, setduprooms] = useState()
    const [searchkey, setsearchkey] = useState()
    const user = JSON.parse(localStorage.getItem('currentuser'));
    const [types, settypes] = useState()


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axios.get("http://localhost:5000/api/rooms/getallrooms");
                setRooms(res.data);
                setduprooms(res.data)
                setLoading(false);
            } catch (error) {
                setError(true);
                console.error(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);



    function filterByDate(dates, dateStrings) {
        setfromdate(dateStrings[0]);
        settodate(dateStrings[1]);

        var temprooms = [];

        for (const roomiterator of duprooms) {
            var availability = false; // Reset availability for each room
            if (roomiterator.currentbookings.length > 0) {
                let i = 0;
                console.log(roomiterator.name + ":"  + roomiterator.currentbookings.length)
                for (const booking of roomiterator.currentbookings) {
                    if (dateStrings[0] !== booking.fromdate &&
                        dateStrings[0] !== booking.todate &&
                        dateStrings[1] !== booking.fromdate &&
                        dateStrings[1] !== booking.todate) {
                            availability = true;
                            console.log(roomiterator.name + " " + i++);
                    }

                }
            }
            if (availability === true || roomiterator.currentbookings.length === 0) {
                temprooms.push(roomiterator);
            }
        }


        setRooms(temprooms); // Update rooms state after the loop
    }
    //  console.log(fromdate)


    const filterbysearch = async function () {
        const temprooms = duprooms.filter(room => room.guesthousename.toLowerCase().includes(searchkey.toLowerCase()))

        setRooms(temprooms)
    }


    const filtertype = async function (e) {
        settypes(e)
        if (e !== 'all') {
            const temprooms = duprooms.filter(room => room.types.toLowerCase() === e.toLowerCase())
            setRooms(temprooms)
        }
        else {
            setRooms(duprooms)
        }
    }

    return (
        <div className={style.filter}>
            <div className={style.row}>
            <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
                <div className="col-md-3">
                    <input type="text" className='form-control' placeholder='Search rooms ' value={searchkey} onChange={function (e) {
                        setsearchkey(e.target.value)
                    }} onKeyUp={filterbysearch} />
                </div>

                <div className={style.column}>
                    <p>Type:</p>
                    <select className='form-control' value={types} onChange={function (e) {
                        filtertype(e.target.value)
                    }}>
                        <option value="all">All</option>
                        <option value="delux">Delux</option>
                        <option value="non-delux">Non-Delux</option>
                    </select>
                </div>
            </div>
                <hr/>



            <div className={style.grid}>
                {loading ? (
                    <h1><Loader /></h1>
                ) : (
                    rooms.map(room => (
                        <div className={style.box1} key={room._id}>
                            <Rooms room={room} fromdate={fromdate} todate={todate} />
                        </div>
                    ))
                )}  
            </div>
        </div>
    );
}

export default HomeScreen;