import React, { useState } from "react";
import { UserOutlined, ProductOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { getItem } from "../../utils";

import Headercomponent from "../../components/HeaderComponent/Headercomponent";
import AdminUser from "../../components/AdminUSer/AdminUser";
import AdminProduct from "../../components/AdminProduct/AdminProduct";

const AdminPage = () => {
  const items = [
    getItem("Người Dùng", "user", <UserOutlined />),
    getItem("Sản Phẩm", "Product", <ProductOutlined />),
  ];

  const [keySelected, setKeySelected] = useState("");
  const renderPage = (key) => {
    switch (key) {
      case "user":
        return <AdminUser />;
      case "Product":
        return <AdminProduct />;
      default:
        return <></>;
    }
  };
  const handleOnclick = ({ key }) => {
    console.log("click", { key });
    setKeySelected(key);
  };
  console.log("keySelected", keySelected);

  return (
    <>
      <Headercomponent isHiddentSearch={true} isHiddenCart={true} />
      <div style={{ display: "flex" }}>
        <Menu
          mode="inline"
          style={{
            width: 256,
            boxShadow: "1px 1px 2px #ccc",
            height: "100vh",
          }}
          items={items}
          onClick={handleOnclick}
        />
        <div style={{ flex: 1, padding: "20px" }}>
          {renderPage(keySelected)}
        </div>
        <span>test</span>
      </div>
    </>
  );
};

export default AdminPage;
