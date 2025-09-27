import { Card } from "antd";
import styled from "styled-components";

export const WrapperCartStyle = styled(Card)`
  width: 240px;
  &img {
    height: 200px;
    width: 200px;
    object-fit: contain;
  },
  position: relative;
`;

export const StyleNameProduct = styled.div`
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: rgb(56, 56, 61);
  font-weight: 500;
`;

export const WrapperReportText = styled.div`¡
  font-size: 10px;
  color: rgb(128, 128, 137);
  display: flex;
  align-items: center;
  margin: 6px 0 0px;
`;

export const WrapperPriceText = styled.div`
  color: rgb(255, 66, 78);
  font-size: 16px;
  font-weight: 500;
`;
export const WrapperDiscountText = styled.span`
  color: rgb(255, 66, 78);
  font-size: 12px;
  font-weight: 500;
`;
