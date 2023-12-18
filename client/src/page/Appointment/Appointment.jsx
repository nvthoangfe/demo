import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import TopBar from "../../components/Topbar/TopBar";
import "../../styles/appointment.css";
import { BsPersonFill } from "react-icons/bs";
import { IoMdArrowDropright } from "react-icons/io";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import ModalLogin from "../../components/Modal/ModalLogin";
import { GiLipstick } from "react-icons/gi";
import moment from "moment";
import Scroll from "../../components/ScrollToTop/Scroll";
import { MdDelete } from "react-icons/md";
import Footer from "../../components/Footer/Footer";

export default function Appointment() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  const [open, setOpen] = useState(false);
  const [staff, setStaff] = useState([]);
  const [service, setService] = useState([]);
  const [slotArray, setSlotArray] = useState([]);
  const [date, setDate] = useState(moment().format("yyyy-MM-DD"));
  const [openService, setOpenService] = useState(false);
  const [nameService, setNameService] = useState("");
  const [staffId, setStaffId] = useState("");
  const [slotId, setSlotId] = useState("");
  const [check, setCheck] = useState(-1);
  const [dateId, setDateId] = useState("");
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);

  const currentTime = new Date();

  useEffect(() => {
    const fetchStaff = async () => {
      const res = await axios.get("http://localhost:8800/api/staff/all");
      setStaff(res.data.value);
    };
    fetchStaff();
    // fetService

    const fetchService = async () => {
      const res = await axios.get("http://localhost:8800/api/service/all");
      setService(res.data.value);
    };
    fetchService();
  }, []);

  const [selectedServices, setSelectedServices] = useState([]);
  const handleServices = async (name) => {
    setNameService(name);
    setOpenService(false);
    setStep1(true);
    if (selectedServices.includes(name)) {
      return;
    } else {
      setSelectedServices((prevServices) => [...prevServices, name]);
    }
  };

  const handleStaff = async (e) => {
    setStep2(true);
    setStaffId(e.target.value);
  };
  const handleSlot = async (slotid, index) => {
    setSlotId(slotid);
    setStep4(true);
    setCheck(index);
  };

  const DateHandle = async (e) => {
    const newDate = moment(new Date(e.target.value)).format("YYYY-MM-DD");
    setDate(newDate);
    setStep3(true);
    const data = {
      staffId: staffId,
      date: newDate,
    };

    try {
      const res = await axios.post(
        "http://localhost:8800/api/appointment/get-slots",
        data
      );
      console.log(res.data);
      setSlotArray(res.data.slots);
      setDateId(res.data._id);
    } catch (error) { }
  };
  const history = useNavigate();

  const submitBooking = async () => {
    const data = {
      StaffId: staffId,
      DateId: dateId,
      SlotId: slotId,
      CustomerId: user._id,
      NameCustomer: user.Name_Customer,
      TelephoneCustomer: user.Telephone,
      Email: user.Email,
      Services: selectedServices,
    };
    try {
      const res = await axios.post(
        "http://localhost:8800/api/appointment/add",
        data
      );
      toast.success("Hẹn thành công!!");
      setTimeout(() => {
        history("/home");
      }, 3000);
    } catch (error) {
      toast.error("Cuộc hẹn thất bại");
    }
  };

  function deleteService(name) {
    if (selectedServices.includes(name)) {
      setSelectedServices((prevServices) =>
        prevServices.filter((service) => service !== name)
      );
    }
  }

  return (
    <div className="container">
      <section className="section1">
        <div className="background-image">
          <div className="container-item">
            <TopBar />
          </div>
        </div>
      </section>
      <ModalLogin
        open={open}
        onClose={() => setOpen(false)}
        setUser={setUser}
      />
      <ToastContainer />
      {user ? (
        <div className="appointment-container">
          <div className="booking-container">
            <div className="header-booking">Đặt lịch hẹn</div>
            <div className="form-booking">
              <span className="title-booking"> 1. Chọn dịch vụ </span>
              {selectedServices?.length > 0 &&
                selectedServices?.map((item) => (
                  <div className="item-booking" >
                    <span className="icon-booking">
                      <GiLipstick />
                    </span>
                    <div
                      className="input-booking choose"

                    >
                      <span>{item ?? ''}</span>
                    </div>
                    <span className="icon-booking"
                      onClick={() => {
                        deleteService(item);
                      }}>
                      <MdDelete />
                    </span>
                  </div>
                ))}

              <div className="item-booking">
                <span className="icon-booking">
                  <GiLipstick />
                </span>
                <div
                  className="input-booking choose"
                  onClick={() => {
                    setOpenService(!openService);
                  }}
                >
                  Xem tất cả các dịch vụ
                </div>
                <span className="icon-booking">
                  <IoMdArrowDropright />
                </span>
              </div>
              {openService ? (
                <div className="show-service-booking">
                  <div className="grid-service">
                    {service.map((services, i) => (
                      <div key={i} className="items-service-booking">
                        <img
                          src={services.Image}
                          alt=""
                          className="img-booking"
                        />
                        <span> {services.Name_Service}</span>
                        <span> {services.Price}</span>
                        <span className="desc-booking">
                          {services.Description}
                        </span>
                        <button
                          onClick={() => {
                            handleServices(services.Name_Service);
                          }}
                        >
                          Chọn
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/*  choose staff */}

              <span className="title-booking"> 2. Chọn nhân viên </span>
              <div className="item-booking">
                <span className="icon-booking">
                  <BsPersonFill />
                </span>
                <select
                  type="text"
                  className="input-booking"
                  placeholder="Nhân viên"
                  name="StaffId"
                  onChange={handleStaff}
                >
                  {staff.map((value, i) => (
                    <option value={value._id} key={i}>
                      {value.Name}
                    </option>
                  ))}
                </select>
                <span className="icon-booking">
                  <IoMdArrowDropright />
                </span>
              </div>
              <span className="title-booking"> 3. Chọn ngày </span>
              <div className="item-booking">
                <span className="icon-booking">
                  <BsPersonFill />
                </span>
                <input
                  type="date"
                  name="Date"
                  className="input-booking"
                  value={moment(date).format("yyyy-MM-DD")}
                  onChange={DateHandle}
                ></input>

                <span className="icon-booking">
                  <IoMdArrowDropright />
                </span>
              </div>

              {step3 ? (
                <React.Fragment>
                  <span className="title-booking">
                    {" "}
                    4. Thời gian{" "}
                    <span
                      style={{
                        fontSize: "16px",
                        paddingLeft: "10px",
                        fontWeight: "400",
                      }}
                    >
                      {" "}
                      (Vui lòng chọn khoảng thời gian)
                    </span>{" "}
                  </span>
                  <div className="grid-slot">
                    {slotArray?.map((slot, index) => {
                      const Time = new Date(date + "T" + slot.Time);
                      if (Time < currentTime) {
                        return (
                          <button key={index} className="item-false">
                            {slot.Time}
                          </button>
                        );
                      }
                      if (slot.isBooked === true) {
                        return (
                          <button key={index} className="item-false">
                            {slot.Time}
                          </button>
                        );
                      } else {
                        return (
                          <button
                            key={index}
                            className="slot-item"
                            onClick={() => {
                              handleSlot(slot._id, index);
                            }}
                            style={{
                              backgroundColor:
                                check === index ? "#bf925b" : "white",
                              color: check === index ? "white" : "black",
                            }}
                          >
                            {slot.Time}
                          </button>
                        );
                      }
                    })}
                  </div>
                </React.Fragment>
              ) : null}
              {step4 ? (
                <React.Fragment>
                  <button
                    className="submit-booking true"
                    onClick={submitBooking}
                  >
                    {" "}
                    Hoàn thành
                  </button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <button className="submit-booking false"> Đặt hẹn</button>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="booking-check">
          <span>Vui lòng đăng nhập để tiếp tục đặt lịch hẹn</span>
          <button
            className="check-button"
            onClick={() => {
              setOpen(true);
            }}
          >
            Đăng nhập
          </button>
        </div>
      )}
      <Scroll />
      <Footer/>
    </div>
  );
}
