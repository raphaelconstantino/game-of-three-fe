import socket from '../config/socket';
import {calculareAction, computerAction} from '../util/gameUtil';

export const LISTEN_ACTIONS_API = Symbol('Listen Action API');
export const PERFORM_ACTION_API = Symbol('Perform Action');
export const PERFORM_ACTION_AGAINST_COMPUTER_API = Symbol('Perform Action Against Computer');
export const PERFORM_ACTION_COMPUTER_AGAINST_COMPUTER_API = Symbol('Perform Action Computer vs Computer');
export const CLEAR_ACTION_API = Symbol('Clear Action');

export default store => next => action => {

  const listenActionAPI = action[LISTEN_ACTIONS_API];
  const performActionAPI = action[PERFORM_ACTION_API];
  const performActionAgainstComputerAPI = action[PERFORM_ACTION_AGAINST_COMPUTER_API];  
  const performActionComputerVsComputerAPI = action[PERFORM_ACTION_COMPUTER_AGAINST_COMPUTER_API];
  const clearActionAPI = action[CLEAR_ACTION_API];

  // So the middleware doesn't get applied to every single action
  if (typeof listenActionAPI === 'undefined' && typeof performActionAPI === 'undefined' 
        && typeof performActionAgainstComputerAPI ==='undefined' && typeof clearActionAPI === "undefined"
        && typeof performActionComputerVsComputerAPI === 'undefined') 
  {
    return next(action);
  }

  if (typeof clearActionAPI !== "undefined")
  {
    const { type } = clearActionAPI;
    socket.off('listenPlayerAction');
    return next({type});
  }

  if (typeof listenActionAPI !== 'undefined')
  {
      const { type } = listenActionAPI;

      socket.on("listenPlayerAction", status => {
        next({type, status});
      });
  }

  if (typeof performActionComputerVsComputerAPI !== 'undefined')
  {
    const { type } = performActionComputerVsComputerAPI;
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

  if (typeof performActionAgainstComputerAPI !== 'undefined')
  {
    const {types, obj, currentUserId } = performActionAgainstComputerAPI;
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

  if (typeof performActionAPI !== 'undefined')
  {
    const { type, obj, currentUserId } = performActionAPI;
    socket.emit("performPlayerAction", calculareAction(obj, currentUserId) );
    return next({type});
  }

}