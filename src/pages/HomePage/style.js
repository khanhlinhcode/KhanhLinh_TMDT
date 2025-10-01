import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  justify-content: flex-start;
  border-bottom: 1px solid red;
  height: 40px;
`;

export const WrapperButtonMore = styled(ButtonComponent)`
  width: 240px; /* fix chiều rộng */
  height: 38px;
  border: 1px solid rgb(11, 116, 229);
  border-radius: 4px;
  margin-top: 20px;
  background-color: #fff;
  color: rgb(11, 116, 229);

  &:hover {
    color: #fff;
    background: rgb(13, 92, 182);

    span {
      color: #fff;
    }
  }
`;

export const WrapperProducts = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
  flex-wrap: wrap;
`;
