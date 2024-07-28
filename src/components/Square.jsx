function Square({
  children,
  index,
  isSelected,
  updateBoard,
  className,
  winnerClass,
  winnerBox,
}) {
  const winnerClassName = `${winnerClass ? "winnerCell" : ""}`;

  let selectClassName = "";
  let turn = "";
  let img = "";
  if (isSelected) {
    selectClassName = isSelected === "X" ? "is-selected-x" : "is-selected-o";
  }

  if (winnerBox) {
    turn = isSelected === "X" ? "o" : "x";
    img = `/symbol-${turn}.svg`;
    console.log('entra')
  }

  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div
      className={`square ${className} ${selectClassName} ${winnerClassName} ${winnerBox}`}
      onClick={handleClick}
    >
      {children}
      {winnerBox && <img src={img} className="winner-image" alt="Winner" />}
    </div>
  );
}

export default Square;
