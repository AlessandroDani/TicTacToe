import { useState } from "react";
import Square from "./components/Square";
import { TURNS } from "./constants";
import { usePaintBox } from "./hooks/usePaintBox";
import { useHighlight } from "./hooks/useHighlight";
import { useCheckMove } from "./hooks/useCheckMove";
import { useSquare } from "./hooks/useSquare";

function App() {
  const [board, setBoard] = useState(Array(81).fill(null));
  const [turn, setTurn] = useState(TURNS.X);

  const [winner, setWinner] = useState(null);
  const [winnerBox, setWinnerBox] = useState([]);

  const { checkEndGame, checkWinner, checkWinnerFinalGame, resetCheckMove } = useCheckMove();
  const { highlight, indexInSquare, resetHighlight } = useHighlight();
  const { cellAllWin, paintWinnerBox, paint, resetPaintBox } = usePaintBox();
  const { getSquareClass } = useSquare({ size: 9, highlight: highlight});

  /**
   * Change the board
   * @param {Integer} index
   * @returns
   */
  const updateBoard = (index) => {
    const changeBoard = [...board];

    if (
      changeBoard[index] ||
      winner ||
      !highlight.includes(index) ||
      highlight.size > 10
    )
      return;

    changeBoard[index] = turn;
    setBoard(changeBoard);

    const changeTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(changeTurn);

    const newWinner = checkWinner({ changeBoard: changeBoard, index: index, turn: turn});
    let paintNextMove = cellAllWin;
    if (newWinner) {
      newWinner.push(...winnerBox);
      setWinnerBox(newWinner);
      paintNextMove = paint({ middleIndex: newWinner[4], turn: turn });
      if (checkWinnerFinalGame({ lastWinner: newWinner, turn: turn })) {
        setWinner(true);
        return;
      }
    } else {
      if (checkEndGame({ changeBoard: changeBoard })) {
        setWinner(false);
      }
    }

    indexInSquare({ index: index, cellWins: paintNextMove });
  };

  /**
   * Restart the game
   */
  const handleRestart = () => {
    setBoard(Array(81).fill(null));
    setWinner(null);
    setTurn(TURNS.X);
    setWinnerBox([]);

    resetPaintBox()
    resetCheckMove()
    resetHighlight()
  };

  return (
    <>
      <main className="board">
        <h1>Ultimate Tic Tac Toe</h1>
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

        <section className="turn">
          <div style={{ display: "flex", gap: "1rem" }}>
            <Square isSelected={turn === "X" ? "X" : null}>X</Square>
            <Square isSelected={turn === "O" ? "O" : null}>O</Square>
          </div>
        </section>

        {winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>{winner == false ? "Empate" : "Ganó"}</h2>
              <div className="win">
                <Square>
                  {winner == false ? ":C" : turn === "X" ? "O" : "X"}
                </Square>
              </div>
              <footer>
                <button onClick={handleRestart}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export default App;
