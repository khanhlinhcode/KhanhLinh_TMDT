import React, { useState } from "react";
import { WrapperInputStyle, WrapperPasswordStyle } from "./style";

const InputForm = (props) => {
  const [valueInput, setValueInput] = useState("");
  const { placeholder = "Nhập Text", type = "text", ...rests } = props;

  if (type === "password") {
    return (
      <WrapperPasswordStyle
        placeholder={placeholder}
        value={valueInput}
        onChange={(e) => setValueInput(e.target.value)}
        {...rests}
      />
    );
  }

  return (
    <>
      <WrapperInputStyle
        placeholder={placeholder}
        value={valueInput}
        onChange={(e) => setValueInput(e.target.value)}
        {...rests}
      ></WrapperInputStyle>
    </>
  );
};

export default InputForm; 
