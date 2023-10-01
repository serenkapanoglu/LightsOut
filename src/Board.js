import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

function Board({nrows = 5, ncols = 5, chanceLightStartsOn = 0.25}) {
    const [board, setBoard] = useState(createBoard);

  function createBoard() {
   return Array.from({length:nrows}).map( // why did we use Array.from?  and what does map function for?
    row=> Array.from({length:ncols}).map(
        cell=>Math.random() < chanceLightStartsOn // why math.random smaller than chanceLightStartsOn?
    )
   );
    }

  
 


  function hasWon() {
  return board.every(row => row.every(cell => !cell)); 
   
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number); // where did the 'number' come from? and why did we split it


      const flipCell = (y, x, boardCopy) => {  // why do we need boardcopy
     

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x]; //what is that
        }
      };

     const boardCopy = oldBoard.map(row => [...row]); // I don't understand the [...something] concept

      flipCell(y,x, boardCopy); // Above // what is this logic?
      flipCell(y + 1 ,x, boardCopy) // Below
      flipCell(y, x - 1,boardCopy) // Left
      flipCell(y, x + 1, boardCopy) // Right



      return boardCopy;
    
    });
  }
if(hasWon()) {
    return <div>You Win!</div>;
}


let tblBoard = [];

for(let y=0; y<nrows; y++){ // I also didn't understand why did they make a for loop 
    let row=[];
    for(let x=0; x<ncols; x++) {
        let coord = `${y}-${x}`;
        row.push(
            <Cell
            key={coord}
            isLit={board[y][x]}
            flipCellsAroundMe={evt=> flipCellsAround(coord)}
            />,
        );
    }
    tblBoard.push(<tr key={y}>{row}</tr>);
}

return (
    <table className="Board">
        <tbody>{tblBoard}</tbody>
    </table>
);


}

export default Board;
