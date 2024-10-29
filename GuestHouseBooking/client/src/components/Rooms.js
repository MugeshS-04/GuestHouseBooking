import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Carousel, CarouselCaption, CarouselItem } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import style from '../styles/home.module.css'

function Rooms({ room, fromdate, todate }) { //props

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);





  return (
    <div className={style.contents}>
      <img src={room.imageurls[0]} className='smallimg' onClick={handleShow}/>
      <span className={style.tooltip_text}>Click me</span>
      <div className={style.box}>
        <h1>{room.guesthousename}</h1>
        <p>Max Count: {room.maxcount}</p>
        <p>Phone Number :{room.phonenumber}</p>
        <div className={style.buttons}>
          <p>{room.types}</p>
      <p style={{ float: 'right', justifyContent: 'space-between' }}>
        {(fromdate && todate) && (<Link to={`/book/${room._id}/${fromdate}/${todate}`}><button className={style.book_button}>Book Now</button></Link>)}
      </p>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header >
          <Modal.Title>{room.guesthousename}</Modal.Title>
        </Modal.Header>
        <Modal.Body>



          <Carousel fade>

            <Carousel.Item>
              <img src="/images/g1.jpg" alt="" className='d-block w-100 bigimg' />
              <CarouselCaption>
                first
              </CarouselCaption>
            </Carousel.Item>

            <Carousel.Item>
              <img src="/images/g1.jpg" alt="" className='d-block w-100 bigimg' />
              <CarouselCaption>
                Second
              </CarouselCaption>
            </Carousel.Item>

            <Carousel.Item>
              <img src="/images/g1.jpg" alt="" className='d-block w-100 bigimg' />
              <CarouselCaption>
                third
              </CarouselCaption>
            </Carousel.Item>


            {/* {room.imageurls.map(url => {
              return <Carousel.Item>
                <img src={url} alt="" className='d-block w-100 bigimg' />
                <CarouselCaption>
                  imagees1212123
                </CarouselCaption>
              </Carousel.Item>
            })} */}

          </Carousel>



        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}


export default Rooms
