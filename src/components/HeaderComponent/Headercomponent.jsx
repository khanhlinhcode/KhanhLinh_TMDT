import { Badge, Col, Popover } from "antd";
import {
  WrapperContentPopup,
  WrapperHeader,
  WrapperHeaderAccount,
  WrapperTextHeader,
  WrapperTextHeaderSmall,
} from "./style";
import * as UserService from "../../../src/services/UserService";
import {
  CaretDownOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../redux/slide/userSlide";
import { useState } from "react";
import Loading from "../LoadingComponent/Loading";

const Headercomponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };
  const handleLogout = async () => {
    setLoading(true);
    try {
      await UserService.logoutUser(); // gọi API logout
      dispatch(resetUser()); // ✅ xoá user khỏi Redux
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log("user", user);
  const content = (
    <div>
      <WrapperContentPopup onClick={handleLogout}>
        Đăng xuất
      </WrapperContentPopup>
      <WrapperContentPopup onClick={() => navigate("/profile-user")}>
        Thông tin người dùng
      </WrapperContentPopup>
    </div>
  );
  console.log("user", user.name.length);

  return (
    <div>
      <WrapperHeader gutter={16}>
        <Col span={6}>
          <WrapperTextHeader>
            KHANHLINHCODE <br />
            Lập Trình ReactJS
          </WrapperTextHeader>
        </Col>
        <Col span={12}>
          <ButtonInputSearch
            size="large"
            placeholder="Tìm kiếm sản phẩm, danh mục hay thương hiệu mong muốn ..."
            textButton="Tìm Kiếm"
          />
        </Col>
        <Col
          span={6}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 20,
            alignItems: "center",
          }}
        >
          <Loading isLoading={loading}>
            <WrapperHeaderAccount>
              <UserOutlined style={{ fontSize: "25px" }} />
              {user?.access_token ? (
                <>
                  <Popover content={content} trigger="click">
                    <div style={{ cursor: "pointer" }}>
                      {user?.name?.length > 2 ? user.name : "User"}
                    </div>
                  </Popover>
                </>
              ) : (
                <div
                  onClick={handleNavigateLogin}
                  style={{ cursor: "pointer" }}
                >
                  <WrapperTextHeaderSmall>
                    Đăng Nhập/Đăng ký
                  </WrapperTextHeaderSmall>
                  <div>
                    <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                    <CaretDownOutlined />
                  </div>
                </div>
              )}
            </WrapperHeaderAccount>
          </Loading>
          <WrapperHeaderAccount>
            <div>
              <Badge count={4}>
                <ShoppingCartOutlined style={{ fontSize: "25px" }} />
              </Badge>
              <WrapperTextHeaderSmall>Giỏ Hàng</WrapperTextHeaderSmall>
            </div>
          </WrapperHeaderAccount>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default Headercomponent;
