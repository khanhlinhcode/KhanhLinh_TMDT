import styled from "styled-components";

export const WrapperHeader = styled.h1`
  color: #000;
  font-size: 18px;
  margin: 4px 0;
`;

export const WrapperContentProfile = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  width: 600px;
  margin: 0 auto;
  padding: 30px;
  border-radius: 10px;
  gap: 30px;
`;
export const WrapperLabel = styled.label`
  color: #000;
  font-size: 14px;
  margin: 4px 0;
  line-height: 30px;
  font-weight: 600;
  width: 60px;
  text-align: left;
`;

export const WrapperInput = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* thêm khoảng cách giữa input và button */
  padding: 8px 0;
`;
