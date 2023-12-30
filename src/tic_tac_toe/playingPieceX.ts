import PlayingPiece from "./playingPiece"
import pieceType from "./pieceType"

export default class PlayingPieceX extends PlayingPiece{
    constructor(){
        super(pieceType.X);
    }
}