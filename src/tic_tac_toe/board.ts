import PlayingPiece from "./playingPiece";

export default class board {
  size: number;
  board: PlayingPiece[][];

  constructor(size: number) {
    this.size = size;
    this.board = new Array<Array<PlayingPiece>>(size);

    for (let i = 0; i < size; i++) {
      this.board[i] = new Array<PlayingPiece>(size);
    }
  }

  addPiece(row: number, col: number, val: PlayingPiece) {
    if (this.board[row][col] !== undefined) {
      return false;
    }

    this.board[row][col] = val;
    return true;
  }

  getFreeCells(): number[][] {
    let freeCells: number[][] = [];

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.board[i][j] === undefined) {
          freeCells.push([i, j]);
        }
      }
    }
    return freeCells;
  }

  printBoard() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.board[i][j] !== undefined) {
          process.stdout.write(this.board[i][j].pieceType + "   ");
        } else {
          process.stdout.write("    ");
        }
        process.stdout.write(" | ");
      }
      console.log();
    }
  }
}
