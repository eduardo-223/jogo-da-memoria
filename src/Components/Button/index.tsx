import * as Styled from "./styled";

type PropsButton = {
  label: string;
  icon?: any;
  onClick: React.MouseEventHandler<HTMLDivElement>;
};

export const Button = ({ label, icon, onClick }: PropsButton) => {
  return (
    <Styled.Container onClick={onClick}>
      {icon && (
        <Styled.IconArea>
          <Styled.Icon src={icon} />
        </Styled.IconArea>
      )}
      <Styled.Label>{label}</Styled.Label>
    </Styled.Container>
  );
};
