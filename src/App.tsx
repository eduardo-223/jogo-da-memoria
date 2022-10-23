import { useEffect, useState } from "react";
import * as Styled from "./AppStyleds";

import { InfoItem } from "./Components/InfoItem";

import Logo from "./Assets/Img/devmemory_logo.png";
import Icon from "./Assets/Img/restart.svg";
import { Items } from "./Data/Items";

import { Button } from "./Components/Button";
import { GridItems } from "./Components/GridItems";
import { FormatTimeElapsed } from "./Helpers/FormatTimeElapsed";

type GridItemType = {
  item: number | null;
  shown: boolean;
  permanentShownn: boolean;
};

export const App = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => {
    resetAndCreateGrid();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) {
        setTimeElapsed(timeElapsed + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  useEffect(() => {
    if (shownCount === 2) {
      let opened = gridItems.filter((item) => item.shown === true);
      if (opened.length === 2) {
        if (opened[0].item === opened[1].item) {
          let tmpGrid = [...gridItems];
          for (let i in tmpGrid) {
            if (tmpGrid[i].shown) {
              tmpGrid[i].permanentShownn = true;
              tmpGrid[i].shown = false;
            }
          }
          setGridItems(tmpGrid);
          setShownCount(0);
        } else {
          setTimeout(() => {
            let tmpGrid = [...gridItems];
            for (let i in tmpGrid) {
              tmpGrid[i].shown = false;
            }
            setGridItems(tmpGrid);
            setShownCount(0);
          }, 1000);
        }

        setMoveCount((moveCount) => moveCount + 1);
      }
    }
  }, [shownCount, gridItems]);

  useEffect(() =>{
    if(moveCount > 0 && gridItems.every(item => item.permanentShownn === true)){
      setPlaying(false)
    }
  },[moveCount, gridItems])

  const handleItemClik = (index: number) => {
    if (playing && index !== null && shownCount < 2) {
      let tmpGrid = [...gridItems];

      if (
        tmpGrid[index].permanentShownn === false &&
        tmpGrid[index].shown === false
      ) {
        tmpGrid[index].shown = true;
        setShownCount(shownCount + 1);
      }
      setGridItems(tmpGrid);
    }
  };

  const resetAndCreateGrid = () => {
    setTimeElapsed(0);
    setMoveCount(0);
    setShownCount(0);

    let tmpGrid: GridItemType[] = [];

    for (let index = 0; index < Items.length * 2; index++)
      tmpGrid.push({
        item: null,
        shown: false,
        permanentShownn: false,
      });

    for (let count = 0; count < 2; count++) {
      for (let index = 0; index < Items.length; index++) {
        let position = -1;
        while (position < 0 || tmpGrid[position].item !== null) {
          position = Math.floor(Math.random() * (Items.length * 2));
        }
        tmpGrid[position].item = index;
      }
    }

    setGridItems(tmpGrid);

    setPlaying(true);
  };

  return (
    <Styled.Container>
      <Styled.Info>
        <Styled.LogoLink href="">
          <img src={Logo} width="200" alt="" />
        </Styled.LogoLink>
        <Styled.InfoArea>
          <InfoItem label="Tempo" value={FormatTimeElapsed(timeElapsed)} />
          <InfoItem label="Movimentos" value={moveCount.toString()} />
          <Button label="Reiniciar" icon={Icon} onClick={resetAndCreateGrid} />
        </Styled.InfoArea>
      </Styled.Info>
      <Styled.GridArea>
        <Styled.Grid>
          {gridItems.map((item, index) => {
            return (
              <GridItems
                key={index}
                item={item}
                onClick={() => handleItemClik(index)}
              />
            );
          })}
        </Styled.Grid>
      </Styled.GridArea>
    </Styled.Container>
  );
};
