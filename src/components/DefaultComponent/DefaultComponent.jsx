import Headercomponent from "../HeaderComponent/Headercomponent";

const DefaultComponent = ({ children }) => {
  return (
    <div>
      <Headercomponent />
      {children}
    </div>
  );
};

export default DefaultComponent;
