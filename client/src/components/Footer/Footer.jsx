import React from "react";
import "../../styles/components/footer.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import ImgLogo from "../../../src/img/logooo.png";

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <img src={ImgLogo} alt="" />
        <h1>SPASIMPLIFY</h1>
        <span>133 Hàm Nghi, Vĩnh Trung, Thanh Khê, Đà Nẵng.</span>
        <span>spasimplify@gmail.com</span>
        <span>0354147475</span>
      </div>
      <div className="footer-last">
        <FaFacebookF />
        <FaInstagram />
        <FaTwitter />
        <FaYoutube />
      </div>
    </div>
  );
}
