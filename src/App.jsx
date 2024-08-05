import Winner from "./components/Winner";
import Turn from "./components/Turn";
import BoardMap from "./components/BoardMap";
import { useBoard } from "./hooks/useBoard";

function App() {
  const {
    board,
    turn,
    winner,
    winnerBox,
    highlight,
    paintWinnerBox,
    updateBoard,
    reset,
  } = useBoard();

  return (
    <main className="board">
      <h1>Ultimate Tic Tac Toe</h1>
      <BoardMap
        board={board}
        winnerBox={winnerBox}
        paintWinnerBox={paintWinnerBox}
        updateBoard={updateBoard}
        highlight={highlight}
      />
      <section className="turn">
        <Turn turn={turn} />
      </section>

      {winner !== null && <Winner winner={winner} turn={turn} reset={reset} />}
    </main>
  );
}

export default App;
