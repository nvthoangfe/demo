import React, { useEffect, useState, useContext } from "react";
import "../../styles/components/profile/information.css";
import { AuthContext } from "./../../context/AuthContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Information() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  const [files, setFiles] = useState("");

  const [inputField, setInputField] = useState({
    Name_Customer: user.Name_Customer,
    Telephone: user.Telephone,
    Email: user.Email,
    Number: user.Number,
    Street: user.Street,
    District: user.District,
    City: user.City,
    Gender: user.Gender,
  });

  const InputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // set locaL storage after update
    sessionStorage.setItem("user", JSON.stringify(user));
    const userInfo = JSON.parse(sessionStorage.getItem("user"));
    const newUpdatedUserInfo = {
      ...userInfo,
    };
    sessionStorage.setItem("user", JSON.stringify(newUpdatedUserInfo));
  }, [user]);

  // update avatar
  const UpdateAvatar = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "social0722");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/johnle/image/upload",
            data
          );
          const { url } = uploadRes.data;
          if (url) {
            toast.success('Thay đổi ảnh đại diện thành công')
            return url;
          }
        })
      );

      const data = {
        CustomerId: user._id,
        Image: list,
      };
      try {
        const response = await axios.put(
          "http://localhost:8800/api/customer/update/" + user._id,
          data
        );
        const record = response.data;
        setUser(record.value);
        if (record.status === 200) {
          toast.success(record.message);
        } else {
          toast.error(record.message);
        }
      } catch (err) {
        toast.error("Cập nhật trong bộ nhớ phiên không thành công");
      }
    } catch (err) {
      toast.error("Có thể lấy hình ảnh từ Cloud ");
    }
  };

  // update information
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const customer = {
        CustomerId: user._id,
        Name: inputField.Name,
        Telephone: inputField.Telephone,
        Number: inputField.Number,
        Street: inputField.Street,
        District: inputField.District,
        City: inputField.City,
        Gender: inputField.Gender,
      };
      try {
        const response = await axios.put(
          "http://localhost:8800/api/customer/update/" + user._id,
          customer
        );
        const record = response.data;
        setUser(record.value);
        if ( parseInt(record.status) === 200) {
          toast.success('Thay đổi thông tin thành công');
        } else {
          toast.error("Hệ thống lỗi");
        }
      } catch (err) {
        toast.error("Đã xảy ra lỗi");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="information">
      <ToastContainer />
      <div className="header-information">Thông tin của bạn</div>
      <div className="image-information">
        {user.Image && (
          <img
            src={files ? URL.createObjectURL(files[0]) : user.Image}
            alt=""
          />
        )}
        <div className="change-image">
          <form>
            <label htmlFor="file" className="button-profile">
              Chọn ảnh
              <input
                type="file"
                id="file"
                multiple
                style={{ display: "none" }}
                onChange={(e) => setFiles(e.target.files)}
              ></input>
            </label>
            <button onClick={UpdateAvatar}>Lưu</button>
          </form>
        </div>
      </div>
      <form>
        <div className="list-information">
          <div className="item-information">
            <span>Tên</span>
            <input
              type="text"
              className="input-container"
              autoComplete="off"
              value={inputField.Name_Customer}
              name="Name_Customer"
              onChange={InputHandler}
            />
          </div>
          <div className="item-information">
            <span>Số điện thoại</span>
            <input
              className="input-container"
              type="text"
              autoComplete="off"
              value={inputField.Telephone}
              name="Telephone"
              onChange={InputHandler}
            />
          </div>
          <div className="item-information">
            <span>Email</span>
            <input
              readOnly
              className="input-container"
              type="text"
              autoComplete="off"
              value={inputField.Email}
              name="Email"
              onChange={InputHandler}
            />
          </div>
          <div className="item-information">
            <span>Số</span>
            <input
              className="input-container"
              type="text"
              autoComplete="off"
              value={inputField.Number}
              name="Number"
              onChange={InputHandler}
            />
          </div>
          <div className="item-information">
            <span>Đường</span>
            <input
              className="input-container"
              type="text"
              autoComplete="off"
              value={inputField.Street}
              name="Street"
              onChange={InputHandler}
            />
          </div>

          <div className="item-information">
            <span>Huyện/Thị Xã</span>
            <input
              className="input-container"
              type="text"
              autoComplete="off"
              value={inputField.District}
              name="District"
              onChange={InputHandler}
            />
          </div>
          <div className="item-information">
            <span>Tỉnh/Thành Phố</span>
            <input
              className="input-container"
              type="text"
              autoComplete="off"
              value={inputField.City}
              name="City"
              onChange={InputHandler}
            />
          </div>
          <div className="item-information">
            <span>Giới tính</span>
            <select
              name="Gender"
              id="selects"
              onChange={InputHandler}
              value={inputField.Gender}
            >
              <option value="Male">Nam</option>
              <option value="Female">Nữ</option>
              <option value="Other genders">Giới tính khác</option>
            </select>
          </div>
          <button onClick={submitHandler}> Lưu </button>
        </div>
      </form>
    </div>
  );
}
