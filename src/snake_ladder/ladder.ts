import Jump from "./jump";

enum LadderSymbol {
  O = "O",
}

export default class Ladder {
  ladderSymbol: LadderSymbol;
  jump: Jump;

  constructor(jump: Jump) {
    this.jump = jump;
    this.ladderSymbol = LadderSymbol.O;
  }
}
