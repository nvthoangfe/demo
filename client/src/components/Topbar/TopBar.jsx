import React, { useState, useContext } from "react";
import "../../styles/components/topBar.css";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router";
import ImgLogo from "../../../src/img/logooo.png";
import { useSelector } from "react-redux";

export default function TopBar() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  const [isOpen, setIsOpen] = useState(false);
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 40) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeBackground);

  const history = useNavigate();
  // Log out button
  const LogoutHandle = () => {
    window.sessionStorage.clear();
    window.location.reload();
    history("/login");
  };
  const cartList = useSelector((state) => state?.cart?.cartItems);

  return (
    <div className={navbar ? "topBar action" : "topBar"}>
      <div className="top-topBar">
        <div className="left-topBar">
          {/* <div className="mail">
            <span className="mailus">Phone:</span>
            <label className="label-topBar"> 0786963376</label>
            <span className="mailus"> or email us: </span>
            <label className="label-topBar"> BookingSpa.ad@gmail.com</label>
          </div> */}
        </div>
        <div className="right-topBar"></div>
      </div>
      <div className="bottom-topBar">
        <div className="logo">
          <img src={ImgLogo} alt="" />
          <h5 className="logo">SPASIMPLIFY</h5>
        </div>
        <div className={`navigation-menu ${isOpen && "open"}`}>
          <div className="items-link">
            <NavLink className="link" to="/home">
              Trang Chủ
            </NavLink>
          </div>
          <div className="items-link">
            <NavLink className="link" to={`/appointment`}>
              Đặt Hẹn
            </NavLink>
          </div>
          <div className="items-link">
            <NavLink className="link" to="/services">
              Dịch vụ
            </NavLink>
          </div>
          {/* <div className="items-link">
            <NavLink className="link" to="/gallery">
              Gallery
            </NavLink>
          </div> */}
          {/* <div className="items-link">
            <NavLink className="link" to="/blog">
              Tin Tức
            </NavLink>
          </div> */}
          <div className="items-link">
            <NavLink className="link" to="/shop">
              Cửa Hàng
            </NavLink>
          </div>
          <div className="items-link">
            <NavLink className="link" to="/contact">
              Liên hệ
            </NavLink>
          </div>
        </div>
        <div className="login-topBar">
          <span> </span>
          {user ? (
            <>
              <div className="items-link">
                <NavLink className="link" to="/cart">
                  <i class="fas fa-shopping-cart fa-lg" style={{color: '#5d646f', fontSize: 28, paddingRight: 20,marginTop: 10}}></i>
                  <span className="cart-badge">{cartList?.length ?? 0}</span>
                </NavLink>
              </div>
              <div className="items-topBar">
                <div className="top-dropdown">
                  <div className="top-dropdown-select">
                    <NavLink
                      to={`/profile/${user.Name_Customer}`}
                      className="link"
                    >
                      {user.Name_Customer}
                    </NavLink>
                    <img src={user.Image} alt="" className="image-item" />
                  </div>
                  <ul className="top-dropdown-list">
                    <li className="top-dropdown-item">
                      <MdAccountCircle className="icon" />
                      <Link
                        to={`/profile/${user.Name_Customer}`}
                        className="link"
                      >
                        <span className="dropdown-text">Hồ sơ của tôi</span>
                      </Link>
                    </li>

                    <li className="top-dropdown-item" onClick={LogoutHandle}>
                      <MdLogout className="icon" />
                      <span className="dropdown-text">Đăng Xuất</span>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <div className="login-div">
              <NavLink className="link" to="/login">
                Đăng Nhập
              </NavLink>
            </div>
          )}
        </div>
        <div
          className={`burger ${isOpen && "open"}`}
          id="burger"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="bar"></div>
        </div>
      </div>
    </div >
  );
}
