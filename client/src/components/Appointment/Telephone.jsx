import React, { useState } from "react";
import "../../styles/components/telephone.css";

import axios from "axios";
import { useNavigate } from "react-router";

export default function Telephone() {
  const [inputField, setInputField] = useState({
    Telephone: "",
  });
  const InputHandler = (e) => {
    setInputField({
      ...inputField,
      [e.target.name]: e.target.value.slice(0, 11),
    });
  };
  const history = useNavigate();

  const [errField, setErrField] = useState({
    TelephoneErr: "",
  });
  const clear = () => {
    setInputField({
      Telephone: "",
    });
    setTimeout(() => {
      setErrField({
        TelephoneErr: "",
      });
    }, 3000);
  };

  const validateForm = () => {
    let formValid = true;
    setInputField({
      Telephone: "",
    });

    const checkTelephone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

    if (inputField.Telephone === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        TelephoneErr: "Vui lòng nhập số điện thoại",
      }));
    } else {
      if (!inputField.Telephone.match(checkTelephone)) {
        formValid = false;
        setErrField((prevState) => ({
          ...prevState,
          TelephoneErr: "Bạn đã nhập số điện thoại không hợp lệ !",
        }));
      }
    }

    clear();
    return formValid;
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = {
        Telephone: inputField.Telephone,
      };
      const res = await axios.post(
        "http://localhost:8800/api/customer/check",
        data
      );
      if (res.data.status === 400) {
        setErrField((prevState) => ({
          ...prevState,
          TelephoneErr: res.data.message,
        }));
        setTimeout(() => {
          clear();
        }, 3000);
      } else {
        history(`/appointment/${inputField.Telephone}`);
      }
    }
  };

  return (
    <div className="Telephone">
      {/* <div className="header-tel">Đặt lịch hẹn</div>
      {/* <span className="content-tel">
        After cutting the payment, it's okay to cancel the schedule
      </span> */}
      <div className="item-tel">
        <input
          type="number"
          placeholder="Số Điện Thoại"
          className="input-tel"
          name="Telephone"
          value={inputField.Telephone}
          onChange={InputHandler}
        />
        <button
          type="submit"
          style={{ cursor: "pointer" }}
          onClick={submitHandle}
        >
          Đặt lịch hẹn
        </button>
      </div> */}
      {errField.TelephoneErr.length > 0 && (
        <span className="error">{errField.TelephoneErr} </span>
      )}
    </div>
  );
}
