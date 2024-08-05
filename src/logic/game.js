export function handleNewWinner(newWinner, winnerBox, paint, turn) {
    const updatedWinnerBox = [...newWinner, ...winnerBox];
    const paintNextMove = paint({ middleIndex: newWinner[4], turn });
    return { updatedWinnerBox, paintNextMove };
  }
  