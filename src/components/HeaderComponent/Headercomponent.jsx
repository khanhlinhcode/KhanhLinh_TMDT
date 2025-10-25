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
import { useEffect, useState } from "react";
import Loading from "../LoadingComponent/Loading";

const Headercomponent = ({ isHiddentSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
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

  useEffect(() => {
    setLoading(true);
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
    setLoading(false);
  }, [user.name, user?.avatar]);

  const content = (
    <div>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => navigate("/system/admin")}>
          Quản lý hệ thống
        </WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => navigate("/profile-user")}>
        Thông tin người dùng
      </WrapperContentPopup>
      <WrapperContentPopup onClick={handleLogout}>
        Đăng xuất
      </WrapperContentPopup>
    </div>
  );
  console.log("user", user.name.length);

  return (
    <div>
      <WrapperHeader
        gutter={16}
        style={{
          justifyContent:
            isHiddentSearch && isHiddentSearch ? "space-between" : "unset",
        }}
      >
        <Col span={5}>
          <WrapperTextHeader>
            KHANHLINHCODE <br />
            Lập Trình ReactJS
          </WrapperTextHeader>
        </Col>
        {!isHiddentSearch && (
          <Col span={13}>
            <ButtonInputSearch
              size="large"
              placeholder="Tìm kiếm sản phẩm, danh mục hay thương hiệu mong muốn ..."
              textButton="Tìm Kiếm"
            />
          </Col>
        )}
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
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt="avatar"
                  style={{
                    height: "40px",
                    width: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <UserOutlined style={{ fontSize: "25px" }} />
              )}
              {user?.access_token ? (
                <>
                  <Popover
                    content={content}
                    trigger="click"
                    style={{ float: "right" }}
                  >
                    <div style={{ cursor: "pointer" }}>
                      {userName?.length > 2 ? userName : user?.email}
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
          {!isHiddenCart && (
            <div>
              <Badge count={4}>
                <ShoppingCartOutlined style={{ fontSize: "25px" }} />
              </Badge>
              <WrapperTextHeaderSmall>Giỏ Hàng</WrapperTextHeaderSmall>
            </div>
          )}
          <WrapperHeaderAccount></WrapperHeaderAccount>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default Headercomponent;
