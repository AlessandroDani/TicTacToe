export function useSquare({ size, highlight }) {
  const getSquareClass = ({ index }) => {
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

  return { getSquareClass };
}
