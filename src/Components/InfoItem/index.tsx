import * as Styled from "./styled";

type PropsInfoItem = {
    label: string;
    value: string;
}

export const InfoItem = ({label, value}: PropsInfoItem) => {
    return (
        <Styled.Container>
            <Styled.Label>
                {label}
            </Styled.Label>
            <Styled.Value>
                {value}
            </Styled.Value>
        </Styled.Container>
    )
}