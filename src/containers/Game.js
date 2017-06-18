import React, { Component } from 'react';
// Redux
import { connect } from 'react-redux';
import { 
  listenAction, performAction, performActionAgainstComputer, performActionComputerAgainstComputer, clearActions 
} from '../actions/gameActionCreator';
// Components
import InsertVal from '../components/insertVal';

class Game extends Component {

  componentDidMount () {
    const { init } = this.props;
    init();
  }

  componentWillUnmount () {
    const { clearActions } = this.props;
    clearActions();
  }

  actionsBtns (value, performAction, currentUserId) {
    return (
        <div>
          <button type="submit" 
            onClick={() => performAction({value, action : -1}, currentUserId )} className="btn btn-info">
              -1
          </button>
          <button type="submit" 
            onClick={() => performAction( {value, action : 0}, currentUserId )} className="btn btn-info">
              0
          </button>
          <button type="submit" 
            onClick={() => performAction( {value, action : 1}, currentUserId )} className="btn btn-info">
              +1
          </button>
        </div> 
    )
  }

  actionIpt (performAction, currentUserId) {
    return (
      <form>
        <InsertVal currentUserId={currentUserId} inputRef={el => this.inputElement = el} inputElement={() => this.inputElement} performAction={performAction} />
      </form>    
    )
  }

  actionsContent (value, performAction, isPlayerTurn, currentUserId) {
    if (!isPlayerTurn)
    {
      return (<div></div>);
    }

    if (value) {
      return (
        <div>
          <h4>Choose one of the following options.</h4>
          {this.actionsBtns(value, performAction, currentUserId)}
        </div>
      ) 
    }

    return (
      <div>
        <h4>Please type a random whole Number to start the game.</h4>
        {this.actionIpt(performAction, currentUserId)}
      </div>  
    )
  }

  winnerMessage (winner, currentUser) {
    
    if (!winner)
    {
      return false;
    }
    
    if(winner === currentUser)
    {
      return (<div className="alert alert-success">You Won The Game!</div>);
    }

    return (<div className="alert alert-danger">You Lose The Game!</div>);
  }
  
  render() {
    const { game, performAction } = this.props;
    return (
      <div className="App">

        {this.winnerMessage(game.currentStatus.winner, this.props.currentPlayer) ||
          <div className="container">

              {this.props.isPlayerTurn ? "" : 
                (<div className="alert alert-warning"><strong>Please wait for your turn!</strong></div>) }
              
              {this.actionsContent(game.currentStatus.value, performAction, this.props.isPlayerTurn, this.props.currentPlayer)}  
          </div>
        }

        <div className="container">
          <h2>Actions Output</h2>
            <p>Current Value: <strong>{game.currentStatus.value}</strong></p>
            <ul className="list-group">
              {
                game.status.map((s, i) => {
                  let playerMove = s.player === this.props.currentPlayer;
                  return (
                    <li className={"row list-group-item " + (playerMove ? "text-primary" : "text-warning")} key={i}>
                      <div className="col-md-6">
                        {playerMove ? "You played: " : ""}
                      </div>
                      <div className="col-md-6">
                        <p>Action: <strong>{s.action}</strong></p>
                        <p>Value : <strong>{s.value}</strong></p>
                      </div>  
                    </li>
                  )    
                })
              }
            </ul>
        </div>          

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