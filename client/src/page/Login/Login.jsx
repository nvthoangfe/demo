import React, { useState, useContext, useEffect, useRef } from "react";
import "../../styles/login.css";
import {
  AiOutlineArrowRight,
  AiFillEye,
  AiFillEyeInvisible,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

const SITE_KEY = "6Lc7fhAjAAAAAGx42AoXHeM-zx_wONWme7aRc0xn";

export default function Login() {
  // check show password text
  const [pass, setPass] = useState(false);
  // re captcha
  const captchaRef = useRef();
  const [recaptchaValue, setRecaptchaValue] = useState("");

  const onChange = (value) => {
    setRecaptchaValue(value);
  };

  const toggleBtn = (e) => {
    e.preventDefault();
    setPass((prevState) => !prevState);
  };

  // declare properties of client
  const [inputField, setInputField] = useState({
    Email: "",
    Password: "",
  });

  const InputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const [errField, setErrField] = useState({
    EmailErr: "",
    PasswordErr: "",
    CaptchaErr: "",
  });

  const resetForm = () => {
    setInputField({
      Email: "",
      Password: "",
    });
    setTimeout(() => {
      setErrField({
        EmailErr: "",
        PasswordErr: "",
        CaptchaErr: "",
      });
    }, 3000);
  };

  const validateForm = () => {
    let formValid = true;
    setInputField({
      Email: "",
      Password: "",
    });

    const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (inputField.Email === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        EmailErr: "Vui lòng nhập email",
      }));
    } else {
      if (!inputField.Email.match(validEmail)) {
        formValid = false;
        setErrField((prevState) => ({
          ...prevState,
          EmailErr: "Bạn đã nhập một địa chỉ email hợp lệ! ",
        }));
      }
    }
    if (inputField.Password === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        PasswordErr: "Xin vui lòng nhập mật khẩu",
      }));
    }

    resetForm();
    return formValid;
  };

  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGIN_START",
    });
    // captchaRef.current.reset();
    if (validateForm()) {
      const data = {
        Email: inputField.Email,
        Password: inputField.Password,
        token: recaptchaValue,
      };

      try {
        const response = await axios.post(
          "http://localhost:8800/api/auth/login_customer",
          data
        );
        if (response.data.status === 300) {
          // check email
          setErrField((prevState) => ({
            ...prevState,
            EmailErr: response.data.message,
          }));
          resetForm();
          toast.error(response.data.message);
        } else {
          if (response.data.status === 301) {
            setErrField((prevState) => ({
              ...prevState,
              PasswordErr: response.data.message,
            }));
            resetForm();
          } else {
            if (response.data.status === 200) {
              toast.success(response.data.message);
              dispatch({
                type: "LOGIN_SUCCESS",
                payload: response.data.value,
              });
            }
          }
        }
      } catch (err) {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: err,
        });
        throw err;
      }
    }
  };

  return (
    <div className="Login">
      <ToastContainer />
      <div className="login-box">
        <h2>Đăng nhập</h2>
        <form>
          <div className="user-box">
            <input
              type="text"
              name="Email"
              required
              value={inputField.Email}
              onChange={InputHandler}
              autoComplete="off"
            />
            <label>Email</label>
          </div>
          {errField.EmailErr.length > 0 && (
            <span className="error">{errField.EmailErr} </span>
          )}
          <div className="user-box">
            <input
              type={pass ? "text" : "password"}
              name="Password"
              required
              onChange={InputHandler}
              value={inputField.Password}
            />
            <label>Mật khẩu</label>
            <button className="eye-button" onClick={toggleBtn}>
              {pass ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>
          {errField.PasswordErr.length > 0 && (
            <span className="error">{errField.PasswordErr} </span>
          )}
          {/* <div className="user-box">
            <ReCAPTCHA
              sitekey={SITE_KEY}
              onChange={onChange}
              ref={captchaRef}
            />
          </div> */}
          {errField.CaptchaErr.length > 0 && (
            <span className="error">{errField.CaptchaErr} </span>
          )}
          {/* link to forget page */}
          <div className="user-box">
            <Link to="/reset">
              <span> Quên mật khẩu ? </span>
            </Link>
          </div>

          <button
            className="button-submit"
            onClick={handleClick}
            disabled={isFetching}
            type="submit"
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Đăng nhập
          </button>
          <div className="user-box">
            <Link to="/register">
              <span>
                {" "}
                Bạn chưa có tài khoản? Đăng ký <AiOutlineArrowRight />{" "}
              </span>
            </Link>
          </div>
          <div className="user-box">
            <Link to="/">
              <span>
                Thoát <AiOutlineArrowRight />
              </span>
            </Link>
          </div>
          {/* link to register page  */}
        </form>
      </div>
    </div>
  );
}
