import TicTacToeGame from "./tic_tac_toe";
import SnakeLadder from "./snake_ladder";
import "./promise";
import express from "express";

async function ticTacToe() {
  let game = new TicTacToeGame();
  game.initializeGame();
  console.log("game winner is: " + (await game.startGame()));
}

async function snake_ladder() {
  let game = new SnakeLadder();
  game.defaultGame();
}

function main() {
  snake_ladder();
}

main();
