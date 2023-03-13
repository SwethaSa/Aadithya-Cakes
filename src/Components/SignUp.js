import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  Input,
  Button,
  FormGroup,
  Label,
} from "reactstrap";
import "../Css/HomePage.css";
import loginImage from "../assets/login.jpg";
import axios from "axios";
import Login from "./Login";
import { GiSplitCross } from "react-icons/gi";
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

const SignUp = ({ handleClose }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };


  
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password || !firstName || !lastName || !phone) {
      alert("All fields are required");
      return;
    }
    if (firstName.length < 3) {
      alert("First name must be at least 5 characters long");
      return;
    }
    if (lastName.length < 3) {
      alert("Last name must be at least 5 characters long");
      return;
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }
    if (phone.length !== 10) {
      alert("Mobile number must be 10 digits long");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/users/signup", {
        email,
        password,
        firstName,
        lastName,
        phone,
      });
      console.log(response);
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setPhone("");
      setLoading(false);
      setShowToast(true);
      toast.success("Sign up successful! Please Login to Continue");
      setShowLogin(true);

    } catch (err) {
      setLoading(false);
      setError(err.response.data.msg);
      toast.error("Sign up failed. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
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
              Sign Up
            </CardTitle>
            <Form className="form">
              <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input
                  required
                  name="firstName"
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input
                  required
                  name="lastName"
                  id="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  required
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="phone">Mobile Number</Label>
                <Input
                  required
                  name="phone"
                  id="phone"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <PasswordInput
                  required
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  showPassword={showPassword}
                  handleClickShowPassword={handleClickShowPassword}
                />
              </FormGroup>
              {error && <p className="text-danger">{error}</p>}
              <Button onClick={handleSubmit} color="danger" className="w-100">
              {loading ? "Creating User..." : "Sign Up"}
              </Button>
            
             

            </Form>
            <div className="login-link" onClick={handleLogin}>
              Already have an account? Log In
            </div>
          </CardBody>
        </div>
      </Card>
      {showLogin && <Login handleClose={handleCloseLogin} />}
    </div>
  );
};
export default SignUp;
