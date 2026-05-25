import "./Duck.css"

const DUCK_MATRIX = [
  [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 3, 3, 3, 3, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 3, 3, 3, 3, 3, 3, 1, 0, 0, 0, 0, 0],
  [0, 0, 1, 3, 3, 1, 3, 3, 3, 1, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 3, 1, 3, 3, 3, 1, 0, 0, 0, 0, 0],
  [1, 2, 2, 2, 1, 3, 3, 3, 3, 1, 0, 0, 0, 1, 1],
  [0, 1, 1, 1, 3, 3, 3, 3, 1, 1, 1, 1, 1, 6, 1],
  [0, 0, 0, 1, 3, 3, 3, 3, 4, 4, 4, 5, 5, 7, 1],
  [0, 0, 1, 3, 3, 3, 3, 4, 4, 5, 5, 6, 7, 8, 1],
  [0, 0, 1, 4, 3, 3, 4, 1, 5, 5, 6, 1, 8, 9, 1],
  [0, 0, 1, 4, 3, 4, 4, 5, 1, 1, 1, 8, 9, 1, 0],
  [0, 0, 0, 1, 4, 4, 5, 5, 6, 6, 7, 9, 1, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 2, 1, 0, 1, 2, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 2, 2, 1, 1, 2, 2, 1, 0, 0, 0],
];

const COLOR_CLASSES = {
  0: "empty",
  1: "black",
  2: "orange",
  3: "yellow",
  4: "orange2",
  5: "red",
  6: "pink",
  7: "purple",
  8: "blue",
  9: "green",
};

export default function Duck({visible}) {

  const getDuckClass = (value) => {
    const colorName = COLOR_CLASSES[value];

    if (colorName !== "empty" && !visible[colorName]) {
      return `pixel ${colorName} grayscale`;
    }
    return `pixel ${colorName}`;
  };

  return (
    <div className="pixel-grid">
      {DUCK_MATRIX.map((row, rowIndex) =>
        row.map((pixelValue, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={getDuckClass(pixelValue)}
          />
        )),
      )}
    </div>
  );
}
