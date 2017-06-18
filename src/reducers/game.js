import {
  LISTEN_ACTIONS,
  PERFORM_ACTION,
  CLEAR_ACTION,
  PERFORM_ACTION_AGAINST_COMPUTER,
  PERFORM_COMPUTER_ACTION
} from '../actions/gameActionCreator'

const initState = {
  status : [],
  currentStatus : {}
}

export default function list(state = initState, action) {
  
  switch (action.type) {
    case LISTEN_ACTIONS:
      return Object.assign({}, state, {currentStatus : action.status, status : [action.status, ...state.status]});
    case PERFORM_ACTION:
      return Object.assign({}, state);
    case PERFORM_ACTION_AGAINST_COMPUTER:
      return Object.assign({}, state, {currentStatus : action.status, status : [action.status, ...state.status]});                
    case PERFORM_COMPUTER_ACTION:
      return Object.assign({}, state, {currentStatus : action.status, status : [action.status, ...state.status]});                          
    case CLEAR_ACTION:
      return Object.assign({}, state, {currentStatus : {}, status : []});
    default:
      return state
    }
}