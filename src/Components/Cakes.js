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
  Input
} from "reactstrap";
import "../Css/Dashboard.css";
import Logos from "../assets/Logo.png";
import { GiBasket } from "react-icons/gi";
import LogOut from "../Components/LogOut";
import Preloader from "./Preloader";
import {isLoggedIn}  from './auth.js';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cakes(args) {
  const [cakes, setCakes] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedCake, setSelectedCake] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState("");


  const toggleModal = () => setModal(!modal);

  const fetchCakes = async () => {
    const response = await fetch("https://ac-swethasa.vercel.app/cakes");
    const data = await response.json();
    setCakes(data);
  };

  useEffect(() => {
    fetchCakes();
  }, []);

  const handleInfoClick = async (id) => {
    const response = await fetch(`https://ac-swethasa.vercel.app/cakes/${id}`);
    const data = await response.json();
    setSelectedCake(data);
    toggleModal();
  };

 
  
  const handleAddToCart = (cake) => {
    setSelectedCake(cake);
    
    toggleModal();
  };

  const handleAddToCartApi = async (selectedCake) => {
    const id = selectedCake.id;
    const quantity = document.getElementById("quantity").value;
    const token = localStorage.getItem('token');
  
    try {
      console.log('Token:', token);
      console.log('Quantity:', quantity);
      
      const response = await fetch(`https://ac-swethasa.vercel.app/cart/${id}/add-to-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ quantity }),
      });
      if (!quantity) {
        alert("Please enter a quantity.");
        return;
      }
      if(response.ok){
      toast.success("Item added to cart successfully😍👍");}
      else{
      const data = await response.text();
      console.log('Data:', data)
      toast.error(`Error in adding Item to cart! Session Expired Please Login again `);
;}
    } catch (error) {
      console.error(error);
      
    }
  
    toggleModal();
  };
  


const handleRemoveFromCart = async (cake) => {
  if (!cake.id) {
    console.log("Error: cake does not have an id property");
    return;
  }

  const id = cake.id;
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://ac-swethasa.vercel.app/cart/${id}/remove-from-cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });
    
    if (response.status === 200) {
      toast.success("Item removed from cart");
    } else if (response.status === 404) {
      alert("Item not found in cart");
    }

    const data = await response.text();
    console.log(data);
  } catch (error) {
    console.error(error);
    toast.error("Error in removing item from cart");
  }
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
          {...args}
          style={{
            background: "#fff",
            borderRadius: "10px",
            height: "130px",
          }}
          className="navbar container-fluid"
          expand="md"
        >
          <NavbarBrand style={{ color: "#000" }} href="/dashboard">
            <img className="logos" src={Logos} alt="Loading" />
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <div className="navbar-nav-wrapper">
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavbarBrand style={{ color: "black" }} href="/cart">
                 
                      <GiBasket size={40} /><br></br>
                    
                    Basket
                  </NavbarBrand>
                </NavItem>
                <NavItem>
                  <NavbarBrand style={{ cursor: 'pointer' }}>
                  <LogOut/>
                  </NavbarBrand >
                </NavItem>
              </Nav>
            </div>
          </Collapse>
        </Navbar>
            <br></br>
            <div className="row">
              <CarouselImg />
              {cakes.map((cake) => (
                <div className="cardzz col-md-3 " key={cake.id}>
                  <Card>
                    <CardImg
                      className="cakecard"
                      top
                      width="100%"
                      src={cake.image}
                      alt={cake.itemName}
                    />
                    <CardBody>
                      <CardTitle tag="h5">{cake.itemName}</CardTitle>
                      <CardSubtitle
                        tag="h6"
                        className="mb-2"
                      >{`₹${cake.price}`}</CardSubtitle>
                      <CardSubtitle
                        tag="h6"
                        className="mb-2"
                      >{`${cake.description}`}</CardSubtitle>
                    <br></br>
                      <Button onClick={() => handleAddToCart(cake)} color="dark" >
                        Add to Basket
                      </Button>{" "}
                      <Button  onClick={() => handleRemoveFromCart(cake)} color="dark" >
                        Remove from Basket
                      </Button>
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
                {selectedCake.image}
                  {selectedCake.title}
                </ModalHeader>
                <ModalBody>
                  <p>{selectedCake.price}</p>
                  <p>{selectedCake.description}</p>
                </ModalBody>
              </Modal>
              <Modal isOpen={modal} toggle={toggleModal}>
  <ModalHeader toggle={toggleModal}>{selectedCake.itemName}</ModalHeader>
  <ModalBody>
    <img width="130" height="130" className="cakecard" src={selectedCake.image} alt={selectedCake.itemName} />
    <p>{`Price: ₹${selectedCake.price}`}</p>
    <p>{`Description: ${selectedCake.description}`}</p>
    <label htmlFor="quantity">Quantity: </label>
    <Input
      value={quantity}
      onChange={(e) => setQuantity(e.target.value)}
      type="number"
      id="quantity"
      name="quantity"
      min="1"
      required
    />
    <Button color="dark" disabled={!quantity} onClick={() => handleAddToCartApi(selectedCake)}>
      Add to Basket
    </Button>{" "}
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
