import { Button } from "antd";

const ButtonComponent = ({
  size,
  styleButton,
  styleTextButton,
  textButton,
  disabled,
  ...rest
}) => {
  return (
    <Button
      style={{
        ...styleButton,
        background: disabled ? "#e5e5e5" : styleButton?.background,
      }}
      size={size}
      {...rest}
    >
      <span style={styleTextButton}>{textButton}</span>
    </Button>
  );
};
export default ButtonComponent;
