import socket from '../config/socket';

export const CHOOSE_PLAYER_VS_PLAYER_API = Symbol('Choose Player vs Player API');
export const CHOOSE_PLAYER_VS_COMPUTER_API = Symbol('Choose Player vs Computer API');
export const CHOOSE_COMPUTER_VS_COMPUTER_API = Symbol('Choose Computer vs Computer API');

const playerVsPlayer = ({action, next, socket}) => {
  const { type } = action[CHOOSE_PLAYER_VS_PLAYER_API];
  const currentUserId = socket.io.engine.id;
  
  socket.emit("choosePlayerVsPlayer");

  socket.on("fetchPlayers", (response) => {
    next({type, players : response.players, message : response.message, currentPlayer : currentUserId});
  });
}

const playerVsComputer = ({action, next}) => {
  const { type } = action[CHOOSE_PLAYER_VS_COMPUTER_API];
  let players = [{id : "1", playerTurn : "1"}, {id : "2", playerTurn : "1"}];
  let currentPlayer = "1";

  next({type, players, currentPlayer, isAgainstComputer : true});
}

const computerVsComputer = ({action, next}) => {
  const { type } = action[CHOOSE_COMPUTER_VS_COMPUTER_API];
  let players = [{id : "1", playerTurn : "1"}, {id : "2", playerTurn : "1"}];
  let currentPlayer = "1";

  next({type, players, currentPlayer, isComputerVsComputer : true});
}

// API factory function
const playerAPI = () => {

  return {
    [CHOOSE_PLAYER_VS_PLAYER_API] : playerVsPlayer,
    [CHOOSE_PLAYER_VS_COMPUTER_API] : playerVsComputer,
    [CHOOSE_COMPUTER_VS_COMPUTER_API] : computerVsComputer
  }

}

// Middleware Executor
export default store => next => action => {

  const api = playerAPI();

  if (Object.getOwnPropertySymbols(action).length 
    && api[Object.getOwnPropertySymbols(action)[0]] !== undefined)
  {
    return api[Object.getOwnPropertySymbols(action)[0]]({action, next, socket});
  }

  return next(action);

}