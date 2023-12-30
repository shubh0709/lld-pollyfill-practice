import Jump from "./jump";

enum SnakeSymbol {
  X = "X",
}

export default class Snake {
  snakeSymbol: SnakeSymbol;
  jump: Jump;

  constructor(jump: Jump) {
    this.jump = jump;
    this.snakeSymbol = SnakeSymbol.X;
  }
}
