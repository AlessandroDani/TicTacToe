import { useState } from "react";
import { TURNS } from "../logic/constants";
import { useCheckMove } from "./useCheckMove";
import { usePaintBox } from "./usePaintBox";
import { useHighlight } from "./useHighlight";
import {shouldUpdateBoard, switchTurn} from "../logic/board"
import { handleNewWinner } from "../logic/game";

export function useBoard() {
  const [board, setBoard] = useState(Array(81).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);
  const [winnerBox, setWinnerBox] = useState([]);
  const { checkEndGame, checkWinner, checkWinnerFinalGame, resetCheckMove } =
    useCheckMove();
  const { highlight, indexInSquare, resetHighlight } = useHighlight();
  const { cellAllWin, paintWinnerBox, paint, resetPaintBox } = usePaintBox();

  const updateBoard = (index) => {
    const changeBoard = [...board];

    if (shouldUpdateBoard(changeBoard, winner, highlight, index)) return;

    changeBoard[index] = turn;
    setBoard(changeBoard);

    setTurn(switchTurn(turn));

    const paintNext = checkNextMove(changeBoard, index);
    indexInSquare({ index: index, cellWins: paintNext });
  };

  const checkNextMove = (changeBoard, index) => {
    const newWinner = checkWinner({
      changeBoard: changeBoard,
      index: index,
      turn: turn,
    });
    let paintNextMove = cellAllWin;

    if (newWinner) {
      newWinner.push(...winnerBox);
      setWinnerBox(newWinner);
      paintNextMove = paint({ middleIndex: newWinner[4], turn: turn });
      if (checkWinnerFinalGame({ lastWinner: newWinner, turn: turn })) {
        setWinner(true);
        return null;
      }
    } else {
      if (checkEndGame({ changeBoard: changeBoard })) {
        setWinner(false);
      }
    }
    return paintNextMove;
  };

  const reset = () => {
    resetCheckMove();
    resetHighlight();
    resetPaintBox();
    setBoard(Array(81).fill(null));
    setWinner(null);
    setTurn(TURNS.X);
    setWinnerBox([]);
  };

  return {
    board,
    turn,
    winner,
    winnerBox,
    highlight,
    paintWinnerBox,
    updateBoard,
    reset,
  };
}