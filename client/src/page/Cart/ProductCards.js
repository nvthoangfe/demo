import React from "react";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import './Cart.css'
import { Button, FormControl, FormControlLabel, FormLabel, Input, Radio, RadioGroup } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { decreaseQuantity, increaseQuantity, removeAllProductFromCart, removeFromCart } from "../../redux/action";
import { convertStringToNumber } from "../../utils/Utils";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Product({ product }) {
    const [TotalPrice, setTotalPrice] = useState()
    const dispatch = useDispatch();
    useEffect(() => {
        let newPrice = product?.Quantity > 1 ? parseInt(product?.Price) * product?.Quantity : parseInt(product?.Price);
        setTotalPrice(newPrice);
    }, [product?.Quantity])

    function handleRemove() {
        dispatch(removeFromCart(product._id));
    }
    function handleAdd() {
        dispatch(increaseQuantity(product._id));
    }
    function handleMinus() {
        dispatch(decreaseQuantity(product._id));
    }
    return (
        <MDBCard className="product">
            <MDBCardBody style={{ padding: 20 }}>
                <MDBRow className="container-row">
                    <MDBCol md="2" lg="2" xl="2">
                        <MDBCardImage className="row-image" fluid
                            src={product?.Image}
                            alt="Cotton T-shirt" />
                    </MDBCol>
                    <MDBCol md="3" lg="3" xl="3">
                        <p className="row-title">{product?.Name}</p>
                    </MDBCol>
                    <MDBCol md="3" lg="3" xl="2"
                        className="row-action">
                        <Button color='success' onClick={handleMinus}>  <MDBIcon fas icon="minus" /></Button>
                        <Input min={0} defaultValue={1} sx={{ width: 30, textAlign: 'right' }} value={product?.Quantity} type="number" size="sm" />
                        <Button color='success' onClick={handleAdd}> <MDBIcon fas icon="plus" /></Button>
                    </MDBCol>
                    <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                        <MDBTypography tag="h5" className="mb-0">
                            {convertStringToNumber(TotalPrice)}
                        </MDBTypography>
                    </MDBCol>
                    <MDBCol md="1" lg="1" xl="1" className="text-end">
                        <Button onClick={handleRemove} className="text-danger">
                            <MDBIcon fas icon="trash text-danger" size="lg" />
                        </Button>
                    </MDBCol>
                </MDBRow>
            </MDBCardBody>
        </MDBCard>
    )
}
export default function ProductCards() {
    const { user } = useContext(AuthContext);

    const cartList = useSelector((state) => state?.cart?.cartItems);
    const [TotalPrice, setTotalPrice] = useState()
    const [paymentMethod, setPaymentMethod] = useState()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const  fetchSubmitOrder = async (data) => {
        try {
            const resp = await axios.post("http://localhost:8800/api/orders", data);
            if ( parseInt(data.PaymentMethod) === 1 && resp?.data?.status === 200){
                toast.success('Tạo đơn hàng thành công');
                dispatch(removeAllProductFromCart());
                navigate('/shop')
            }
            else if ( resp.data?.url && parseInt(resp.data?.status) === 200 ){
                console.log('resp.data.url',resp.data.url);
                window.location.href = resp.data.url
                dispatch(removeAllProductFromCart());
                navigate('/shop')
            }
            else{
                toast.error('Hệ thống lỗi');
            }
        } catch (error) {
            console.error("Error submitting order:", error);
        }
    };

    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    };
    function handleSubmit() {
            const data = {
                ProductList: cartList,
                UserId: user?._id,
                PaymentMethod: paymentMethod ?? 0,
                StatusPayment: 0,
                TotalPrice: TotalPrice,
            }
            fetchSubmitOrder(data)
    }
    useEffect(() => {
        let TotalPrice = 0;
        cartList?.forEach((item) => {
            const productPrice = parseInt(item.Price) * item?.Quantity;
            TotalPrice += productPrice;
        })
        setTotalPrice((TotalPrice));
    }, [cartList])
    return (
        <section className="h-100" style={{ backgroundColor: "#eee" }}>
           <ToastContainer />
            <MDBContainer className="container-cart">
                <MDBRow className="form-cart">
                    <MDBCol md="7">
                        <div className="title-cart">
                            <MDBTypography tag="h1" >
                                Giỏ hàng
                            </MDBTypography>
                        </div>
                        <div className='list-product'>
                            {cartList?.length > 0 ? cartList?.map((item, index) =>
                                <Product key={index} product={item} />
                            ) : <>
                                Không có sản phẩm trong giỏ hàng
                            </>}
                        </div>
                    </MDBCol>
                    <MDBCol>
                        <div className="title-cart">
                            <MDBTypography tag="h1" >
                                Thanh toán
                            </MDBTypography>
                        </div>
                        <div className="payment-cart">
                            <div className="row-payment">
                                <MDBTypography tag="h4"  >
                                    Số sản phẩm:
                                </MDBTypography>
                                <MDBTypography tag="h4"  >
                                    {cartList?.length}
                                </MDBTypography>
                            </div>
                            <div className="row-payment">
                                <MDBTypography tag="h4"  >
                                    Tổng tiền:
                                </MDBTypography>
                                <MDBTypography tag="h4"  >
                                    {convertStringToNumber(TotalPrice) ?? 0}
                                </MDBTypography>
                            </div>
                            <div className="row-payment" style={{ flexDirection: 'column' }}>
                                <MDBTypography tag="h4"  >
                                    Phương thức thanh toán:
                                </MDBTypography>
                                <FormControl style={{ padding: '5px 10px' }}>

                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue={0}
                                        value={paymentMethod}
                                        onChange={handlePaymentChange}
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel value={0} control={<Radio />} label="Thanh toán qua trực tuyến" />
                                        <FormControlLabel value={1} control={<Radio />} label="Thanh toán khi nhận hàng" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </div>
                        <div className="payment-btn">
                            <button onClick={handleSubmit} size='large'>Thanh toán</button>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}