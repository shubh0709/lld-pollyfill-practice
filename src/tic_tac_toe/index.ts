import Player from "./player";
import Board from "./board";
import PlayingPieceO from "./playingPieceO";
import PlayingPieceX from "./playingPieceX";
import PieceType from "./pieceType";
import readline from "readline";

// Create interface for reading input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export default class TicTacToeGame {
  players: Player[];
  gameBoard: Board | null;

  constructor() {
    this.players = [];
    this.gameBoard = null;
  }

  initializeGame() {
    // creating two players
    let crossPiece = new PlayingPieceX();
    let noughtPiece = new PlayingPieceO();

    let player1 = new Player("player1", crossPiece);
    let player2 = new Player("player2", noughtPiece);

    this.players.push(player1);
    this.players.push(player2);

    this.gameBoard = new Board(3);
  }

  // Function to get user input
  getPlayerInput(
    playerTurn: Player
  ): Promise<{ inputRow: number; inputColumn: number }> {
    return new Promise((resolve) => {
      rl.question(`Player: ${playerTurn.name} Enter row,column: `, (input) => {
        const values = input.split(",");
        const inputRow = parseInt(values[0], 10);
        const inputColumn = parseInt(values[1], 10);
        console.log("resolving");
        resolve({ inputRow, inputColumn });
      });
    });
  }

  async startGame() {
    if (this.gameBoard !== null) {
      let noWinner = true;

      while (noWinner) {
        let playerTurn = this.players.shift()!;
        console.log({ playerTurn });
        this.gameBoard.printBoard();

        //get the free space from the board
        let freeSpaces = this.gameBoard.getFreeCells();
        if (freeSpaces.length == 0) {
          console.log("free spaces");
          noWinner = false;
          continue;
        }

        // console.log("came here");

        // Example usage
        const { inputRow, inputColumn } = await this.getPlayerInput(playerTurn);
        console.log("Input Row:", inputRow);
        console.log("Input Column:", inputColumn);

        // place the piece
        let pieceAddedSuccessfully = this.gameBoard.addPiece(
          inputRow,
          inputColumn,
          playerTurn.playingPiece
        );
        if (!pieceAddedSuccessfully) {
          //player can not insert the piece into this cell, player has to choose another cell
          console.log("Incorredt possition chosen, try again");
          this.players.unshift(playerTurn);
          continue;
        }
        this.players.push(playerTurn);

        let winner = this.isThereWinner(
          inputRow,
          inputColumn,
          playerTurn.playingPiece.pieceType
        );
        if (winner) {
          return playerTurn.name;
        }
      }

      return "tie";
    }
  }

  isThereWinner(row: number, column: number, pieceType: PieceType): boolean {
    let rowMatch = true;
    let columnMatch = true;
    let diagonalMatch = true;
    let antiDiagonalMatch = true;

    if (this.gameBoard !== null) {
      // Check in row
      for (let i = 0; i < this.gameBoard.size; i++) {
        if (
          this.gameBoard.board[row][i] === undefined ||
          this.gameBoard.board[row][i].pieceType !== pieceType
        ) {
          rowMatch = false;
        }
      }

      // Check in column
      for (let i = 0; i < this.gameBoard.size; i++) {
        if (
          this.gameBoard.board[i][column] === undefined ||
          this.gameBoard.board[i][column].pieceType !== pieceType
        ) {
          columnMatch = false;
        }
      }

      // Check diagonals
      for (let i = 0, j = 0; i < this.gameBoard.size; i++, j++) {
        if (
          this.gameBoard.board[i][j] === undefined ||
          this.gameBoard.board[i][j].pieceType !== pieceType
        ) {
          diagonalMatch = false;
        }
      }

      // Check anti-diagonals
      for (
        let i = 0, j = this.gameBoard.size - 1;
        i < this.gameBoard.size;
        i++, j--
      ) {
        if (
          this.gameBoard.board[i][j] === undefined ||
          this.gameBoard.board[i][j].pieceType !== pieceType
        ) {
          antiDiagonalMatch = false;
        }
      }
    } else {
      return false;
    }

    return rowMatch || columnMatch || diagonalMatch || antiDiagonalMatch;
  }
}
