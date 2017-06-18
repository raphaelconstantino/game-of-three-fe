import {
  CHOOSE_PLAYER_VS_PLAYER,
  CHOOSE_PLAYER_VS_COMPUTER,
  CHOOSE_COMPUTER_VS_COMPUTER
} from '../actions/playersActionCreator'

const initState = {
  players : [],
  currentPlayer : '',
  message : '',
  isAgainstComputer : false,
  isComputerVsComputer : false
}

export default function list(state = initState, action) {
  
  switch (action.type) {
    case CHOOSE_PLAYER_VS_PLAYER:
        return Object.assign({}, state, {players : action.players, currentPlayer : action.currentPlayer, message : action.message});
    case CHOOSE_PLAYER_VS_COMPUTER:
      return Object.assign({}, state, {players : action.players, currentPlayer : action.currentPlayer, isAgainstComputer : action.isAgainstComputer} );
    case CHOOSE_COMPUTER_VS_COMPUTER:
      return Object.assign({}, state, {players : action.players, currentPlayer : action.currentPlayer, isComputerVsComputer : action.isComputerVsComputer} );
    default:
      return state;
    }
}