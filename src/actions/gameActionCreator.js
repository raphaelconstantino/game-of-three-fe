import { 
    LISTEN_ACTIONS_API, PERFORM_ACTION_API, PERFORM_ACTION_AGAINST_COMPUTER_API, PERFORM_ACTION_COMPUTER_AGAINST_COMPUTER_API, CLEAR_ACTION_API 
} from '../middleware/gameApi';

export const LISTEN_ACTIONS = 'LISTEN_ACTIONS';
export const PERFORM_ACTION = 'PERFORM_ACTION';
export const CLEAR_ACTION = 'CLEAR_ACTION';
export const PERFORM_ACTION_AGAINST_COMPUTER = 'PERFORM_ACTION_AGAINST_COMPUTER';
export const PERFORM_COMPUTER_ACTION = 'PERFORM_COMPUTER_ACTION';

export const listenAction = () => {
    return {
        [LISTEN_ACTIONS_API] : {
            type : LISTEN_ACTIONS
        }
    }
}

export const performActionAgainstComputer = (obj, currentUserId) => {
    return {
        [PERFORM_ACTION_AGAINST_COMPUTER_API] : {
            types : [PERFORM_ACTION_AGAINST_COMPUTER, PERFORM_ACTION_AGAINST_COMPUTER],
            obj,
            currentUserId
        }
    }
} 

export const performActionComputerAgainstComputer = (currentUserId) => {
    return {
        [PERFORM_ACTION_COMPUTER_AGAINST_COMPUTER_API] : {
            type : PERFORM_COMPUTER_ACTION,
            currentUserId
        }
    }
}

export const performAction = (obj, currentUserId) => {
    return {
        [PERFORM_ACTION_API] : {
            type : PERFORM_ACTION,
            obj,
            currentUserId
        }
    }
} 

export const clearActions = () => {
    return {
        [CLEAR_ACTION_API] : {
            type : CLEAR_ACTION,
        }
    }
}