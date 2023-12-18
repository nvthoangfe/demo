import React from "react";
import "../../styles/singleService.css";
import TopBar from "../../components/Topbar/TopBar";
import { SliderSingleServices } from "../../components/Home/Slider/Slider";
import Footer from "../../components/Footer/Footer";
import Telephone from "../../components/Appointment/Telephone";
import { AiOutlineArrowDown } from "react-icons/ai";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Scroll from "../../components/ScrollToTop/Scroll";
import FindService from "../../components/Find/FindService";
import { Link } from "react-router-dom";
import ProductCards from "./ProductCards";

export default function Cart() {
  const [data, setData] = useState("");
  const { Name_Service } = useParams();
  const [dataLimit, setDataLimit] = useState([]);

  // find service with name
  useEffect(() => {
    const fetchData = async () => {
      const data = {
        Name_Service: Name_Service,
      };
      const res = await axios.post(
        "http://localhost:8800/api/service/name",
        data
      );
      setData(res.data.value);
    };
    fetchData();

    const fetchLimit = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/service/random",
        data
      );
      setDataLimit(res.data.value);
    };
    fetchLimit();
  }, []);

  return (
    <div className="container">
      <section className="section1">
        <div className="background-image">
          <div className="container-item">
            <TopBar />
          </div>
        </div>
      </section>
      <div className="single-container" style={{ padding: '5% 20%', backgroundColor: '#fff'}}>
          <ProductCards/>
      </div>
         {/* <div className="telephone">
        <Telephone />
      </div> */}
      <Scroll />
      <Footer />
    </div>
  );
}
