import { useState } from "react";
import Square from "./components/Square";
import { TURNS, WINNERS_MOVE } from "./constants";

function App() {
  const size = 9;
  const [board, setBoard] = useState(Array(size*size).fill(null));
  console.log(board)
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {
    const changeBoard = [...board];
    if (changeBoard[index] || winner) return;
    changeBoard[index] = turn;
    setBoard(changeBoard);

    const changeTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(changeTurn);

    const newWinner = checkWinner({ changeBoard });
    if (newWinner) {
      setWinner(newWinner);
    } else {
      if (checkEndGame({ changeBoard })) {
        setWinner(false);
      }
    }
  };

  const checkEndGame = ({ changeBoard }) => {
    return changeBoard.every((value) => value !== null);
  };

  const checkWinner = ({ changeBoard }) => {
    for (const combo of WINNERS_MOVE) {
      const [a, b, c] = combo;
      if (
        changeBoard[a] &&
        changeBoard[a] === changeBoard[b] &&
        changeBoard[b] === changeBoard[c]
      ) {
        return changeBoard[a];
      }
    }
    return null;
  };

  const handleRestart = () => {
    setBoard(Array(size*size).fill(null));
    setWinner(null);
    setTurn(TURNS.X);
  };

  const getSquareClass = (index) => {
    const row = Math.floor(index / size);
    const col = index % size;
    const groupRow = Math.floor(row / 3);
    const groupCol = Math.floor(col / 3);
    return `group-${groupRow}-${groupCol}`;
  };

  return (
    <>
      <main className="board">
        <h1>Tic Tac Toe</h1>
        <section className="game">
          {board.map((info, index) => {
            return (
              <>
                <Square key={index} index={index} updateBoard={updateBoard} className={getSquareClass(index)}>
                  {info}
                </Square>
              </>
            );
          })}
        </section>

        <section className="turn">
          <div style={{ display: "flex", gap: "1rem" }}>
            <Square isSelected={turn === TURNS.X}>X</Square>
            <Square isSelected={turn === TURNS.O}>O</Square>
          </div>
        </section>

        {winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>{winner == false ? "Empate" : "Ganó"}</h2>
              <div className="win">
                <Square>{winner == false ? ":C" : winner}</Square>
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
