import React, { useState, useEffect } from "react";
import { NavItem, Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import "../Css/Dashboard.css";
import Preloader from "./Preloader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


function LogOut(args) {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);
  const navigate = useNavigate();
 

  const logoutUser = () => {
        try {
            localStorage.removeItem('token');
           axios.post('http://localhost:4000/users/logout');
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
                <Button color="danger" onClick={() => setModal(true)}>
                  Logout
                </Button>
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
