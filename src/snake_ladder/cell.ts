import Ladder from "./ladder";
import Player from "./player";
import Snake from "./snake";

export default class Cell {
  private snakeInstance: Snake = null;
  private ladderInstance: Ladder = null;
  private player: Player = null;

  constructor() {}

  get Snake() {
    return this.snakeInstance;
  }

  set Snake(snake: Snake) {
    this.snakeInstance = snake;
  }

  get Ladder() {
    return this.ladderInstance;
  }

  set Ladder(ladder: Ladder) {
    this.ladderInstance = ladder;
  }

  get Player() {
    return this.player;
  }

  set Player(player: Player) {
    this.player = player;
  }
}
