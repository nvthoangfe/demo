import React from "react";
import "../../styles/singleService.css";
import TopBar from "../../components/Topbar/TopBar";
import { SliderSingleServices, SliderSingleShop } from "../../components/Home/Slider/Slider";
import Footer from "../../components/Footer/Footer";
import Telephone from "../../components/Appointment/Telephone";
import { AiOutlineArrowDown } from "react-icons/ai";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Scroll from "../../components/ScrollToTop/Scroll";
import FindService from "../../components/Find/FindService";
import { Link } from "react-router-dom";
import { convertStringToNumber } from "../../utils/Utils";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/action";

export default function DetailProduct() {
  const [data, setData] = useState("");
  const { id } = useParams();
  const [productList, setProductList] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get("http://localhost:8800/api/products");
      setProductList(resp.data.value);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/products/${id}`,
      );
      setData(res.data.value);
    };
    fetchData();
  }, [id]);

  function handleClickAdd(){
    dispatch(addToCart(data));
  }
  return (
    <div className="container">
      <section className="section1">
        <div className="background-image">
          <div className="container-item">
            <TopBar />
            <SliderSingleShop title="Cửa hàng" name={data?.Name} />
          </div>
        </div>
      </section>
      <div className="single-container">
        <div className="single-left">
          <div className="item-image">
            <img src={data?.Image} alt="" />
          </div>
          <div className="item-content">
            <div className="header-service">Sản phẩm</div>
            <div className="item-name-single">{data?.Name}</div>
            <div className="item-price-single">{convertStringToNumber(data?.Price)}</div>
            <div className="item-desc-single">{data?.Describe}</div>
            <div style={{width: 300}}>
              <button className="btn1" onClick={handleClickAdd}>Thêm giỏ hàng</button>
            </div>
          </div>
        </div>
        <div className="single-right">
          <div className="header-limit">Sản phẩm khác</div>
          {productList?.map((product, i) => {
            return (
              <div className="item-limit-single" key={i}>
                <Link
                  to={`/product/${product._id}`}
                  className="link-single"
                >
                  <img src={product?.Image} alt="" className="image-limit" />
                  <div className="name-limit">
                    <div >{product?.Name}</div>
                    <div className="">{convertStringToNumber(product?.Price)}</div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className="telephone">
        <Telephone />
      </div>
      <Scroll />
      <Footer />
    </div>
  );
}
