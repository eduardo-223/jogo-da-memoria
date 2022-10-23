import * as Styled from "./styled";

import svg from "../../Assets/Img/b7.svg";
import { Items } from "../../Data/Items";

type GridItemType = {
  item: number | null;
  shown: boolean;
  permanentShownn: boolean;
};

interface GridItemsProps {
  item: GridItemType;
  onClick: () => void;
}

export const GridItems = ({ item, onClick }: GridItemsProps) => {
  return (
    <Styled.Container 
    showBackground={item.permanentShownn || item.shown}
    onClick={onClick}>
      {!item.permanentShownn && !item.shown && <Styled.Icon src={svg} alt="" opacity={.1}/>}
      {(item.permanentShownn || item.shown) && item.item !== null && (
        <Styled.Icon src={Items[item.item].icon} alt="" />
      )}
    </Styled.Container>
  );
};
