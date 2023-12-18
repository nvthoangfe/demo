import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Col, Row, Spin } from "antd";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import "../../styles/PaymentResult..css";
import Footer from "../../components/Footer/Footer";
import { convertStringToNumber } from "../../utils/Utils";
import TopBar from "../../components/Topbar/TopBar";
import { SliderServices } from "../../components/Home/Slider/Slider";
import axios from "axios";

function PaymentResult() {
  const userInfo = JSON.parse(sessionStorage.getItem("user"));
  const [params, setParams] = useSearchParams();
  const [payment, setPayment] = useState({});
  const [loading, setLoading] = useState(true);

  async function updateStatusPayment(paymentResult) {
    try {
      const data = {
        statusPayment: 1, 
        staffName: userInfo.Name_Customer,
        Type: 1,
      }
      await axios.put(`http://localhost:8800/api/orders/${paymentResult.txnRef}`,data);
    } catch (error) {
      console.log("updateStatusPayment ~ error:", error)
    }
  }

  useEffect(() => {
    const paymentResult = {
      method: "VNPAY",
      amount: params.get("vnp_Amount"),
      bankCode: params.get("vnp_BankCode"),
      bankTxnNo: params.get("vnp_BankTranNo"),
      description: params.get("vnp_OrderInfo"),
      timestamp: params.get("vnp_PayDate"),
      txnNo: params.get("vnp_TransactionNo"),
      status: params.get("vnp_TransactionStatus") === "00" ? "SUCCESS" : "FAILED",
      txnRef: params.get("vnp_TxnRef"),
    };
    setPayment(paymentResult);
    setLoading(false);
  }, [params]);

  useEffect(() => {
    if (payment?.txnRef) {
      updateStatusPayment(payment);
    }
  }, [payment?.txnRef])

  return (
    <>
      <div className="container">
        <section className="section1">
          <div className="background-image">
            <div className="container-item">
              <TopBar />
            </div>
          </div>
        </section>
        <div style={{ width: '100%' }}>
          <div className={'payment'}>
            {loading ? <Spin /> :
              <Row>
                <Col offset={4}></Col>
                <Col span={16}>
                  <div className={"payment-wrap"}>
                    {payment.status === "SUCCESS" ? (
                      <CheckCircleFilled className="icon-success" />
                    ) : (
                      <CloseCircleFilled className="icon-failed" />
                    )}

                    <h3 class="text-muted">
                      {payment?.status === "SUCCESS"
                        ? "Thanh toán thành công"
                        : "Thanh toán thất bại"}
                    </h3>

                    {payment.status === "SUCCESS" && (
                      <p>
                        Quý khách đã thanh toán thành công{" "}
                        <b>{convertStringToNumber(payment.amount / 100)}</b>{" "}.
                        Mã giao
                        dịch <b>{payment.txnNo}</b>.
                      </p>
                    )}

                    {payment.status === "FAILED" && (
                      <p>
                        Giao dịch không thực hiện được. Vui lòng thử lại sau. Mã giao
                        dịch <b>{payment.txnNo}</b>
                      </p>
                    )}

                    <Link to="/">Trở về trang chủ</Link>
                    <footer class="footer">
                      <p>&copy; VNPAY 2023</p>
                    </footer>
                  </div>
                </Col>
              </Row>
            }

          </div>
          <Footer />
        </div>
      </div> 
    </>
  );
}

export default PaymentResult;
