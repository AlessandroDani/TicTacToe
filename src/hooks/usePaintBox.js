import { useState } from "react";
import { valueGroups, findPos } from "../constants";

export function usePaintBox() {
  const [paintWinnerBox, setPaintWinnerBox] = useState([]);
  const [cellAllWin, setCellAllWin] = useState([]);

  const paint = ({ middleIndex, turn}) => {
    const sum = [...paintWinnerBox];
    sum[middleIndex] = turn;

    const aux = [...cellAllWin];
    const addNextWinnerCell = valueGroups[findPos[middleIndex]];
    addNextWinnerCell.push(...aux);

    setCellAllWin(addNextWinnerCell);
    setPaintWinnerBox(sum);
    return addNextWinnerCell
  };

  const resetPaintBox = () => {
    setCellAllWin([])
    setPaintWinnerBox([])
  }

  return { cellAllWin, paintWinnerBox, paint, resetPaintBox };
}
