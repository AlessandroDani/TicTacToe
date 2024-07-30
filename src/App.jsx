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
  const [paintWinnerBox, setPaintWinnerBox] = useState([]);
  const [cellWin, setCellWin] = useState([]);

  /**
   * Identify index where Symbol X or O will be paint,
   * this index is the center of the 3x3
   * @param {Integer} index
   */
  const paintBox = (middleIndex) => {
    const sum = [...paintWinnerBox];
    sum[middleIndex] = turn;

    const aux = [...cellWin]
    const addNextWinnerCell = highlight;
    console.log("cuanto vale:", addNextWinnerCell)
    addNextWinnerCell.push(...aux);

    
    setCellWin(addNextWinnerCell)
    setPaintWinnerBox(sum);
    return addNextWinnerCell
  };

  /**
   * Change where the next turn have to play
   * @param {Integer} index
   */
  const indexInSquare = (index, paint) => {
    const nextMove = valueGroups[arrayPos[index]];
    console.log("Aqui esta el valor de valueGroup", nextMove)
    console.log("Aqui esta el valor de celdas ganadas", cellWin)
    console.log("Aqui esta el valor de paint", paint)
    let otherMove = [];
    if(paint.includes(nextMove[0])){
      for(let i =0; i < 9; i++){
        const matriz = valueGroups[i];
        if(!paint.includes(matriz[0])){
          otherMove.push(...matriz)
        }
      }
      console.log("puedo jugar en estas posiciones: ", otherMove)
      return setHighlight(otherMove)
    }
    console.log("puedo jugar en estas posiciones: ", otherMove)
    return setHighlight(nextMove);
  };

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

    const newWinner = checkWinner({ changeBoard });
    let paintNextMove = cellWin
    console.log("aqui es cuando no verifica si hay ganador", paintNextMove)
    if (newWinner) {
      newWinner.push(...winnerBox);
      setWinnerBox(newWinner);
      paintNextMove = paintBox(newWinner[4]);
      //Aqui debo verificar si hay ganador.
    } else {
      if (checkEndGame({ changeBoard })) {
        setWinner(false);
      }
    }

    indexInSquare(index, paintNextMove);
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
  const checkWinner = ({ changeBoard }) => {
    let moves = [];
    let indexs = [];
    highlight.forEach((i, e) => {
      if (changeBoard[i] === turn) {
        moves.push(e);
      }
      indexs.push(i);
    });

    //console.log(moves)
    for (const combo of WINNERS_MOVE) {
      const [a, b, c] = combo;
      if (moves.includes(a) && moves.includes(b) && moves.includes(c)) {
        return indexs;
      }
    }
    return null;
  };

  /**
   * Restart the game
   */
  const handleRestart = () => {
    setBoard(Array(size * size).fill(null));
    setWinner(null);
    setTurn(TURNS.X);
    setWinnerBox(null);
    setHighlight(null);
    setPaintWinnerBox(null);
  };

  /**
   * Identify all Square in a 3x3
   * @param {Integer} index
   * @returns string with a class, if the next move is
   * in the index
   */
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
        <h1>Ultimate Tic Tac Toe</h1>
        <section className="game">
          {board.map((info, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
                className={getSquareClass(index)}
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
