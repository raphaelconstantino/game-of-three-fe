import socket from '../config/socket';
import {calculareAction, computerAction} from '../util/gameUtil';

export const LISTEN_ACTIONS_API = Symbol('Listen Action API');
export const PERFORM_ACTION_API = Symbol('Perform Action');
export const PERFORM_ACTION_AGAINST_COMPUTER_API = Symbol('Perform Action Against Computer');
export const PERFORM_ACTION_COMPUTER_AGAINST_COMPUTER_API = Symbol('Perform Action Computer vs Computer');
export const CLEAR_ACTION_API = Symbol('Clear Action');

const listenAction = ({action, next, socket}) => {
  const { type } = action[LISTEN_ACTIONS_API];

  socket.on("listenPlayerAction", status => {
    next({type, status});
  });
};

const performAction = ({action, next, socket}) => {
    const { type, obj, currentUserId } = action[PERFORM_ACTION_API];
    socket.emit("performPlayerAction", calculareAction(obj, currentUserId) );
    return next({type});
}

const clearAction = ({action, next, socket}) => {
  const { type } = action[CLEAR_ACTION_API];
  socket.off('listenPlayerAction');
  return next({type});  
}

const performActionVsComputer = ({action, next}) => {
  const {types, obj, currentUserId } = action[PERFORM_ACTION_AGAINST_COMPUTER_API];
  const [playerMove, computerMove] = types;
  const userAction = calculareAction(obj, currentUserId);

  next({type : playerMove, status : userAction });

  // Computer Movement
  if (userAction.winner)
  {
    return;
  }

  return next({type : computerMove, status : calculareAction(computerAction(userAction), 2) });   
}

const performComputerVsComputerAction = ({action, next}) => {
  const { type } = action[PERFORM_ACTION_COMPUTER_AGAINST_COMPUTER_API];
  let player = 1;
  let obj = {
    value : 56
  }

  while (obj.value > 1)
  {
    obj = calculareAction(computerAction(obj), player);
    player = player === 1 ? 2 : 1;
    // Computer 1 Move
    next({type, status : obj });
  } 
}

// API Factory Function
const gameAPI = () => {
  return {
    [LISTEN_ACTIONS_API] : listenAction,
    [PERFORM_ACTION_API] : performAction,
    [CLEAR_ACTION_API] : clearAction,
    [PERFORM_ACTION_AGAINST_COMPUTER_API] : performActionVsComputer,
    [PERFORM_ACTION_COMPUTER_AGAINST_COMPUTER_API] : performComputerVsComputerAction
  }
}

// Middleware Executor
export default store => next => action => {
 
  const api = gameAPI();

  if (Object.getOwnPropertySymbols(action).length 
    && api[Object.getOwnPropertySymbols(action)[0]] !== undefined)
  {
    return api[Object.getOwnPropertySymbols(action)[0]]({action, next, socket});
  }

  return next(action);

}