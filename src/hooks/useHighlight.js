import { useState } from "react";
import { valueGroups, arrayPos } from "../constants";

export function useHighlight() {
  const [highlight, setHighlight] = useState(
    Array.from({ length: 81 }, (_, i) => i)
  );

  const indexInSquare = ({ index, cellWins}) => {
    const nextMove = valueGroups[arrayPos[index]];
    let otherMove = [];
    if (cellWins.includes(nextMove[0])) {
      for (let i = 0; i < 9; i++) {
        const matriz = valueGroups[i];
        if (!cellWins.includes(matriz[0])) {
          otherMove.push(...matriz);
        }
      }
      return setHighlight(otherMove);
    }
    return setHighlight(nextMove);
  };

  const resetHighlight= () => {
    setHighlight(Array.from({ length: 81 }, (_, i) => i))
  }


  return {highlight, indexInSquare, resetHighlight}
}
