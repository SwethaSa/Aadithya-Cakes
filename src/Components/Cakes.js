import React, { useState, useEffect } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { HiInformationCircle } from "react-icons/hi";
import "../Css/Cakes.css";
import CarouselImg from "./Carousel.js";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";
import "../Css/Dashboard.css";
import Logos from "../assets/Logo.png";
import { GiBasket } from "react-icons/gi";
import { BsPersonLinesFill } from "react-icons/bs";
import Preloader from "./Preloader";
import {isLoggedIn}  from './auth.js';

const API_URL = "http://localhost:4000/cakes";

function Cakes() {
  const [cakes, setCakes] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedCake, setSelectedCake] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
 

  const toggleModal = () => setModal(!modal);

  const fetchCakes = async () => {
    const response = await fetch("http://localhost:4000/cakes");
    const data = await response.json();
    setCakes(data);
  };

  useEffect(() => {
    fetchCakes();
  }, []);

  const handleInfoClick = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    setSelectedCake(data);
    toggleModal();
  };

 

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Preloader />}
      {!loading && (
        <>
        {isLoggedIn() ? (
          <div className="navi">
            <Navbar
              style={{
                backgroundImage: "linear-gradient(to right, #fff, #000)",
                borderRadius: "10px",
                height: "130px",
              }}
              className="navbar container-fluid"
              expand="md"
            >
              <NavbarBrand style={{ color: "#000" }} href="/dashboard">
                <img className="logos" src={Logos} alt="Loading" />
              </NavbarBrand>
              <NavbarToggler style={{color: "white", backgroundColor: "white"}} onClick={toggle} />
              <Collapse isOpen={isOpen} navbar>
                <div className="navbar-nav-wrapper">
                  <Nav className="mr-auto" navbar>
                    <NavItem>
                      <NavbarBrand
                        style={{ color: "white" }}
                        href="/components/"
                      >
                        <div>
                          <BsPersonLinesFill size={40} />
                        </div>
                        Profile
                      </NavbarBrand>
                    </NavItem>
                    <NavItem>
                      <NavbarBrand style={{ color: "white" }} href="">
                        <div>
                          <GiBasket size={40} />
                         
                        </div>
                        Bag
                      </NavbarBrand>
                    </NavItem>
                  </Nav>
                </div>
              </Collapse>
            </Navbar>
            <br></br>
            <div className="row">
              <CarouselImg />
              {cakes.map((cake) => (
                <div className="cardzz col-md-3 mb-3" key={cake.id}>
                  <Card>
                    <CardImg
                      className="cakecard"
                      top
                      width="100%"
                      src={cake.image}
                      alt={cake.title}
                    />
                    <CardBody>
                      <CardTitle tag="h5">{cake.title}</CardTitle>
                      <CardSubtitle
                        tag="h6"
                        className="mb-2"
                      >{`$${cake.price}`}</CardSubtitle>
                      <div className="formControl">
            <CardTitle id="status-label">Customize</CardTitle>
            <select
  className="status-select"

>
  <option value="New">New</option>
  <option value="Contacted">Contacted</option>
  <option value="Qualified">Qualified</option>
  <option value="Lost">Lost</option>
  <option value="Canceled">Canceled</option>
  <option value="Confirmed">Confirmed</option>
</select>

          </div><br></br>
                      <Button color="dark" >
                        Add to Basket
                      </Button>{" "}
                      <Button color="dark" onClick={() => handleInfoClick(cake.id)}>
                        <i>
                          <HiInformationCircle />
                        </i>
                      </Button>
                    </CardBody>
                  </Card>
                </div>
              ))}
              <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>
                  {selectedCake.title}
                </ModalHeader>
                <ModalBody>
                  <p>{selectedCake.price}</p>
                  <p>{selectedCake.description}</p>
                </ModalBody>
              </Modal>
            </div>
          </div>
           ) : (

            <Card style={{height: "2cm", width: "15cm", textAlign: "center", fontSize: "1cm", marginLeft: "11cm", marginTop: "8cm" }} >Please Login To Continue</Card>
         )
      }
        </>
      )}
    </>
  );
}

export default Cakes;
