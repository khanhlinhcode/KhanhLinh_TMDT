import { Input } from "antd";

const InputComponent = ({ size, placeholder, style, ...rests }) => {
  return (
    <Input
      size={size}
      allowClear
      placeholder={placeholder}
      style={{ ...style, border: "none", borderRadius: 0 }}
    />
  );
};

export default InputComponent;
