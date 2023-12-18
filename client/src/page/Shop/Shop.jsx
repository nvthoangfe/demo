import React, { useEffect, useState } from "react";
import TopBar from "../../components/Topbar/TopBar";
import { SliderServices } from "../../components/Home/Slider/Slider";
import Footer from "../../components/Footer/Footer";
import Telephone from "../../components/Appointment/Telephone";
import Galleries from "../../components/Gallery/Gallery";
import Scroll from "../../components/ScrollToTop/Scroll";
import "./shop.css";
import axios from "axios";
import { convertStringToNumber } from "../../utils/Utils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from '../../redux/action';
import { Input } from "antd";
const Product = ({product,onNavigator}) => {
  const dispatch = useDispatch();
  function handleLinkToDetail() {
    onNavigator(product._id);
  }
  function handleClickAdd(){
    dispatch(addToCart(product));
  }
  return (
    <div className="shop">
      <img
        src={product.Image}
        onClick={handleLinkToDetail}
        alt=""
      />
      <div className="info">
        <h3> {product.Name} </h3>
        <p>{product.Category}</p>
        <h2>{convertStringToNumber(product.Price)}</h2>
      </div>
      <div className="shop-btn">
        <button onClick={handleClickAdd}className="btn1">ADD TO CART</button>
      </div>
    </div>
  )
}

const Shop = () => {
  const [productList, setProductList] = useState();
  const [keyword, setKeyword] = useState();
  const navigator = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if ( keyword){
        const resp = await axios.get(`http://localhost:8800/api/products?Keyword=${keyword}`);
        setProductList(resp.data.value);
      }
      else{
        const resp = await axios.get("http://localhost:8800/api/products");
        setProductList(resp.data.value);
      }
    };
    fetchData();
  }, [keyword]);
  function handleChangeKeyword(e) {
    const value = e.target.value;
    setKeyword(value);
  }
  function handleNavigateDetail(id) {
    navigator(`/product/${id}`)
  }
  return (
    <div className="container">
      <section className="section1">
        <div className="background-image">
          <div className="container-item">
            <TopBar />
            <SliderServices title="Cửa Hàng" />
          </div>
        </div>
      </section>
      <div className="pricing-container">
        {/* <span className="subheading"> Của Hàng</span> */}
        <h2 className="h2-about"> Cửa Hàng SPaSimplify</h2>
        <div className="title">
          <br /> Tìm sản phẩm bạn muốn
        </div>
        <Input style={{width: 300}} type="text" onChange={handleChangeKeyword} placeholder="Tìm kiếm..." />
        <div className="pricing-item">
          <div className="list-shop">
            {productList?.map((item, index) =>
              <Product key={index} product={item} onNavigator={(e)=> handleNavigateDetail(e)} />
            )}
          </div>
          <div className="side-bar">
            <div className="filter-price">
              <h3>Filter by price:</h3>
              <div>-------------------------</div>
              <p>FILTER</p>
            </div>

            <p> Sản phẩm mới 
            </p>
            <ul className="list-product">
              {productList?.slice(0,4)?.map((item, index) =>
                <li key={index} className="lastes-product">
                  <div className="lastes-product-img">
                    <img
                      src={item?.Image}
                      alt=""
                    />
                  </div>
                  <div className="lastes-product-price">
                    <p className='product-name'>{item?.Name}</p>
                    <h3>{convertStringToNumber(item?.Price)}</h3>
                  </div>
                </li>
              )}
            </ul>
            <p>Categories</p>
            <ul className="Categories">
              <li>BATH SET</li>
              <li>BATH SOAP</li>
              <li>BEAUTY</li>
              <li>CLEANISNG</li>
              <li>COSMETICS</li>
              <li>DESIGN</li>
              <li>MOISTURIZING</li>
              <li>WELLNESS</li>
            </ul>
            <p>Tags</p>
            <ul className="tags">
              <li>BODY</li>
              <li>CARE</li>
              <li>DESIGN</li>
              <li>FACE</li>
              <li>IDEAS</li>
              <li>LOTION</li>
              <li>NEW</li>
              <li>OIL</li>
              <li>RELLAX</li>
              <li>SPA</li>
              <li>WOMENS</li>
            </ul>
            <p>Search</p>
            <div className="Search">
              <input placeholder="TYPE HERE" type="text" name="" id="" />
            </div>
          </div>
        </div>
      </div>
         {/* <div className="telephone">
        <Telephone />
      </div> */}
      <Scroll />
      <Footer />
    </div >
  );
};

export default Shop;
