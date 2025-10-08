import React from "react";
import { Image } from "antd";
import { useNavigate } from "react-router-dom";
import ImageSignIn from "../../../assets/Images/sign-in.png";
import * as UserService from "../../../services/UserService";
import InputForm from "../../../components/InputForm/InputForm";
import { useMutationnHook } from "../../../hooks/useMutationHook";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import Loading from "../../../components/LoadingComponent/Loading";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";

import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "./style";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = React.useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] =
    React.useState(false);
  // set input email
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };

  const mutation = useMutationnHook((data) => UserService.signupUser(data));
  console.log("mutation", mutation);

  const { data, isPending: isLoading = false } = mutation;
  // set input password

  const handleOnchangePassword = (value) => {
    setPassword(value);
  };

  const handleOnchangeComfirmPassword = (value) => {
    setConfirmPassword(value);
  };

  const handleNavigateSignIn = () => {
    navigate("/sign-in");
  };
  const handleSignUp = () => {
    mutation.mutate({ email, password, confirmPassword });
    console.log("sign-up", email, password, confirmPassword);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.53)",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "800px",
          height: "445px",
          borderRadius: "6px",
          background: "#fff",
          display: "flex",
        }}
      >
        {/* LEFT */}
        <WrapperContainerLeft style={{ flex: 1 }}>
          <h1>Xin Chào</h1>
          <p>Đăng Ký Tài Khoản Mới</p>

          {/* Email */}
          <InputForm
            style={{ marginBottom: "10px", width: "100%" }}
            placeholder="abc@gmail.com"
            value={email}
            onChange={handleOnchangeEmail}
          />

          {/* Password */}
          <div style={{ position: "relative", width: "100%" }}>
            <InputForm
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={handleOnchangePassword}
              placeholder="Password"
              style={{ marginBottom: "10px", width: "100%" }}
            />
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                position: "absolute",
                right: "8px",
                top: "8px",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
          </div>

          {/* Confirm Password */}
          <div style={{ position: "relative", width: "100%" }}>
            <InputForm
              type={isShowConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleOnchangeComfirmPassword}
              placeholder="Confirm Password"
              style={{ marginBottom: "10px", width: "100%" }}
            />
            <span
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              style={{
                position: "absolute",
                right: "8px",
                top: "8px",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
          </div>
          {data?.status === "ERROR" && (
            <p style={{ color: "red" }}>{data?.message}</p>
          )}
          <Loading isLoading={isLoading}>
            {/* Button */}
            <ButtonComponent
              disabled={
                !email.length || !password.length || !confirmPassword.length
              }
              onClick={handleSignUp}
              size="large"
              styleButton={{
                background: "rgb(255, 57, 69)",
                height: "48px",
                width: "100%",
                border: "none",
                marginTop: "26px",
                borderRadius: "4px",
              }}
              textButton={"Đăng ký"}
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
            />
          </Loading>

          <p style={{ marginTop: "10px" }}>
            Bạn đã có tài khoản?{" "}
            <WrapperTextLight onClick={handleNavigateSignIn}>
              Đăng Nhập
            </WrapperTextLight>
          </p>
        </WrapperContainerLeft>

        {/* RIGHT */}
        <WrapperContainerRight>
          <Image
            src={ImageSignIn}
            preview={false}
            alt="image Sign-in"
            height="203px"
            width="203px"
          />
          <h4>Mua Sắm tại KLShop</h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignUpPage;
