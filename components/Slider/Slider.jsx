'use client';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { sliders } from '../../constants/home';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

export const Slider = () => {
  return (
    <Container fluid className="bg-black w-[100%] h-[100%]">
      <Row className="items-center justify-center ">
        <Col>
          <Carousel
            className="my-3"
            showThumbs={false}
            infiniteLoop
            autoPlay
            showStatus={false}
            interval={8000}
            stopOnHover
            emulateTouch
            dynamicHeight
            showArrows
          >
            {sliders?.map((slider, index) => {
              return (
                <img
                  key={index}
                  className="d-block w-full "
                  src={slider.img}
                  alt="image"
                />
              );
            })}
          </Carousel>
        </Col>
        <Col xs lg="4" className="text-center">
          <h1 className="text-[3vmax] text-red-500">Huge Sale</h1>
          <h2 className="text-[2vmax] text-white">Upto 50% off</h2>
          <h2 className="text-[2vmax] text-white">Limited time offer</h2>
        </Col>
      </Row>
    </Container>
  );
};
