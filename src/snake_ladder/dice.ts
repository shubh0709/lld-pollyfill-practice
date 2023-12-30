export default class Dice {
  diceCount: number;
  min: number = 1;
  max: number = 6;

  constructor(cnt: number) {
    this.diceCount = cnt;
  }

  getCurrentDiceNumber(): number {
    let cnt = 0;

    for (let i = 0; i < this.diceCount; i++) {
      // console.log("val: ", Math.floor(Math.random() * (this.max + 1)));
      cnt += Math.floor(Math.random() * (this.max + 1));
      // console.log({ cnt });
    }

    return cnt;
  }
}
