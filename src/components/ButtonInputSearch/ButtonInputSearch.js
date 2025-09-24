import { SearchOutlined } from "@ant-design/icons";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ButtonInputSearch = (props) => {
  const {
    size,
    placeholder,
    textButton,
    backgroundColorInput = "white",
    backgroundColorButton = "rgb(13, 92, 182)",
    colorButton = "white",
  } = props;
  return (
    <div style={{ display: "flex", gap: 0 }}>
      <InputComponent
        size={size}
        allowClear
        placeholder={placeholder}
        style={{
          flex: 1,
          backgroundColor: backgroundColorInput,
          border: "none",
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        }}
      />
      <ButtonComponent
        size={size}
        style={{
          border: "none",
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          backgroundColor: backgroundColorButton,
        }}
        icon={<SearchOutlined style={{ color: colorButton }} />}
      >
        <span style={{ color: colorButton }}>{textButton}</span>
      </ButtonComponent>
    </div>
  );
};

export default ButtonInputSearch;
