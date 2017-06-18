import { CHOOSE_PLAYER_VS_PLAYER_API, CHOOSE_PLAYER_VS_COMPUTER_API, CHOOSE_COMPUTER_VS_COMPUTER_API  } from '../middleware/playersApi';

export const CHOOSE_PLAYER_VS_PLAYER = 'CHOOSE_PLAYER_VS_PLAYER';
export const CHOOSE_PLAYER_VS_COMPUTER = 'CHOOSE_PLAYER_VS_COMPUTER';
export const CHOOSE_COMPUTER_VS_COMPUTER = 'CHOOSE_COMPUTER_VS_COMPUTER';

export const choosePlayerVsPlayer = () => {
    return {
        [CHOOSE_PLAYER_VS_PLAYER_API] : {
            type: CHOOSE_PLAYER_VS_PLAYER
        }
    }
};

export const choosePlayerVsComputer = () => {
    return {
        [CHOOSE_PLAYER_VS_COMPUTER_API] : {
            type: CHOOSE_PLAYER_VS_COMPUTER
        }
    }    
}

export const chooseComputerVsComputer = () => {
    return {
        [CHOOSE_COMPUTER_VS_COMPUTER_API] : {
            type: CHOOSE_COMPUTER_VS_COMPUTER
        }
    }    
}
