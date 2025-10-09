import { Image } from "antd";
import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as UserService from "../../../services/UserService";
import ImageSignIn from "../../../assets/Images/sign-in.png";
import InputForm from "../../../components/InputForm/InputForm";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { useMutationnHook } from "../../../hooks/useMutationHook";
import Loading from "../../../components/LoadingComponent/Loading";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "./style";
import { updateUser } from "../../../redux/slide/userSlide";
// import ComponentStyle from "styled-components/dist/models/ComponentStyle";

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();
  const [isShowPassword, setIsShowPassword] = React.useState(false);

  const mutation = useMutationnHook((data) => UserService.loginUser(data));
  console.log("mutation", mutation);
  const { data, isPending: isLoading = false, isSuccess } = mutation;

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      localStorage.setItem("access_token", data?.access_token);
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        console.log("decoded", decoded);
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token);
        }
      }
    } else {
    }
  }, [isSuccess]);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };

  // set input password
  const handleOnchangePassword = (value) => {
    setPassword(value);
  };

  const handleSignIn = () => {
    mutation.mutate({ email, password });
    console.log("sign-in", email, password);
  };

  const handleNavigateSignUp = () => {
    navigate("/sign-up");
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
          <p>Đăng Nhập Vào Tài Khoản</p>

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
          {data?.status === "ERROR" && (
            <span style={{ color: "red" }}>{data?.message}</span>
          )}
          <Loading isLoading={isLoading}>
            {/* Button */}
            <ButtonComponent
              disabled={!email.length || !password.length}
              onClick={handleSignIn}
              size="large"
              styleButton={{
                background: "rgb(255, 57, 69)",
                height: "48px",
                width: "100%",
                border: "none",
                marginTop: "26px",
                borderRadius: "4px",
              }}
              textButton="Đăng Nhập"
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
            />
          </Loading>

          <p style={{ marginTop: "10px" }}>
            <WrapperTextLight>Quên mật khẩu ?</WrapperTextLight>
          </p>

          <p style={{ marginTop: "5px" }}>
            Chưa có tài khoản?{" "}
            <WrapperTextLight onClick={handleNavigateSignUp}>
              Tạo tài khoản
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

export default SignInPage;
