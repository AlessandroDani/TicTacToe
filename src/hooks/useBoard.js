import { useState } from "react";
import { TURNS } from "../logic/constants";
import { useCheckMove } from "./useCheckMove";
import { usePaintBox } from "./usePaintBox";
import { useHighlight } from "./useHighlight";
import { switchTurn, shouldUpdateBoard } from "../logic/board";
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
    indexInSquare({ index, cellWins: paintNext });
  };

  const checkNextMove = ({ changeBoard, index }) => {
    const newWinner = checkWinner({ changeBoard, index, turn });
    if (newWinner) {
      const { updatedWinnerBox, paintNextMove } = handleNewWinner(
        newWinner,
        winnerBox,
        paint,
        turn
      );
      setWinnerBox(updatedWinnerBox);

      if (checkWinnerFinalGame({ lastWinner: newWinner, turn })) {
        setWinner(true);
        return null;
      }
      return paintNextMove;
    } else if (checkEndGame({ changeBoard })) {
      setWinner(false);
    }
    return cellAllWin;
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
