// eslint-disable-next-line react/prop-types
function Square({ children, index, isSelected, updateBoard, className, winnerClass }) {
  const select = `${isSelected ? "is-selected" : ""}`;
  
  const handleClick = () => {
    updateBoard(index);
  };

  if(winnerClass){
    console.log(`square ${className} ${select} ${winnerClass ? "winnerCell" : ""}`)
  }

  return (
      <div className={`square ${className} ${select} ${winnerClass ? "winnerCell" : ""}`} onClick={handleClick}>
        {children}
      </div>
  );
}

export default Square;
