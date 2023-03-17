import React, { useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Card
} from "reactstrap";
import "../Css/Dashboard.css";
import Logos from "../assets/Logo.png";
import { GiBasket } from "react-icons/gi";
import Icon1 from "../assets/Cakes.jpg";
import Icon3 from "../assets/Snacks.jpg";
import Icon4 from "../assets/Drinks.jpg";
import Preloader from "./Preloader";
import LogOut from "../Components/LogOut";
import {isLoggedIn}  from './auth.js';
function Dashboard(args) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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
      <div className="bg-main">
        <Navbar
          {...args}
          style={{
            background: "#fff",
            borderRadius: "10px",
            marginTop: "2cm",
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
        <br></br>
        <div
          style={{
            textAlign: "center",
            fontSize: "2cm",
            fontWeight: "bold",
            color: "white",
          }}
        >
          We have
       
      </div>
      <div className="card-containerz">
        <div className="card-containers">
          <div className="tools">
            <div className="icon2">
              <a href="/cakes">
                <img src={Icon1} alt="Loading" className="icon1" />
                <label className="label-icons">Butter Cream</label>
              </a>
            </div>
            <div className="icon2">
              <a href="/icecakes">
                <img src={Icon3} alt="Loading" className="icon3" />
                <label className="label-icons">Fresh Cream</label>
              </a>
            </div>
            <div className="icon2">
              <a href="/fondantcakes">
                <img src={Icon4} alt="Loading" className="icon4" />
                <label className="label-icons">Fondant Cakes</label>
              </a>
            </div>
            
          </div>
        </div>
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

export default Dashboard;
