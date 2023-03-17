import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Input,
  Button,
} from "reactstrap";
import "../Css/HomePage.css";
import loginImage from "../assets/login.jpg";
import axios from "axios";
import SignUp from "./SignUp";
import { GiSplitCross } from "react-icons/gi";
import { Link } from "react-router-dom";
import { GiEyelashes, GiTiredEye } from "react-icons/gi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const PasswordInput = ({ showPassword, handleClickShowPassword, ...rest }) => {
  return (
    <>
      <div className="password">
        <Input
          {...rest}
          type={showPassword ? "text" : "password"}
          className="textfield"
        />
        <div className="eye" onClick={handleClickShowPassword} edge="end">
          {showPassword ? <GiTiredEye size={25} /> : <GiEyelashes size={25} />}
        </div>
      </div>
    </>
  );
};

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSignup = () => {
    setShowSignup(true);
  };

  const handleCloseSignup = () => {
    setShowSignup(false);
  };

 
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter your email and password");
      return;
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }
    setLoading(true);
    axios
      .post("https://ac-swethasa.vercel.app/users/login", { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        toast.success("Login successful 😍👍 !! Redirecting to dashboard...");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 3000);
        setTimeout(() => {
          localStorage.removeItem('token');
        }, 7200000);
      })
      .catch((err) => {
        if (err.response.data.msg) {
          alert(err.response.data.msg);
        } else {
          alert("An error occurred, please try again");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };


  return (
    <div className="login-container">
      <Card>
       
        <div className="form-container">
          <div className="image-container">
            <img src={loginImage} alt="loading" />
          </div>
          <CardBody>
            <div className="close-button" onClick={handleClose}>
              <GiSplitCross size={20} />
            </div>

            <CardTitle tag="h5" className="text-center mb-4">
              Login
            </CardTitle>

            <form className="form" onSubmit={handleSubmit}>
              <label className="email">Email</label>
        <Input
          required
          autoComplete="username"
          label="Email"
          type="email"
          value={email}
          placeholder="Enter Your Registered Email"
          onChange={(e) => setEmail(e.target.value)}
        /><br></br>
         <label className="password">Password</label>
        <PasswordInput
          autoComplete="current-password"
          required
          label="Password"
          type="password"
          value={password}
          placeholder="Enter Your Password"
          onChange={(e) => setPassword(e.target.value)}
          showPassword={showPassword}
          handleClickShowPassword={handleClickShowPassword}
        /><br></br>
        <Button
          variant="contained"
          color="danger"
          type="submit"
          block
          className="submit"
        >
         {loading ? "Logging In..." : "Log In"}
        </Button> 
        <br></br><br></br>
        
          

             
              <br></br>

              <div className="login-link" onClick={handleSignup}>
                Don't have an account? Sign Up
              </div>
              <Link to="/forgot-password">Forgot Password?</Link>
            </form>
          </CardBody>
        </div>
      </Card>
      {showSignup && <SignUp handleClose={handleCloseSignup} />}
    </div>
  );
};

export default Login;



