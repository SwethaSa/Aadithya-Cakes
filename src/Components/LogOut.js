import React, { useState } from "react";
import { NavItem, Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import "../Css/Dashboard.css";
// import Preloader from "./Preloader";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import {RiLogoutBoxRFill} from 'react-icons/ri'


function LogOut(args) {
  // const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);
 

  const logoutUser = () => {
        try {
            localStorage.removeItem('token');
           axios.post('https://ac-swethasa.vercel.app/users/logout');
          window.location.href = '/';
        } catch (error) {
          console.error(error);
        }
      };
      

  return (
   
        <>
          <div>
            <div className="navbar-nav-wrapper">
              <NavItem>
                <div className="logoutt" onClick={() => setModal(true)}>
                  <RiLogoutBoxRFill size={40}/><br></br>
                  Logout
                </div>
                <Modal isOpen={modal} toggle={toggleModal}>
                  <ModalHeader toggle={toggleModal}>
                    Are You Sure? You want to Logout?
                  </ModalHeader>
                  <ModalBody>
                    <Button color="primary" onClick={toggleModal}>
                      No
                    </Button>
                    <Button color="danger" onClick={logoutUser}>
                      Yes
                    </Button>
                  </ModalBody>
                </Modal>
              </NavItem>
            </div>
          </div>
        </>
  );
}

export default LogOut;
