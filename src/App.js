import React, { Component } from 'react';
// Redux
import { connect } from 'react-redux';
import { choosePlayerVsPlayer, choosePlayerVsComputer, chooseComputerVsComputer } from './actions/playersActionCreator';
// Containers
import Game from './containers/Game';
// Components
import PlayerBtn from './components/playerBtn';
// CSS
import './App.css';

class App extends Component {

  showMsg (players) {
      if (!players.message)
      {
        return;
      }
      
      return (
        <div className="alert alert-danger"><strong>{players.message}</strong></div>
      )
    }

  render() {
    const { players, choosePlayerVsPlayer, choosePlayerVsComputer, chooseComputerVsComputer } = this.props;

    // Game Is ON!
    if (players.players.length === 2)
    {
      let playerTurn = players.players.filter(player => (player.playerTurn === players.currentPlayer));

      return (
          <div className="App">
              <Game 
                isComputerVsComputer={players.isComputerVsComputer} 
                isAgainstComputer={players.isAgainstComputer} 
                currentPlayer={players.currentPlayer} 
                isPlayerTurn={playerTurn.length} />
          </div>
      )  
    }
    
    // Current player has choosen and is awating for player 2
    if (players.players.length === 1 && (players.players[0].id === players.currentPlayer))
    {
      return (
        <div className="App">
          <div className="alert alert-info">
            <strong>Waiting for player 2</strong>
          </div>    
        </div>
      )
    }

    // Choose initial option
    return (
      <div className="App">
        
        {this.showMsg(players)}
        
        <div>
          <h1>Game of Three</h1>
          
          <p>Please, choose one option:</p>
          
          <div className="container"> 
              <PlayerBtn label="Player x Player" chooseAction={choosePlayerVsPlayer} />
              <PlayerBtn label="Player x Computer" chooseAction={choosePlayerVsComputer} />
              <PlayerBtn label="Computer x Computer" chooseAction={chooseComputerVsComputer} />
          </div>

        </div>  

      </div>
    );
  }  
}

const mapDispatchToProps = (dispatch) => {
  return {
    choosePlayerVsPlayer : () => dispatch(choosePlayerVsPlayer()),
    choosePlayerVsComputer : () => dispatch(choosePlayerVsComputer()),
    chooseComputerVsComputer : () => dispatch(chooseComputerVsComputer())
  }
}

const mapStateToProps = (state) => {

  const { players } = state;

  return {
    players
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)