import PieceType from "./pieceType";

export default class PlayingPiece{
    pieceType:PieceType; 

    constructor(pieceType:PieceType){
        this.pieceType = pieceType;
    }
}