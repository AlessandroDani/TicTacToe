import Square from "./Square";
import { useSquare } from "../hooks/useSquare";

function BoardMap({
  board,
  updateBoard,
  winnerBox,
  paintWinnerBox,
  highlight,
}) {
  const { getSquareClass } = useSquare({ size: 9, highlight: highlight });
  return (
    <section className="game">
      {board.map((info, index) => {
        return (
          <Square
            key={index}
            index={index}
            updateBoard={updateBoard}
            className={getSquareClass({ index: index })}
            winnerClass={winnerBox.includes(index) ? "winnerCell" : ""}
            winnerBox={paintWinnerBox[index]}
          >
            {info}
          </Square>
        );
      })}
    </section>
  );
}
export default BoardMap;
