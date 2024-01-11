import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard(nrows, ncols, chanceLightStartsOn));


  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
  // TODO: create array-of-arrays of true/false values
  
    for (let i = 0; i < nrows; i++) {
      let row = [];
      for (let j = 0; j < ncols; j++) {
        row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }

    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every((row) => row.every((isLit) => !isLit));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      console.log('Old Board:', oldBoard);
      const [y, x] = coord.split('-').map(Number);
      const boardCopy = JSON.parse(JSON.stringify(oldBoard));

      const flipCell = (y, x, boardCopy) => {
      // Check if this coord is actually on board
        if (boardCopy[y] && boardCopy[y][x] !== undefined) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // Flip the clicked cell
      flipCell(y, x, boardCopy);

      // Flip cells around the clicked cell
      flipCell(y + 1, x, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y, x - 1, boardCopy);


      // TODO: Make a (deep) copy of the oldBoard

      // TODO: in the copy, flip this cell and the cells around it

      // TODO: return the copy
      console.log('New Board:', boardCopy);
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  if (hasWon()) {
    return <div className="YouWonMessage">You Won!</div>;
  }

  // TODO

  // make table board
  return (
    <table className="Board">
      <tbody>
        {board.map((row, y) => (
          <tr key={y}>
            {row.map((isLit, x) => (
              <Cell
                key={`${y}-${x}`}
                flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)}
                isLit={isLit}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  // TODO
}

export default Board;
