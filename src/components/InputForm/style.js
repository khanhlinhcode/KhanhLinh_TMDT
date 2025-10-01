import { Input } from "antd";
import styled from "styled-components";

export const WrapperInputStyle = styled(Input)`
  border: none !important;
  border-bottom: 1px solid #e5e5e5 !important;
  border-radius: 0 !important;
  background: transparent !important;   
  box-shadow: none !important;
  padding-left: 0;

  &:hover,
  &:focus {
    border: none !important;
    border-bottom: 1px solid #1677ff !important;
    box-shadow: none !important;
  }

  &::placeholder {
    color: #bfbfbf;
  }
`;

export const WrapperPasswordStyle = styled(Input.Password)`
  border: none !important;
  border-bottom: 1px solid #e5e5e5 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  padding-left: 0;

  &:hover,
  &:focus {
    border: none !important;
    border-bottom: 1px solid #1677ff !important;
    box-shadow: none !important;
  }

  &::placeholder {
    color: #bfbfbf;
  }
`;
