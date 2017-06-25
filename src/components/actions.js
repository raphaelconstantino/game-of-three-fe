import React from 'react'
import PropTypes from 'prop-types';
import InsertVal from './insertVal';
import ActionOptionBtn from './actionOptionBtn';

const actionsBtns = ({value, performAction, currentUserId}) => {
    return (
        <div>
            <ActionOptionBtn performAction={performAction} value={value} action={-1} currentUserId={currentUserId} label={"-1"}/>
            <ActionOptionBtn performAction={performAction} value={value} action={0} currentUserId={currentUserId} label={"0"}/>
            <ActionOptionBtn performAction={performAction} value={value} action={1} currentUserId={currentUserId} label={"+1"}/>
        </div> 
    )
}

const actionIpt = ({performAction, currentUserId}) => {
    return (
        <form>
            <InsertVal currentUserId={currentUserId} inputRef={el => this.inputElement = el} inputElement={() => this.inputElement} performAction={performAction} />
        </form>    
    )
}

const actions = ({value, performAction, isPlayerTurn, currentUserId}) => {
    if (!isPlayerTurn)
    {
        return (<div></div>);
    }

    if (value) {
        return (
            <div>
                <h4>Choose one of the following options.</h4>
                {actionsBtns( {value, performAction, currentUserId} )}
            </div>
        ) 
    }

    return (
        <div>
            <h4>Please type a random whole Number to start the game.</h4>
            {actionIpt( {performAction, currentUserId} )}
        </div>  
    )
}

actions.propTypes = {
  value: PropTypes.number
}

export default actions;