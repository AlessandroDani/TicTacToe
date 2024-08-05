import { TURNS } from "../logic/constants";
import Square from "./Square";

function Turn({ turn }) {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <Square isSelected={turn === TURNS.X ? TURNS.X : null}>X</Square>
      <Square isSelected={turn === TURNS.O ? TURNS.O : null}>O</Square>
    </div>
  );
}

export default Turn