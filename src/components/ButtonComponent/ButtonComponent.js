import { Button } from "antd";

const ButtonComponent = ({
  size,
  style: styleButton,
  styleTextButton,
  children,
  ...rest
}) => {
  return (
    <Button size={size} style={styleButton} {...rest}>
      <span style={styleTextButton}>{children}</span>
    </Button>
  );
};

export default ButtonComponent;
