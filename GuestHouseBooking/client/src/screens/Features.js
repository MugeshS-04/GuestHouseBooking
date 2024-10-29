import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

function Features() {
 
  const carouselContainerStyle = {
    position: 'fixed',
    top: 0,
    
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1, 
  };

  const carouselItemStyle = {
    height: '100vh', 
  };

  return (
    <div style={carouselContainerStyle}>
      <Carousel fade>
        <Carousel.Item style={carouselItemStyle}>
          <img
            className="d-block w-100"
            src="/images/g1.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
           <h2 style={{color:'black'}}><b>Both Delux And Non delux Rooms Available</b></h2>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={carouselItemStyle}>
          <img
            className="d-block w-100"
            src="/images/g2.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h2><b>Food Service</b></h2>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={carouselItemStyle}>
          <img
            className="d-block w-100"
            src="/images/g3.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h2><b>Single Call for Service</b></h2>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Features;