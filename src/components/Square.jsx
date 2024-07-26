// eslint-disable-next-line react/prop-types
function Square({ children, index, isSelected, updateBoard, className, winnerClass }) {
  const select = `square ${isSelected ? "is-selected" : ""}`;
  
  const handleClick = () => {
    updateBoard(index);
  };

  if(winnerClass){
    console.log(index, 'SI')
  }

  return (
      <div className={`square ${className} ${select} ${winnerClass ? "winnerCell" : ""}`} onClick={handleClick}>
        {children}
      </div>
  );
}

export default Square;
