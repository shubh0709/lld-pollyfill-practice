export default class Player {
  name: string;
  position: [number, number];

  constructor(name: string) {
    this.name = name;
    this.position = [0, 0];
  }

  get Position() {
    return this.position;
  }

  set Position(posn: [number, number]) {
    this.position = posn;
  }
}
