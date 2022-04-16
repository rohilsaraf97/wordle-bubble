const keys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "ENTER",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "<<",
];

const alphabets = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const alphabetDict = {};

alphabets.forEach((alphabet) => {
  alphabetDict[alphabet] = "";
});

const initialGuessRows = [
  [
    { letter: " ", classList: "" },
    { letter: " ", classList: "" },
    { letter: " ", classList: "" },
    { letter: " ", classList: "" },
    { letter: " ", classList: "" },
  ],
  [
    { letter: " ", classList: "" },
    { letter: " ", classList: "" },
    { letter: " ", classList: "" },
    { letter: " ", classList: "" },
    { letter: " ", classList: "" },
  ],
  [
    { letter: " ", classList: "" },
    { letter: " ", classList: "" },
    { letter: " ", classList: "" },
    { letter: " ", classList: "" },
    { letter: " ", classList: "" },
  ],
  [
    { letter: " ", classList: "" },
    { letter: " ", classList: "" },
    { letter: " ", classList: "" },
    { letter: " ", classList: "" },
    { letter: " ", classList: "" },
  ],
  [
    { letter: " ", classList: "" },
    { letter: " ", classList: "" },
    { letter: " ", classList: "" },
    { letter: " ", classList: "" },
    { letter: " ", classList: "" },
  ],
  [
    { letter: " ", classList: "" },
    { letter: " ", classList: "" },
    { letter: " ", classList: "" },
    { letter: " ", classList: "" },
    { letter: " ", classList: "" },
  ],
];
export { keys, alphabetDict, initialGuessRows };