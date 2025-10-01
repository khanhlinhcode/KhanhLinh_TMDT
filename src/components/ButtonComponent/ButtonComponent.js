import { Button } from "antd";

const ButtonComponent = ({
  size,
  styleButton,
  styleTextButton,
  textButton,
  ...rest
}) => {
  return (
    <Button size={size} style={styleButton} {...rest}>
      <span style={styleTextButton}>{textButton}</span>
    </Button>
  );
};
export default ButtonComponent;
