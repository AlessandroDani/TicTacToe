// eslint-disable-next-line react/prop-types
function Square({
  children,
  index,
  isSelected,
  updateBoard,
  className,
  winnerClass,
  winnerBox,
}) {
  const selectClassName = `${isSelected ? "is-selected" : ""}`;
  const winnerClassName = `${winnerClass ? "winnerCell" : ""}`;

  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div
      className={`square ${className} ${selectClassName} ${winnerClassName} ${winnerBox}`}
      onClick={handleClick}
    >
      {children}
      {winnerBox && (
        <img src="/symbol-x.svg" className="winner-image" alt="Winner" />
      )}
    </div>
  );
}

export default Square;
