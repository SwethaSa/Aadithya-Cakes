import React, { useState, useEffect } from "react";

import {
  Card,
  CardBody,
  CardTitle,
  Form,
  Input,
  Button,
  FormGroup,
} from "reactstrap";
import "../Css/HomePage.css";
import axios from "axios";
import Login from "./Login";
import Cake from "../assets/Cakeforg.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Preloader from "./Preloader";

const ForgotPassword = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleLogin = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your registered email.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4000/forgot-password",
        { email }
      );
      setEmail("");
      setLoading(false);

      toast.success(response.data.message);
    } catch (error) {
      setLoading(false);
      console.error(error);
      console.log("Server error");
      toast.error("Something went wrong. Please try again later.");
    }
  };

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
    <div className="login-container">
      <Card>
        <div className="form-container">
          <div className="image-container">
            <img src={Cake} alt="loading" />
          </div>
          <CardBody>
            <CardTitle tag="h5" className="text-center mb-4">
              Forgot Password?
            </CardTitle>

            <Form className="form" onSubmit={handleSubmit}>
              <FormGroup>
                <label className="email">Enter Email</label>
                <Input
                  required
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  placeholder="Enter Your Registered Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>

              <Button
                variant="contained"
                color="danger"
                type="submit"
                fullWidth
                block
                className="submit"
              >
                {loading ? "Sending Mail..." : "Get Password Reset Link"}
              </Button>

              <div className="login-link" onClick={handleLogin}>
                Remember Password? Log In
              </div>
            </Form>
          </CardBody>
        </div>
      </Card>
      {showLogin && <Login handleClose={handleCloseLogin} />}
    </div>
    </>
      )}
      </>
  );
};

export default ForgotPassword;
