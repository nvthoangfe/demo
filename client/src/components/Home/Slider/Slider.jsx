import React, { useState, useContext } from "react";
import "../../../styles/components/slider.css";
import { Link, NavLink } from "react-router-dom";
import { FiChevronRight, FiChevronsRight } from "react-icons/fi";
import { AuthContext } from "../../../context/AuthContext";

export function SliderHome() {
  return (
    <div className="slider-container fadeInUp animation">
      <span className="subheading"> Chào Mừng Đến Với SpaSimplify </span>
      <h1 className="slider-text">
        SpaSimplify hứa hẹn sẽ đem đến cho bạn <br /> những trải nghiệm tuyệt
        vời khi sử dụng dịch vụ.
      </h1>
      <div className="text-p">
        {/* <p>
          A small river named Duden flows by their place and supplies it <br />{" "}
          with the necessary regelialia. It is a paradisematic country, <br />{" "}
          in which roasted parts of sentences fly into your mouth.
        </p> */}
        <div className="s5-btn" style={{paddingTop: 20}}>
          <Link
            type="submit"
            className="booking-btn"
            style={{ cursor: "pointer" }}
            to='/appointment'
          // onClick={submitHandle}
          >
            Đặt hẹn ngay
          </Link>
        </div>
      </div>
    </div>
  );
}

export function SliderServices({ title }) {
  return (
    <div className="slider-container fadeInUp animation">
      <div className="about-slider">
        <div className="title-about">
          <Link to="/home" className="link">
            <h5>Trang Chủ</h5>
          </Link>
          <FiChevronsRight className="icon-link" />
          <h5>{title}</h5>
          <FiChevronsRight className="icon-link" />
        </div>
        {/* <h1 className="slider-text"> {title}</h1> */}
      </div>
    </div>
  );
}
export function SliderSingleServices({ title, name }) {
  return (
    <div className="slider-container fadeInUp animation">
      <div className="about-slider">
        <div className="title-about">
          <Link to="/home" className="link">
            <h5>Trang Chủ</h5>
          </Link>
          <FiChevronsRight className="icon-link" />
          <Link to="/services" className="link">
            <h5>{title}</h5>
          </Link>

          <FiChevronsRight className="icon-link" />
          <h5>{name}</h5>
        </div>
        <h1 className="slider-text"> {name}</h1>
      </div>
    </div>
  );
}

export function SliderSingleShop({ title, name }) {
  return (
    <div className="slider-container fadeInUp animation">
      <div className="about-slider">
        <div className="title-about">
          <Link to="/home" className="link">
            <h5>Trang Chủ</h5>
          </Link>
          <FiChevronsRight className="icon-link" />
          <Link to="/shop" className="link">
            <h5>{title}</h5>
          </Link>

          <FiChevronsRight className="icon-link" />
          <h5>{name}</h5>
        </div>
        <h1 className="slider-text"> {name}</h1>
      </div>
    </div>
  );
}


export function SliderProfile() {
  // const { user: currentUser } = useContext(AuthContext);
  // const [user, setUser] = useState(currentUser);
  return (
    <div className="slider-container fadeInUp animation profile">
      <div className="about-slider">
        <div className="title-about">
          <Link to="/home" className="link">
            <h5>Trang Chủ</h5>
          </Link>
          <FiChevronsRight className="icon-link" />
          <h5>Hồ Sơ</h5>
          <FiChevronsRight className="icon-link" />
        </div>
        <h1 className="slider-text">Chào Mừng Đến với SPaSimplify</h1>
        <p className="content">
          Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi
        </p>
      </div>
    </div>
  );
}
