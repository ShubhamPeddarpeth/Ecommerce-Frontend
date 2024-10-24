'use client';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, InputGroup, Form, Button } from 'react-bootstrap';
import { FaFacebook, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';
import './footer.css';

 const Footer = () => {
  return (
    <footer className="footer">
      <Container className="mb-0">
        <Row className="pt-4">
          <Col className="mb-4" xs={12} md={6} lg={3}>
            <div className="footer-logo">
              <div className="flex items-center">
                <h5 className="m-0 text-[1.2vmax]">Ecommerce Store</h5>
              </div>
              <p className="text-[.9vmax] text-justify pt-[1vmax]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta,
                magni perferendis fuga dolore maxime ex aperiam iure voluptate
                nemo mollitia!
              </p>
            </div>
          </Col>
          <Col xs={12} md={6} lg={3} className="mb-4">
            <div className="footer-column">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text">
                    Shop
                  </a>
                </li>
		 <li>
                  <a href="#" className="text">
                    Contact{" "}
                  </a>
                </li>
                <li>
                  <a href="#" className="text">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </Col>
          <Col xs={12} md={6} lg={3} className="mb-4 ">
            <div className="footer-column">
              <h5>Contact</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text">
                    91 (0) 000 0000000 <br />
                    ecommercestore123@gmail.com <br /> Bengaluru , India
                  </a>
                </li>
              </ul>
            </div>
          </Col>
          <Col xs={12} md={6} lg={3} className="mb-4">
            <div className="footer-column">
              <h5>Get in touch</h5>
              <div className="social-icons text-[2vmax]">
                <FaFacebook  className="mr-3"/>
                <FaLinkedin  className="mr-3"/>
                <FaInstagram  className="mr-3"/>
                <FaTwitter  className="mr-3"/>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="footer-bottom">
          <div className="pt-1 flex">
            <p className="m-0 flex-1 text-center text-[.9vmax]">
              &copy; 2024 , All right reserved
            </p>
          </div>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer