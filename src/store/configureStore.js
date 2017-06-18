import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
// Players
import playersApi from '../middleware/playersApi';
import players from '../reducers/players';
// Game
import gameApi from '../middleware/gameApi';
import game from '../reducers/game';

const configureStore = () => {

    // Combine APP reducers
    const appReducers = combineReducers({
        players,
        game
    })

    let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, playersApi, gameApi)(createStore);
    return createStoreWithMiddleware(appReducers);

}

export default configureStore;