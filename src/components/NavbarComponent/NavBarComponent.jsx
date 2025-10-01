import React from "react";
import {
  WrapperContent,
  WrapperLabelText,
  WrapperTextPrice,
  WrapperTextValue,
} from "./style";
import { Checkbox, Rate } from "antd";
import { convertLegacyProps } from "antd/es/button";
const NavBarComponent = () => {
  const onChange = (checkedValues) => {
    // Handle checkbox group change
    console.log("checked = ", checkedValues);
  };
  const renderContent = (type, options) => {
    switch (type) {
      case "Text":
        return options.map((option) => {
          return <WrapperTextValue> {option}</WrapperTextValue>;
        });
      case "checkbox":
        return (
          <Checkbox.Group
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
            onChange={onChange}
          >
            {options.map((option) => {
              return <Checkbox value={option.value}>{option.label}</Checkbox>;
            })}
          </Checkbox.Group>
        );
      case "star":
        return options.map((option) => {
          console.log("cehck", option);
          return (
            <div style={{ display: "flex", gap: "7px" }}>
              <Rate
                style={{ fontSize: "12px" }}
                disabled
                defaultValue={option}
              />
              <span style={{ fontSize: "12px" }}> {`Từ ${option} Sao`}</span>
            </div>
          );
        });
      case "price":
        return options.map((option) => {
          return <WrapperTextPrice>{option}</WrapperTextPrice>;
        });
      default:
        return <div>Default Content</div>;
    }
  };
  return (
    <div>
      <WrapperLabelText>Label</WrapperLabelText>
      <WrapperContent>
        {renderContent("Text", ["Tu Lanh", "May Giat", "May Lanh"])}
      </WrapperContent>
    </div>
  );
};

export default NavBarComponent;
