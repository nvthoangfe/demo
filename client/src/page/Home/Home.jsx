import React, { useState, useEffect } from "react";
import "../../styles/home.css";
import TopBar from "../../components/Topbar/TopBar";
import { SliderHome } from "../../components/Home/Slider/Slider";
import Service from "../../components/Home/Service/Service";
import Pricing from "../../components/Home/Pricing/Pricing";
import Footer from "../../components/Footer/Footer";
import Telephone from "../../components/Appointment/Telephone";
import ReactPlayer from "react-player";
import Scroll from "../../components/ScrollToTop/Scroll";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function Home() {
  const [service, setService] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8800/api/service/limit4");
      setService(res.data.value);
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <section className="section1">
        <div className="background-image">
          <div className="container-item">
            <TopBar />
            <div className="slider">
              <SliderHome />
            </div>
          </div>
        </div>
      </section>

      <section className="section2">
        <div className="text">
          <img
            className="text-img"
            src="https://reina.qodeinteractive.com/wp-content/uploads/2020/09/flower.png"
            alt=""
          />
          <p className="text-1">Chào mừng đến với SpaSimplify</p>
          <p className="text-title">Trung tâm làm đẹp và Spa</p>
          <p className="text-2">
            Phục hồi tâm trí, cơ thể và tinh thần của bạn với các liệu pháp Spa
            sang trọng.
          </p>
          <p className="text-3">
            Chúng tôi luôn đem đến cho quý khách hàng những ưu đãi cùng nhiều
            dịch vụ trải nghiệm mới mẻ
            <br /> nhằm tạo sự thoải mái nhất đối với quý khách hàng khi đến và
            trải nghiệm dịch vụ.
          </p>
        </div>
      </section>
      {/* <div className="about-container">
        <div className="div-image">
          <img
            src="https://exporthub.co/wp-content/uploads/2021/01/Spa-Booking.jpg"
            alt=""
            className="image-about"
          />
        </div>
        <div className="text-about">
          <div className="text-about-mb">
            <span className="subheading">VỀ CHÚNG TÔI</span>
            <p>
              SpaSimplify nằm ở địa chỉ 133 Hàm Nghi, Đà Nẵng. Cơ sở chúng tôi
              luôn đem đến cho quý khách hàng những ưu đãi cùng nhiều dịch vụ
              trải nghiệm mới mẻ, nhằm tạo sự thoải mái nhất đối với quý khách
              hàng khi đến và trải nghiệm dịch vụ.
            </p>
            <p>
              Với các tiêu chí:
              <br />
              1. Đội ngũ nhân viên được đào tạo một cách bài bản. <br />
              2. Dịch vụ đẳng cấp. <br />
              3. Không gian sạch sẻ, thoải mái.
            </p>
            <p>
              Hứa hẹn sẽ là nơi nghỉ ngơi của quý khách hàng sau những giờ làm
              việc mệt mỏi. SpaSimplify rất mong được đón tiếp quý khách hàng.
            </p>
          </div>
        </div>
      </div> */}

      <div className="pricing-container">
        <img
          className="text-img"
          src="https://reina.qodeinteractive.com/wp-content/uploads/2020/09/flower.png"
          alt=""
        />
        <span className="text-title">
          {" "}
          <br />
          Các gói dịch vụ
        </span>

        <div className="pricing-item">
          <Pricing />
        </div>
      </div>

      <section className="section-3">
        <img
          className="section-3-img"
          src="	https://reina.qodeinteractive.com/wp-content/uploads/2020/09/h1-img1.jpg"
          alt=""
        />
        <div>
          <img
            src="https://reina.qodeinteractive.com/wp-content/uploads/2020/09/flower.png"
            alt=""
          />
          <p className="text-title">Sức khỏe & Spa</p>
          <p className="section-3-text">
            Cuộc sống hiện đại cùng với nhiều áp lực khiến con người luôn cảm
            thấy căng thẳng, do đó nhu cầu đến spa để được thư giãn, cân bằng
            sức khỏe ngày càng tăng cao.
          </p>
          <div className="s5-btn" style={{paddingTop: 10}}>
            <NavLink
              type="submit"
              className="booking-btn"
              style={{ cursor: "pointer" }}
              to='/appointment'
            // onClick={submitHandle}
            >
              Đặt lịch hẹn
            </NavLink>
          </div>
        </div>
      </section>

      <section className="section-4">
        <div className="service-container ">
          {service.map((value, index) => (
            <>
              <Service
                title={value.Name_Service}
                p={value.Description}
                image={value.Image}
              />
            </>
          ))}
        </div>
      </section>

      <section className="section-5">
        <div>
          <img
            src="https://reina.qodeinteractive.com/wp-content/uploads/2020/09/flower.png"
            alt=""
          />
          <p className="s5-title">Sức khỏe của bạn</p>
          <p className="s5-text">
            Các liệu pháp spa thường xuyên giúp mang lại giấc ngủ chất lượng
            hơn, ít ngày ốm hơn và cảm giác khỏe mạnh tổng thể. Tham gia một
            ngày spa sẽ giúp bạn sống chậm lại, thư giãn và đạt được sự cân
            bằng.
          </p>
          <div className="s5-btn">
            <NavLink
              type="submit"
              className="booking-btn"
              style={{ cursor: "pointer" }}
              to='/appointment'
            // onClick={submitHandle}
            >
              Đặt lịch hẹn
            </NavLink>
          </div>
        </div>
        <img
          className="s5-img"
          src="https://reina.qodeinteractive.com/wp-content/uploads/2020/09/h1-img2.jpg"
          alt=""
        />
      </section>

         {/* <div className="telephone">
        <Telephone />
      </div> */}
      <Scroll />
      <Footer />
    </div>
  );
}
