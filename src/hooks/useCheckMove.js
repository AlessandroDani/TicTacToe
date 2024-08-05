import { useState } from "react";
import { WINNERS_MOVE, findPos, valueGroups } from "../constants";

export function useCheckMove() {
  const [cellWinX, setCellWinX] = useState([]);
  const [cellWinO, setCellWinO] = useState([]);

  const checkWinnerFinalGame = ({ lastWinner, turn }) => {
    if (turn === "X") {
      const aux = [...cellWinX];
      aux.push(findPos[lastWinner[0]]);
      setCellWinX(aux);
      return checkWinnerMove(true, aux);
    } else {
      const aux = [...cellWinO];
      aux.push(findPos[lastWinner[0]]);
      setCellWinO(aux);
      return checkWinnerMove(true, aux);
    }
  };
  /**
   * Check if the game is over
   * @param {Array} param0
   * @returns
   */
  const checkEndGame = ({ changeBoard }) => {
    return changeBoard.every((value) => value !== null);
  };

  /**
   * Check if there is a 3x3 winner
   * @param {Array} param0
   * @returns indexs where the player won
   */
  const checkWinner = ({ changeBoard, index, turn }) => {
    let moves = [];
    let indexs = [];
    const checkSquare = valueGroups[findPos[index]];
    checkSquare.forEach((value, index) => {
      if (changeBoard[value] === turn) {
        moves.push(index);
      }
      indexs.push(value);
    });

    return checkWinnerMove(indexs, moves);
  };

  const checkWinnerMove = (indexs, moves) => {
    for (const combo of WINNERS_MOVE) {
      const [a, b, c] = combo;
      if (moves.includes(a) && moves.includes(b) && moves.includes(c)) {
        return indexs;
      }
    }
    return null;
  };

  const resetCheckMove = () => {
    setCellWinO([])
    setCellWinX([])
  }

  return { checkWinner, checkWinnerFinalGame, checkEndGame, resetCheckMove };
}
