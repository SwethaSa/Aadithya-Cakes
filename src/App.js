import HomePage from "./Components/HomePage";
import { Routes, Route } from 'react-router-dom';
import ForgotPassword from "./Components/ForgotPassword.js";
import ResetPassword from "./Components/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Components/Dashboard";
import Cakes from "./Components/Cakes.js"
import CartPage from "./Components/Basket";
import IceCakes from "./Components/IceCakes";
import FondantCakes from "./Components/Fondant.js";

function App() {
 
  
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
       <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        ></Route>
        
        <Route
          path="/dashboard"
          element={<Dashboard />}
        ></Route>
         <Route
          path="/cakes"
          element={<Cakes />}
        ></Route>
        <Route
          path="/icecakes"
          element={< IceCakes/>}
        ></Route>
         <Route
          path="/fondantcakes"
          element={< FondantCakes/>}
        ></Route>
        <Route
          path="/cart"
          element={<CartPage />}
        ></Route>
      </Routes>


    </>
  );
}

export default App;
