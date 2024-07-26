export const TURNS = {
  X: "X",
  O: "O",
};

export const WINNERS_MOVE = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const valueGroups = {
  0: [0, 1, 2, 9, 10, 11, 18, 19, 20],
  1: [3, 4, 5, 12, 13, 14, 21, 22, 23],
  2: [6, 7, 8, 15, 16, 17, 24, 25, 26],
  3: [27, 28, 29, 36, 37, 38, 45, 46, 47],
  4: [30, 31, 32, 39, 40, 41, 48, 49, 50],
  5: [33, 34, 35, 42, 43, 44, 51, 52, 53],
  6: [54, 55, 56, 63, 64, 65, 72, 73, 74],
  7: [57, 58, 59, 66, 67, 68, 75, 76, 77],
  8: [60, 61, 62, 69, 70, 71, 78, 79, 80],
};

function position() {
  const arrayPosition = Array(81).fill(null);
  let count = 0;
  let value = 0;
  arrayPosition.forEach((_, i) => {
    if (count === 3) {
      if ((i >= 0 && i < 9) || (i > 26 && i < 36) || (i > 53 && i < 63)) {
        value = 0;
      }
      if ((i > 8 && i < 18) || (i > 35 && i < 45) || (i > 62 && i < 72)) {
        value = 3;
      }
      if ((i > 17 && i < 27) || (i > 44 && i < 54) || (i > 71 && i < 81)) {
        value = 6;
      }
      count = 0;
    }

    arrayPosition[i] = value;
    value++;
    count++;
  });

  return arrayPosition;
}

export const arrayPos = position();
