import Board from "./board";
import Dice from "./dice";
import Player from "./player";

export default class Game {
  board: Board;
  players: Player[];
  dice: Dice;

  constructor() {}

  initializeGame() {}

  startGame() {
    let gameStatus = false;
    this.board.printBoard();
    this.printPlayersPosition();

    while (!gameStatus) {
      let playerTurn = this.players.shift();
      const diceNum = this.dice.getCurrentDiceNumber();
      this.movePlayer(playerTurn, diceNum);
      console.log("player moved: ", JSON.stringify(playerTurn));
      if (this.winningCondition(playerTurn)) {
        console.log(`Player ${playerTurn.name} won`);
        gameStatus = true;
      }

      this.players.push(playerTurn);
    }
  }

  defaultGame() {
    this.board = new Board(10, 5, 5);
    this.dice = new Dice(2);
    let playerCnt = 2;
    this.createPlayers(playerCnt);
    this.startGame();
  }

  createPlayers(cnt: number) {
    let i = 1,
      j = 1;
    this.players = [];
    while (i <= cnt) {
      this.players.push(new Player(`${i}`));
      i++;
    }

    // while (j <= cnt) {
    //   console.log(`created Player ${this.players[j]}`);
    //   j++;
    // }
  }

  winningCondition(player: Player) {
    const posn = player.position;
    const cnt = posn[0] * 10 + posn[1];
    if (cnt > 100) {
      return true;
    }

    return false;
  }

  movePlayer(playerTurn: Player, diceNum: number) {
    const currentPosn = playerTurn.position;
    // console.log({ currentPosn });
    const currentPosnCnt = currentPosn[0] * 10 + currentPosn[1];
    const newCnt = currentPosnCnt + diceNum;
    const newPosn: [number, number] = [Math.ceil(newCnt / 10), newCnt % 10];
    playerTurn.position = newPosn;
    // console.log({ newPosn });
  }

  printPlayersPosition() {
    for (let i = 0; i < this.players.length; i++) {
      console.log(
        "name: ",
        this.players[i].name,
        "  position: ",
        this.players[i].position
      );
    }
  }
}
