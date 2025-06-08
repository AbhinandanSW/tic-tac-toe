import React from "react";
import useTic from "../hooks/useTic";

const BoardGame = (): React.JSX.Element => {
  const {
    board,
    boardSize,
    changeBoardSize,
    onCellClick,
    renderTitle,
    resetGame,
  } = useTic();

  const handleChangeBoard = (e) => {
    const value = e.target.value;
    if (typeof value == "string") {
      const convertedValue = Number(value);
      changeBoardSize(convertedValue);
    } else {
      changeBoardSize(value);
    }
  };

  return (
    <div className="board_game">
      <div className="header">
        <div className="header_board_size">
          <p>You can change board size here</p>
          <select
            onChange={handleChangeBoard}
            defaultValue={boardSize}
            className="select_board_size"
          >
            <option value={3}>3 X 3</option>
            <option value={4}>4 X 4</option>
            <option value={5}>5 X 5</option>
          </select>
        </div>
      </div>
      <div className="board">
        <div className="title_board_row">
          <p>{renderTitle()}</p>
          <button onClick={resetGame}>Restart Game</button>
        </div>
        {board.map((row: string[], rowIndex: number) => {
          return (
            <div key={`row_${rowIndex}`} className="board_row">
              {row.map((cell: string, cellIndex: number) => {
                return (
                  <button
                    key={`${rowIndex}_${cellIndex}`}
                    className="cell_btn"
                    disabled={cell !== ""}
                    onClick={() => onCellClick(rowIndex, cellIndex)}
                  >
                    {cell}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BoardGame;
