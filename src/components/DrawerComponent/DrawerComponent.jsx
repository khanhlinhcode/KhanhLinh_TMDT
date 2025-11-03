import { Drawer } from "antd";

const DrawerComponent = ({
  title = "Drawer",
  placement = "right",
  isOpen = false,
  children, // ✅ nhận children từ props
  ...rests
}) => {
  return (
    <Drawer title={title} placement={placement} open={isOpen} {...rests}>
      {children}
    </Drawer>
  );
};

export default DrawerComponent;
