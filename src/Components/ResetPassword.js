import React, { useState, useEffect } from "react";
import { Button, Input, Card, CardTitle, CardBody } from "reactstrap";
import { useParams } from "react-router-dom";
import { GiEyelashes, GiTiredEye } from "react-icons/gi";
import Cake from "../assets/Cakeforg.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Preloader from "./Preloader";

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

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (password.length < 8) {
      alert("Password must be 8 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      if (response.ok) {
        toast.success(
          "Password reset successful 😍👍 !! Please login to continue."
        );
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something Went Wrong!!");
    } finally {
      setLoading(false);
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
    <div className="main">
      <Card className="cards">
        <div className="card-container">
          <img src={Cake} alt="loading" className="card-img" />
          <CardBody className="body">
            <CardTitle variant="h6">Reset Password</CardTitle>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                autoComplete="username"
                aria-hidden="true"
                tabIndex="-1"
                style={{ display: "none" }}
              />
            <div className="passwords">
              <PasswordInput
               style={{ width: '5cm'}}
                autoComplete="new-password"
                className="textFields"
                label="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                showPassword={showPassword}
                handleClickShowPassword={handleClickShowPassword}
              /><br></br>
              </div>
              <Button
                className="button"
                type="submit"
                variant="contained"
                color="danger"
                block
              >
              {loading ? "Resetting Password..." : "Reset"}
              </Button>
              {message && window.alert(message)}
            </form>
          </CardBody>
        </div>
      </Card>
    </div>
    </>
      )}
      </>
  );
};

export default ResetPassword;
