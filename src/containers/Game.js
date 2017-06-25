import React, { Component } from 'react';
// Redux
import { connect } from 'react-redux';
import { 
  listenAction, performAction, performActionAgainstComputer, performActionComputerAgainstComputer, clearActions 
} from '../actions/gameActionCreator';
// Components
import Output from '../components/output';
import OutputTable from '../components/outputTable';
import Actions from '../components/actions';

class Game extends Component {

  componentDidMount () {
    const { init } = this.props;
    init();
  }

  componentWillUnmount () {
    const { clearActions } = this.props;
    clearActions();
  }

  winnerMessage (currentStatus, currentUser, isComputerVsComputer, status) {
    
    if (!currentStatus.winner)
    {
      return false;
    }

    if (isComputerVsComputer)
    {
      return (<div className="alert alert-success">{"Player " + currentStatus.player + " Won!"}</div>);
    }
    
    if(currentStatus.winner === currentUser)
    {
      return (<div className="alert alert-success">You Won The Game!</div>);
    }

    return (<div className="alert alert-danger">You Lose The Game!</div>);
  }
  
  render() {
    const { game, performAction, currentPlayer, isPlayerTurn, isComputerVsComputer } = this.props;
    const { status, currentStatus } = game;
    return (
      <div className="App">

        {this.winnerMessage(currentStatus, currentPlayer, isComputerVsComputer) ||
          <div className="container">

              {isPlayerTurn ? "" : 
                (<div className="alert alert-warning"><strong>Please wait for your turn!</strong></div>) }
              
              <Actions 
                value={currentStatus.value} 
                performAction={performAction} 
                isPlayerTurn={isPlayerTurn} 
                currentUserId={currentPlayer} />

          </div>
        }

        <Output currentStatus={currentStatus.value}>
          <OutputTable status={status} currentPlayer={currentPlayer} isComputerVsComputer={isComputerVsComputer}/>
        </Output>           

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {

  let { isAgainstComputer, isComputerVsComputer } = ownProps;
  
  return {
    init : () => {
      if (!isAgainstComputer && !isComputerVsComputer)
      {
        return dispatch(listenAction());
      }
      if (isComputerVsComputer)
      {
        return dispatch(performActionComputerAgainstComputer());
      }
    },
    performAction : (val, currentUserId) => {
      
      if (isAgainstComputer)
      {
        return dispatch(performActionAgainstComputer(val, currentUserId));
      }
      
      return dispatch(performAction(val, currentUserId));
    },
    clearActions : () => dispatch(clearActions())
  }
}

const mapStateToProps = (state, ownProps) => {

  const { game } = state;

  return {
    game
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)