import { useState } from "react";
import Square from "./components/Square";
import { TURNS, WINNERS_MOVE, arrayPos, valueGroups } from "./constants";

function App() {
  const size = 9;
  const [board, setBoard] = useState(Array(size * size).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);
  const [winnerBox, setWinnerBox] = useState([]);
  const [highlight, setHighlight] = useState(
    Array.from({ length: 81 }, (_, i) => i)
  );


  const nextTurn = (index) => {
    const nextMove = valueGroups[arrayPos[index]];
    setHighlight(nextMove);
  };

  const updateBoard = (index) => {
    const changeBoard = [...board];

    if (changeBoard[index] || winner || !highlight.includes(index) || highlight.size > 10)
      return;

    changeBoard[index] = turn;
    setBoard(changeBoard);

    const changeTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(changeTurn);

    nextTurn(index);

    const newWinner = checkWinner({ changeBoard });
    if (newWinner) {
      newWinner.push(...winnerBox)
      console.log(newWinner)
      setWinnerBox(newWinner)
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
    let moves = [];
    let indexs = [];
    highlight.forEach((i,e) =>{
      if(changeBoard[i] === turn){
        moves.push(e);
      }
      indexs.push(i);
    })
    
    for (const combo of WINNERS_MOVE) {
      const [a, b, c] = combo
      if(moves[0] === a && moves[1]=== b && moves[2] ===c){
        return indexs;
      }
    }
    return null;
  };

  const handleRestart = () => {
    setBoard(Array(size * size).fill(null));
    setWinner(null);
    setTurn(TURNS.X);
  };

  const getSquareClass = (index) => {
    const row = Math.floor(index / size);
    const col = index % size;
    const groupRow = Math.floor(row / 3);
    const groupCol = Math.floor(col / 3);
    let className = `group-${groupRow}-${groupCol}`;

    if (highlight.includes(index)) {
      className += " highlight ";
    } else {
      className += " select ";
    }
    return className;
  };

  return (
    <>
      <main className="board">
        <h1>Tic Tac Toe</h1>
        <section className="game">
          {board.map((info, index) => {
            return (
              <>
                <Square
                  key={index}
                  index={index}
                  updateBoard={updateBoard}
                  className={getSquareClass(index)}
                  winnerClass={winnerBox.includes(index) ? 'winnerCell' : ''}
                >
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
