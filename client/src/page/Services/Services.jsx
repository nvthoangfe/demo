import React from "react";
import "../../styles/services.css";
import TopBar from "../../components/Topbar/TopBar";
import { SliderServices } from "../../components/Home/Slider/Slider";
import Footer from "../../components/Footer/Footer";
import Telephone from "../../components/Appointment/Telephone";
import Category from "../../components/Category/Category";
import axios from "axios";
import { useState, useEffect } from "react";
import Scroll from "../../components/ScrollToTop/Scroll";
import FindService from "../../components/Find/FindService";

export default function Services() {
  const [dataServices, setDataServices] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [beard, setBeard] = useState([]);
  const [curling, setCurling] = useState([]);
  const [dye, setDye] = useState([]);
  const [takeEar, setTakeEar] = useState([]);
  const [shampoo, setShampoo] = useState([]);
  const [shave, setShave] = useState([]);
  const [hairCare, setHairCare] = useState([]);

  useEffect(() => {
    if (dataServices.length > 0) {
      const listCategory = Array.from(new Set(dataServices?.map((item) => item?.Category)))
      setListCategory(listCategory);
    }
  }, [dataServices])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await axios.get(
  //       "http://localhost:8800/api/service/category?Category=CẮT TÓC"
  //     );
  //     setHairCut(res.data.value);
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await axios.get(
  //       "http://localhost:8800/api/service/category?Category=Beard Trim"
  //     );
  //     setBeard(res.data.value);
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await axios.get(
  //       "http://localhost:8800/api/service/category?Category=Curling hair"
  //     );
  //     setCurling(res.data.value);
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8800/api/service/all");
      setDataServices(res.data.value);
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await axios.get(
  //       "http://localhost:8800/api/service/category?Category=Shave"
  //     );
  //     setShave(res.data.value);
  //   };
  //   fetchData();
  // }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await axios.get(
  //       "http://localhost:8800/api/service/category?Category=Shampoo"
  //     );
  //     setShampoo(res.data.value);
  //   };
  //   fetchData();
  // }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await axios.get(
  //       "http://localhost:8800/api/service/category?Category=Take Earwax"
  //     );
  //     setTakeEar(res.data.value);
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await axios.get(
  //       "http://localhost:8800/api/service/category?Category=Hair Care"
  //     );
  //     setHairCare(res.data.value);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className="container">
      <section className="section1">
        <div className="background-image">
          <div className="container-item">
            <TopBar />
            <SliderServices title="Dịch vụ" />
          </div>
        </div>
        <FindService />
      </section>
      <div className="services-container">
        {listCategory?.map((category, index) => (
          <div className="category" key={index}>
            <div className="title-category">
              <h3>{category}</h3>
            </div>
            <div className="div-service">
              {dataServices
                ?.filter((item) => item?.Category === category)
                .map((service, serviceIndex) => (
                  <Category
                    key={serviceIndex}
                    image={service?.Image}
                    name={service?.Name_Service}
                    description={service?.Description}
                    price={service?.Price}
                  />
                ))}
            </div>
          </div>
        ))}


      </div>

         {/* <div className="telephone">
        <Telephone />
      </div> */}
      <Scroll />
      <Footer />
    </div>
  );
}
