import { WrapperInputStyle } from "./style";

const InputForm = (props) => {
  const { placeholder = "Nhập Text", ...rests } = props;
  const handleOnchangeInput = (e) => {
    props.onChange(e.target.value);
    console.log("value", e.target.value);
  };
  return (
    <WrapperInputStyle
      placeholder={placeholder}
      value={props.value}
      {...rests}
      onChange={handleOnchangeInput}
    ></WrapperInputStyle>
  );
};

export default InputForm;
