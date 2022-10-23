import styled from "styled-components";

type ContainerProps = {
  showBackground: boolean;
};
type OpacityProps = {
  opacity?: number;
};

export const Container = styled.div<ContainerProps>`
  background-color: ${(props) =>
    props.showBackground ? "#1550ff" : "#e2e3e3"};
  height: 100px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const Icon = styled.img<OpacityProps>`
  width: 40px;
  height: 40px;
  opacity: ${(props) => props.opacity ?? 1};
`;
