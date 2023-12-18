import "./index.css";
import React, { useContext } from "react";
import { FileTextOutlined } from '@ant-design/icons';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./page/Home/Home.jsx";
import Login from "./page/Login/Login";
import Register from "./page/Register/Register";
import Services from "./page/Services/Services";
import Profile from "./page/Profile/Profile";
import Reset from "./page/ResetPassword/Reset";
import Contact from "./page/Contact/Contact";
import Gallery from "./page/Gallenry/Gallery";
import Blog from "./page/Blog/Blog";
import About from "./page/About/About.jsx";
import Appointment from "./page/Appointment/Appointment";
import SingleBlog from "./components/Blog/SingleBlog.jsx";
import SingleService from "./page/Services/SingleService";
import { AuthContext } from "./context/AuthContext";
import Booking from "./page/Booking/Booking";
import Shop from "./page/Shop/Shop";
import DetailProduct from "./page/DetailProduct/DetailProduct.jsx";
import Cart from "./page/Cart/Cart.jsx";
import { FloatButton } from "antd";
import zaloLogo from './img/zaloLogo.png'
import PaymentResult from "./page/Payment/PaymentResult.jsx";
function App() {
  const { user } = useContext(AuthContext);
  function hanleClickZalo(){
    window.location.href = 'https://ant.design/components/float-button'
  }
  return (
    <Router>
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/cart" element={user ? <Cart/> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:Name_Service" element={<SingleService />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<DetailProduct />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
        <Route path="/profile/:Name" element={user ? <Profile /> : <Login />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/appointment" element={<Appointment />} />
        <Route exact path="/vnpay/return" element={<PaymentResult />} />
        {/* use Navigate  */}
        <Route path="/" element={<Navigate replace to="/home" />} />
      </Routes>
      <FloatButton
      icon={<img src={zaloLogo} style={{width: '100%', height: '100%'}} alt='logo' />}
      onClick={hanleClickZalo}
      style={{
        bottom: 130,
        right: 32,
        width: 40,
        height: 40,
        padding:0
      }}
    />
    </Router>
  );
}

export default App;
