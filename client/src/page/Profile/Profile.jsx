import React from "react";
import TopBar from "../../components/Topbar/TopBar";
import { SliderProfile } from "../../components/Home/Slider/Slider";
import Information from "../../components/Profile/Information";
import History from "../../components/Profile/History";
import ChangePassword from "../../components/Profile/ChangePassword";
import Appointment from "../../components/Profile/Appointment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "../../components/Table/Table";
import "../../styles/profile.css";
import "../../styles/components/profile/evaluate.css";
import axios from "axios";
import { useState, useEffect, useContext, useMemo } from "react";
import { AuthContext } from "./../../context/AuthContext";
import Scroll from "../../components/ScrollToTop/Scroll";
import { MdViewHeadline } from "react-icons/md";
import Rating from "react-rating";
import {
  AiOutlineCloseCircle,
  AiOutlineStar,
  AiFillStar,
} from "react-icons/ai";
import Orders from "../../components/Profile/Orders";

export default function Profile() {
  const [active, setActive] = useState("1");
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  const [data, setData] = useState([]);
  const [rowId, setRowId] = useState("");
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [list, setList] = useState("");
  const [evaluate, setEvaluate] = useState([]);
  const [dataEvaluate, setDataEvaluate] = useState("");

  useEffect(() => {
    const fetchAppointment = async () => {
      const id = {
        Name_Customer: user.Name_Customer,
      };
      const res = await axios.post(
        "http://localhost:8800/api/receipt/customer-evaluate",
        id
      );
      setData(res.data.value);
    };
    fetchAppointment();
  }, []);

  const Evaluate = () => {
    const View = ({ params, setRowId }) => {
      const submitHandle = async (e) => {
        e.preventDefault();
        setOpen(true);
        setRowId(params.row._id);
        const data = {
          id: params.row._id,
        };
        const res = await axios.post(
          "http://localhost:8800/api/receipt/get-by-id",
          data
        );
        const check = await axios.post(
          "http://localhost:8800/api/evaluate/receipt_id",
          data
        );
        setEvaluate(check.data.value);
        setDataEvaluate(res.data.value);
        setList(res.data.value.Services.join(", "));
      };

      return (
        <div className="view">
          <button className="button-view" onClick={submitHandle}>
            <MdViewHeadline className="icon-view" />
          </button>
        </div>
      );
    };

    // state columns of table
    const columns = useMemo(
      () => [
        {
          field: "Staff_Name",
          headerName: "Nhân viên",
          width: 100,
        },
        {
          field: "Services",
          headerName: "Dịch vụ",
          width: 300,
        },
        {
          field: "SumPrice",
          headerName: "Tổng giá",
          width: 70,
        },
        {
          field: "Discount",
          headerName: "Giảm giá",
          width: 60,
        },

        {
          field: "Total",
          headerName: "Tổng",
          width: 60,
        },
        {
          field: "Evaluate",
          width: 70,
          headerName: "Đánh giá",
          type: "actions",
          renderCell: (params) => <View {...{ params, rowId, setRowId }} />,
        },
      ],
      [rowId]
    );

    return (
      <>
        <div className="appointment">
          {data !== null ? (
            <div className="list-appointment">
              <span className="title-appointment">
                {" "}
                Danh sách dịch vụ đã sử dụng{" "}
              </span>
              <Table
                title={"Quản lý dịch vụ"}
                column={columns}
                row={data}
                rowId={rowId}
                setRowId={setRowId}
              />
            </div>
          ) : (
            <div className="list-appointment">
              <span className="title-appointment">Danh sách đánh giá</span>
              <div className="no-appointment">Bạn chưa sử dụng dịch vụ nào</div>
            </div>
          )}
        </div>
      </>
    );
  };

  const Modal = ({ open, data }) => {
    const [inputField, setInputField] = useState({
      Review: "",
    });
    const InputHandler = (e) => {
      setInputField({ ...inputField, [e.target.name]: e.target.value });
    };
    const getRating = async (rate) => {
      setRating(rate);
    };

    const saveRating = async (e) => {
      e.preventDefault();
      const value = {
        Service: list,
        Staff: data.Staff_Name,
        Receipt_id: data._id,
        Customer_id: user._id,
        Star: rating,
        Review: inputField.Review,
      };

      const res = await axios.post(
        "http://localhost:8800/api/evaluate/",
        value
      );
      if (res.data.status === 200) {
        toast.success(res.data.message);
        setTimeout(() => {
          setOpen(false);
        }, 2000);
      } else {
        toast.error(res.data.message);
      }
    };

    if (!open) return null;

    return (
      <div className={open ? "model open" : "model"}>
        <AiOutlineCloseCircle
          onClick={() => setOpen(false)}
          className="close-model-gal"
        />
        <ToastContainer />
        <div className="div-evaluate">
          <span className="title-appointment">Đánh giá nhân viên </span>
          <div className="item-evaluate">
            <span className="header-evaluate">Nhân viên:</span>
            <span className="value-evaluate">{data.Staff_Name}</span>
          </div>
          <div className="item-evaluate">
            <span className="header-evaluate">Dịch vụ:</span>
            <span className="value-evaluate">{list}</span>
          </div>
          {evaluate.length > 0 ? (
            <>
              {evaluate.map((value, index) => (
                <>
                  <div className="item-evaluate">
                    <span className="header-evaluate">Xếp hạng:</span>
                    <span className="value-evaluate">
                      <Rating
                        emptySymbol={<AiOutlineStar className="icon-star" />}
                        fullSymbol={<AiFillStar className="icon-star" />}
                        initialRating={value.Star}
                        placeholderRating={value.Star}
                        readonly
                      />
                    </span>
                  </div>
                  <div className="item-evaluate">
                    <span className="header-evaluate">Nhận xét:</span>
                    <span className="value-evaluate">{value.Review}</span>
                  </div>
                </>
              ))}
            </>
          ) : (
            <>
              <div className="item-evaluate">
                <span className="header-evaluate">Xếp hạng:</span>
                <span className="value-evaluate">
                  <Rating
                    initialRating={rating}
                    onClick={getRating}
                    emptySymbol={<AiOutlineStar className="icon-star" />}
                    fullSymbol={<AiFillStar className="icon-star" />}
                  />
                </span>
              </div>
              <div className="item-evaluate">
                <span className="header-evaluate">Nhận xét:</span>
                <textarea
                  className="value-evaluate text-area"
                  name="Review"
                  type="text"
                  value={inputField.Review}
                  onChange={InputHandler}
                />
              </div>
              <div className="item-evaluate">
                <div className="div-button">
                  <button className="button-action" onClick={saveRating}>
                    Đánh giá
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <Modal open={open} onClose={() => setOpen(false)} data={dataEvaluate} />
      <section className="section1">
        <div className="background-image">
          <div className="container-item">
            <TopBar />
            <SliderProfile />
          </div>
        </div>
      </section>
      {/* profile information */}
      <section className="section-2">
        <div className="profile-container">
          <div className="setting">
            <div className="setting-left">
              <div className="left-title " onClick={() => setActive("1")}>
                Chỉnh sửa hồ sơ
              </div>
              <div className="left-title" onClick={() => setActive("2")}>
                Đổi mật khẩu
              </div>
              <div className="left-title" onClick={() => setActive("3")}>
                Cuộc hẹn
              </div>
              <div className="left-title" onClick={() => setActive("4")}>
                Đánh giá
              </div>

              <div className="left-title " onClick={() => setActive("5")}>
                Lịch sử
              </div>
              <div className="left-title " onClick={() => setActive("6")}>
                Đơn hàng
              </div>
            </div>
            <div className="setting-right">
              {active === "1" && <Information />}
              {active === "2" && <ChangePassword />}
              {active === "3" && <Appointment />}
              {active === "4" && <Evaluate />}
              {active === "5" && <History />}
              {active === "6" && <Orders />}
            </div>
          </div>
        </div>
      </section>
      <Scroll />
    </div>
  );
}
