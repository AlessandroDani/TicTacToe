// eslint-disable-next-line react/prop-types
function Square({ children, index, isSelected, updateBoard, className }) {
  const select = `${isSelected ? "is-selected" : ""}`
  
  const handleClick = () => {
    updateBoard(index);
  };

  return (
      <div className={`square ${className} ${select}`} onClick={handleClick}>
        {children}
      </div>
  );
}

export default Square;
