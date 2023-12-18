import React, { useState } from "react";
import TopBar from "../../components/Topbar/TopBar";
import { SliderServices } from "../../components/Home/Slider/Slider";
import Footer from "../../components/Footer/Footer";
import Telephone from "../../components/Appointment/Telephone";
import "../../styles/contact.css";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { GiEarthAmerica } from "react-icons/gi";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Scroll from "../../components/ScrollToTop/Scroll";
export default function Contact() {
  //declaration fields in form
  const [inputField, setInputField] = useState({
    Name: "",
    Email: "",
    Subject: "",
    Message: "",
  });
  const InputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  // handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const customer = {
      Name: inputField.Name,
      Subject: inputField.Subject,
      Email: inputField.Email,
      Message: inputField.Message,
    };
    try {
      const response = await axios.post(
        "http://localhost:8800/api/contact/add",
        customer
      );
      if (response.data.status === 500) {
        toast.error(response.data.message);
        // toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
        setInputField({ Name: "", Email: "", Subject: "", Message: "" });
      }
    } catch (err) {
      toast.error("Văn bản không hợp lệ!");
    }
  };

  return (
    <div className="container">
      <section className="section1">
        <div className="background-image">
          <div className="container-item">
            <TopBar />
            <SliderServices title="Liên Hệ" />
          </div>
        </div>
      </section>
      <div className="contact">
        <ToastContainer />
        <div className="contact-container">
          <div className="contact-left">
            <div className="contact-items">
              <h3 className="contact-header"> Liên hệ chúng tôi </h3>
              <div className="contact-item">
                <div className="contact-icon">
                  <span>
                    <FaMapMarkerAlt />
                  </span>
                </div>
                <div className="contact-text">
                  <p>
                    <b>Địa chỉ: </b>
                    Đà Nẵng
                  </p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <span>
                    <FaPhoneAlt />
                  </span>
                </div>
                <div className="contact-text">
                  <p>
                    <b>Số điện thoại: </b>
                    0354147475
                  </p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <span>
                    <FiSend />
                  </span>
                </div>
                <div className="contact-text">
                  <p>
                    <b>Email: </b>
                    nthoang1804@gmail.com
                  </p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <span>
                    <GiEarthAmerica />
                  </span>
                </div>
                <div className="contact-text">
                  <p>
                    <b>Website: Spasimplify.vn</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-right">
            <div className="contact-items">
              <h3 className="contact-header-black"> Liên lạc</h3>
              <form action="">
                <div className="contact-form">
                  <input
                    type="text"
                    id="name"
                    placeholder="Tên"
                    name="Name"
                    value={inputField.Name}
                    onChange={InputHandler}
                  />
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    name="Email"
                    value={inputField.Email}
                    onChange={InputHandler}
                  />
                </div>
                <div className="contact-form">
                  <input
                    type="text"
                    id="subject"
                    placeholder="Tiêu đề"
                    name="Subject"
                    value={inputField.Subject}
                    onChange={InputHandler}
                  />
                </div>
                <div className="contact-form">
                  <textarea
                    name="Message"
                    id="textarea"
                    cols="30"
                    rows="10"
                    placeholder="Tin nhắn"
                    value={inputField.Message}
                    onChange={InputHandler}
                  ></textarea>
                </div>
                <div className="contact-form">
                  <button onClick={handleSubmit}> Gửi tin nhắn </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

         {/* <div className="telephone">
        <Telephone />
      </div> */}
      <Scroll />
      <Footer />
    </div>
  );
}
