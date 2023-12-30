import Cell from "./cell";
import Jump from "./jump";
import Ladder from "./ladder";
import Snake from "./snake";

export default class Board {
  size: number;
  snakesCnt: number;
  laddersCnt: number;
  board: Cell[][];

  constructor(size: number, snakesCnt: number, laddersCnt: number) {
    this.size = size;
    this.snakesCnt = snakesCnt;
    this.laddersCnt = laddersCnt;

    // Initialize the board array
    this.board = [];

    for (let i = 0; i < this.size; i++) {
      this.board[i] = []; // Initialize inner arrays
      for (let j = 0; j < this.size; j++) {
        this.board[i][j] = new Cell();
      }
    }

    this.distributeRandomly(true);
    this.distributeRandomly(false);
  }

  printBoard() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.board[i][j].Snake) {
          process.stdout.write(this.board[i][j].Snake.snakeSymbol + "   ");
        } else if (this.board[i][j].Ladder) {
          process.stdout.write(this.board[i][j].Ladder.ladderSymbol + "   ");
          //   }else if (this.board[i][j].Player !== undefined) {
          //     process.stdout.write(this.board[i][j].Player + "   ");
        } else {
          // process.stdout.write(JSON.stringify(this.board[i][j].Snake));
          process.stdout.write("    ");
        }
        process.stdout.write(" | ");
      }
      console.log();
    }
  }

  distributeRandomly(isSnakes: boolean) {
    let cnt = isSnakes ? this.snakesCnt : this.laddersCnt;

    while (cnt--) {
      let condn1 = false;
      let condn2 = false;
      let row1 = -1;
      let col1 = -1;
      let row2 = -1;
      let col2 = -1;
      do {
        row1 = Math.floor(Math.random() * this.size);
        col1 = Math.floor(Math.random() * this.size);

        row2 = Math.floor(Math.random() * this.size);
        col2 = Math.floor(Math.random() * this.size);

        if (isSnakes) {
        }

        //snake shouldnt already exist at that spot
        condn1 = isSnakes
          ? this.board[row1][col1].Snake != null
          : this.board[row1][col1].Ladder != null;
        // id its a snake [row1][col1] > [row2][col2] and if its ladder then [row1][col1] < [row2][col2]
        condn2 = isSnakes
          ? row1 > row2 ||
            (row1 === row2 && row1 % 2 ? col1 > col2 : col1 < col2)
          : row1 < row2 ||
            (row1 === row2 && row1 % 2 ? col1 < col2 : col1 > col2);
      } while (condn1 && condn2);

      const jump = new Jump([row1, col1], [row2, col2]);
      if (isSnakes) {
        this.board[row1][col1].Snake = new Snake(jump);
        // console.log("creating snake ", this.board[row1][col1]);
      } else {
        this.board[row1][col1].Ladder = new Ladder(jump);
      }
    }
  }
}
