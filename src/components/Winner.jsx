import { TURNS } from "../logic/constants";
import Square from "./Square";

function Winner({winner, turn, reset}) {

  return (
    <section className="winner">
      <div className="text">
        <h2>{winner == false ? "Empate" : "Ganó"}</h2>
        <div className="win">
          <Square>
            {winner == false ? ":C" : turn === TURNS.X ? TURNS.O : TURNS.X}
          </Square>
        </div>
        <footer>
          <button onClick={reset}>Empezar de nuevo</button>
        </footer>
      </div>
    </section>
  );
}

export default Winner;