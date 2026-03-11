import "./Signin.scss";
import { Button, Form, Input, message } from "antd";
import {
  useLoginMutation,
  useLoginWithOtpMutation,
} from "../../../store/service/authService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { convertCodeReverse, imgUrl, isNsg } from "../../../store/constant";
import { AiOutlineUser } from "react-icons/ai";
import { CiLock } from "react-icons/ci";
import { useGetMyIpQuery } from "../../../store/service/ActiveMatcheService";

const Signin = () => {
  const [trigger] = useLoginMutation();
  const [triggerWotp, { isLoading, data: logindata, error }] =
    useLoginWithOtpMutation();
  const nav = useNavigate();

  const [showOtp, setShowOtp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    OTP: "",
  });

  const hostname = window.location.hostname;

  // const { data: userIp } = useGetMyIpQuery();

  const url = hostname.includes("madmin")
    ? `sub.${hostname.split(".")[1]}.${hostname.split(".")[2]}`
    : hostname;

  const onFinish = async (values) => {
    const normalizedUserId = values?.username?.trim()?.toUpperCase();

    const authPayload = {
      userId: convertCodeReverse(normalizedUserId),
      password: values?.password?.trim(),
      url,
      // url: "superadmin.wbt24.com",
      // url: "superadmin.antpro.co",
    };

    if (values?.OTP) {
      const res = await triggerWotp({ ...authPayload, otp: values?.OTP });
      if (res?.data?.token) {
        nav("/dashboard");
        localStorage.setItem("token", res?.data?.token);
        localStorage.setItem("rulesStatus", true);
        localStorage.setItem("userId", res?.data?.userId);
        localStorage.setItem("userType", res?.data?.userTypeInfo);
        localStorage.setItem("username", res?.data?.username);
        localStorage.setItem("ps", res?.data?.ps);
      }
    } else {
      const res = await trigger(authPayload).unwrap();
      console.log("res", res);
      if (res?.token) {
        nav("/dashboard");
        localStorage.setItem("token", res?.token);
        localStorage.setItem("rulesStatus", true);
        localStorage.setItem("userId", res?.userId);
        localStorage.setItem("userType", res?.userTypeInfo);
        localStorage.setItem("username", res?.username);
        localStorage.setItem("ps", res?.ps);
      } else {
        if (res.status) {
          setShowOtp(true);
        } else {
          message.error(res?.message);
        }
      }
    }
  };

  // for Antd
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // for plain UI
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    onFinish(formData); // reuse same logic
  };

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      nav("/dashboard");
    }
  }, []);

  useEffect(() => {
    if (error && !error?.data?.status) {
      message.error(error?.data?.message);
    }
    if (!logindata?.status && logindata?.message) {
      message.error(logindata?.message);
    }
  }, [error, logindata]);

  const hostName = window.location.host;

  return (
    <div className="gx-app-login-wrap">
      {isNsg ? (
        <div className="login-container-main">
          <div className="logo">
            <img
              src={
                hostName.includes("mumbaiexchange9")
                  ? "/img/mum-img.png"
                  : "/img/logo-nsg.png"
              }
              alt="logo"
              className="login-logo-img"
              height={50}
            />
          </div>

          <div className="login-box">
            <div className="input-group">
              <AiOutlineUser className="input-icon" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                autoComplete="off"
                placeholder="Enter Username"
              />
            </div>
            <div className="input-group">
              <CiLock className="input-icon" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
              />
            </div>

            {showOtp && (
              <div className="input-group">
                <CiLock className="input-icon" />
                <input
                  type="number"
                  name="OTP"
                  value={formData.OTP}
                  onChange={handleChange}
                  placeholder="Enter OTP"
                />
              </div>
            )}

            <button onClick={handleLogin} className="login-btn">
              {showOtp ? "Verify OTP" : "Login Now"}
            </button>

            <div className="footer-note">
              ©️ 2025 nsgpro99 | Not for restricted territories
            </div>
          </div>
        </div>
      ) : (
        <div className="gx-app-login-container">
          <div className="gx-app-login-main-content">
            {isLoading && (
              <>
                <div className="main_loading_section"> </div>
                <div className="loading_image">
                  <img src="/Images/loaderfast.svg" alt="helllo" />
                </div>
              </>
            )}

            <div className="gx-app-logo-content">
              <div className="gx-app-logo-content-bg" />
              <div className="gx-app-logo-wid">
                <h1>
                  <span>Sign In</span>
                </h1>
                <p>
                  <span>
                    By Signing Up, you can avail full features of our services.
                  </span>
                </p>
              </div>

              <div className="gx-app-logo">
                <img alt="example" src={imgUrl} height={80} />
              </div>
            </div>
            <div className="gx-app-login-content">
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "The input is not valid user ID!",
                    },
                  ]}>
                  <Input placeholder="User ID" />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your Password!" },
                  ]}>
                  <Input type="password" placeholder="Password" />
                </Form.Item>

                {showOtp && (
                  <Form.Item
                    name="OTP"
                    rules={[{ required: true, message: "Please input Otp!" }]}>
                    <Input type="number" placeholder="OTP" />
                  </Form.Item>
                )}

                <Form.Item className="sign_btn">
                  <Button type="primary" htmlType="submit">
                    {showOtp ? "Verify OTP" : "Sign in"}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>

          <div className="gx-text-center gx-py-2 gx-font-weight-bold gx-fs-lg gx-text-white">
            Note- This Website Is Not For Indian Territory
          </div>
          <div
            className="gx-text-red gx-text-center gx-fs-xl gx-font-weight-bold"
            style={{ marginTop: "12px" }}>
            18+ Only
          </div>
        </div>
      )}
    </div>
  );
};

export default Signin;
