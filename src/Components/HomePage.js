import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Login from "./Login";
import SignUp from "./SignUp";
import Typewriter from "typewriter-effect";
import Preloader from "./Preloader";

function HomePage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleLogin = () => {
    setShowLogin(true);
  };

  const handleSignup = () => {
    setShowSignup(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleCloseSignup = () => {
    setShowSignup(false);
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
          <motion.div
            className="logo"
            whileHover={{ scale: 1, rotate: -20 }}
          >
            Aadithya Cakes
          </motion.div>
          <div className="header">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString("Heyy")
                  .pauseFor(900)
                  .deleteAll()
                  .typeString("Craving Something?")
                  .start();
              }}
            />
          </div>

          <div className="tagline">Don't hesitate to get in</div>
          <div className="btn-container">
            <button onClick={handleLogin} className="login" color="primary">
              Log In
            </button>
            <button onClick={handleSignup} className="signup" color="primary">
              Sign Up
            </button>
          </div>
          {showLogin && <Login handleClose={handleCloseLogin} />}
          {showSignup && <SignUp handleClose={handleCloseSignup} />}
        </>
      )}
    </>
  );
}

export default HomePage;
