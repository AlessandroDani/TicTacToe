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
  let paintCell = "";
  if (isSelected) {
    selectClassName = isSelected === "X" ? "is-selected-x" : "is-selected-o";
  }

  if (winnerBox) {
    turn = winnerBox === "X" ? "x" : "o";
    img = `/symbol-${turn}.svg`;
    paintCell = winnerBox === "X" ? "winX" : "winO";
  }else{
    winnerBox = ""
  }

  const handleClick = () => {
    updateBoard(index);
  };

  const classImage = `winner-image ${paintCell}`;

  //console.log(`square ${className} ${selectClassName} ${winnerClassName} ${winnerBox} ${paintCell}`)

  return (
    <div
      className={`square ${className} ${selectClassName} ${winnerClassName} ${winnerBox} ${paintCell}`}
      onClick={handleClick}
    >
      {children}
      {winnerBox && 
      <img src={img} className={classImage} alt="Winner" />
      }
      
    </div>
  );
}

export default Square;
