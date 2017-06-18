import socket from '../config/socket';

export const CHOOSE_PLAYER_VS_PLAYER_API = Symbol('Choose Player vs Player API');
export const CHOOSE_PLAYER_VS_COMPUTER_API = Symbol('Choose Player vs Computer API');
export const CHOOSE_COMPUTER_VS_COMPUTER_API = Symbol('Choose Computer vs Computer API');

export default store => next => action => {

  const choosePlayerVsPlayerAPI = action[CHOOSE_PLAYER_VS_PLAYER_API];
  const choosePlayerVsComputerAPI = action[CHOOSE_PLAYER_VS_COMPUTER_API];
  const chooseComputerVsComputerAPI = action[CHOOSE_COMPUTER_VS_COMPUTER_API];
  const currentUserId = socket.io.engine.id;

  // So the middleware doesn't get applied to every single action
  if (typeof choosePlayerVsPlayerAPI === 'undefined' && typeof choosePlayerVsComputerAPI === 'undefined'
        && typeof chooseComputerVsComputerAPI === 'undefined') 
  {
    return next(action);
  }

  if (typeof choosePlayerVsComputerAPI !== 'undefined')
  {
    const { type } = choosePlayerVsComputerAPI;
    let players = [{id : 1, playerTurn : 1}, {id : 2, playerTurn : 1}];
    let currentPlayer = 1;

    next({type, players, currentPlayer, isAgainstComputer : true});
  }

  if (typeof chooseComputerVsComputerAPI !== 'undefined')
  {
    const { type } = chooseComputerVsComputerAPI;
    let players = [{id : 1, playerTurn : 1}, {id : 2, playerTurn : 1}];
    let currentPlayer = 1;

    next({type, players, currentPlayer, isComputerVsComputer : true});    
  }

  if (typeof choosePlayerVsPlayerAPI !== 'undefined')
  {
      const { type } = choosePlayerVsPlayerAPI;
      
      socket.emit("choosePlayerVsPlayer");

      socket.on("fetchPlayers", (response) => {
        next({type, players : response.players, message : response.message, currentPlayer : currentUserId});
      });
  }

}