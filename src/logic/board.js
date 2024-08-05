import { TURNS } from "./constants";

export function switchTurn(currentTurn) {
  return currentTurn === TURNS.X ? TURNS.O : TURNS.X;
}

export function shouldUpdateBoard(changeBoard, winner, highlight, index) {
  return (
    changeBoard[index] ||
    winner ||
    !highlight.includes(index) ||
    highlight.size > 10
  );
}
