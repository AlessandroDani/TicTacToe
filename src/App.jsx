import Square from "./components/Square";
import { TURNS } from "./constants";
import { useSquare } from "./hooks/useSquare";
import { useBoard } from "./hooks/useBoard";

function App() {
  const {board, turn, winner, winnerBox, highlight, paintWinnerBox, updateBoard, reset} = useBoard()
  const { getSquareClass } = useSquare({ size: 9, highlight: highlight});

  const handleRestart = () => {
    reset()
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
            <Square isSelected={turn === TURNS.X ?TURNS.X : null}>X</Square>
            <Square isSelected={turn === TURNS.O? TURNS.O : null}>O</Square>
          </div>
        </section>

        {winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>{winner == false ? "Empate" : "Ganó"}</h2>
              <div className="win">
                <Square>
                  {winner == false ? ":C" : turn === TURNS.X ? TURNS.O : TURNS.X}
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
