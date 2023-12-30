import PlayingPiece from "./playingPiece";

export default class Player {
  name: string;
  playingPiece: PlayingPiece;

  constructor(name: string, playingPiece: PlayingPiece) {
    this.name = name;
    this.playingPiece = playingPiece;
  }

  get Name() {
    return this.name;
  }

  set Name(name: string) {
    this.name = name;
  }

  get PlayingPiece() {
    return this.playingPiece;
  }

  set PlayingPiece(playingPiece: PlayingPiece) {
    this.playingPiece = playingPiece;
  }
}
