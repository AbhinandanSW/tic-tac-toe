import { useEffect, useState } from "react";

type Board = string[][];

export const defaultBoard: Board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const useTic = () => {
  const [boardSize, setBoardSize] = useState<number>(3);
  const [xTurn, setXTurn] = useState<boolean>(false);
  const [board, setBoard] = useState<Board>(defaultBoard);

  const initializeGame = () => {
    let create_new_board = Array(boardSize).fill(Array(boardSize).fill(""));
    setBoard(create_new_board);
  };

  const changeBoardSize = (size: number) => {
    setBoardSize(size);
  };

  const checkBoardComplete = () => {
    return board?.every((item: string[]) =>
      item?.every((child: string) => child !== "")
    );
  };

  const checkWinner = () => {
    // check horizontal
    for (let i = 0; i < boardSize; i++) {
      let count = 0;
      let prev = "";
      for (let j = 0; j < boardSize; j++) {
        if (board?.[i]?.[j] !== "" && prev === "") {
          prev = board?.[i]?.[j];
        }
        if (prev !== "" && board?.[i]?.[j] === prev) {
          count += 1;
        }
      }

      if (count === boardSize) {
        return { winner: true, player: prev };
      }
    }

    // check vertical
    for (let i = 0; i < boardSize; i++) {
      let count = 0;
      let prev = "";
      for (let j = 0; j < boardSize; j++) {
        if (board?.[j]?.[i] !== "" && prev === "") {
          prev = board?.[j]?.[i];
        }
        if (prev !== "" && board?.[j]?.[i] === prev) {
          count += 1;
        }
      }

      if (count === boardSize) {
        return { winner: true, player: prev };
      }
    }

    // check diagnal
    let diagnol_count = 0;
    let diagnol_prev = "";
    for (let i = 0; i < boardSize; i++) {
      if (board?.[i]?.[i] !== "" && diagnol_prev === "") {
        diagnol_prev = board?.[i]?.[i];
      }
      if (diagnol_prev !== "" && board?.[i]?.[i] === diagnol_prev) {
        diagnol_count += 1;
      }
    }
    if (diagnol_count === boardSize) {
      return { winner: true, player: diagnol_prev };
    }

    // check anti-diagnal
    let anti_diagnol_count = 0;
    let anti_diagnol_prev = "";
    for (let i = 0; i < boardSize; i++) {
      if (board?.[i]?.[boardSize - 1 - i] !== "" && anti_diagnol_prev === "") {
        anti_diagnol_prev = board?.[i]?.[boardSize - 1 - i];
      }
      if (
        anti_diagnol_prev !== "" &&
        board?.[i]?.[boardSize - 1 - i] === anti_diagnol_prev
      ) {
        anti_diagnol_count += 1;
      }
    }
    if (anti_diagnol_count === boardSize) {
      return { winner: true, player: anti_diagnol_prev };
    }

    return { winner: false, player: xTurn ? "X" : "O" };
  };

  const renderTitle = () => {
    const check_winner_present = checkWinner();
    const check_board_filled = checkBoardComplete();

    if (check_winner_present?.winner) {
      return `Player ${check_winner_present?.player} is winner`;
    } else if (check_board_filled) {
      return "Match Draw. Please restart game";
    } else {
      return `Player ${check_winner_present?.player} Turn`;
    }
  };

  const onCellClick = (rowIndex: number, cellIndex: number) => {
    const check_winner_present = checkWinner();
    if (check_winner_present?.winner) {
      return;
    }

    let new_board = board.map((row, rIndex) => {
      if (rIndex === rowIndex) {
        const updated_row = row.map((cell, cIndex) => {
          if (cIndex === cellIndex) {
            return xTurn ? "X" : "O";
          } else {
            return cell;
          }
        });
        return updated_row;
      } else return row;
    });

    setBoard(new_board);
    setXTurn((prev: boolean) => !prev);
  };

  const resetGame = () => {
    initializeGame();
    setXTurn(false);
  };

  useEffect(() => {
    initializeGame();
  }, [boardSize]);

  return {
    board,
    boardSize,
    changeBoardSize,
    onCellClick,
    renderTitle,
    resetGame,
  };
};

export default useTic;
