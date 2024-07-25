import { useState } from "react";
import Square from "./components/Square"
import { TURNS, WINNERS_MOVE } from "./constants"


function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);

  const updateBoard = (index) => {
    const changeBoard = [...board]
    if(changeBoard[index]) return
    changeBoard[index] = turn
    setBoard(changeBoard)

    if(checkWinner({changeBoard})){
        console.log('hay ganador')
        return
    }

    const changeTurn = turn===TURNS.X ? TURNS.O: TURNS.X
    setTurn(changeTurn)
  }

  const checkWinner = ({changeBoard}) => {
    //console.log(changeBoard)
    for(const combo of WINNERS_MOVE){
        const [a,b,c] = combo
        if(changeBoard[a] && changeBoard[a] === changeBoard[b] && changeBoard[b] === changeBoard[c]){
            return true;
        }
    }
    return false;
  }

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
                >
                {info}
                </Square>
              </>
            );
          })}
        </section>

        <section className="turn">
          <div style={{ display: "flex", gap: "1rem" }}>
            <Square isSelected={turn===TURNS.X}>X</Square>
            <Square isSelected={turn===TURNS.O}>O</Square>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
