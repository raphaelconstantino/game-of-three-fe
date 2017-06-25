import React from 'react'
import PropTypes from 'prop-types';

const outputTable = ({status, currentPlayer, isComputerVsComputer}) => (
    <ul className="list-group">
        {
            status.map((s, i) => {
                let playerMove = s.player === currentPlayer;
                return (
                <li className={"row list-group-item " + (playerMove ? "text-primary" : "text-warning")} key={i}>
                    <div className="col-md-6">
                        {(playerMove && !isComputerVsComputer) ? "You played: " : ""}
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
)

outputTable.propTypes = {
  status: PropTypes.array.isRequired,
  currentPlayer: PropTypes.string.isRequired,
  isComputerVsComputer : PropTypes.bool.isRequired
}

export default outputTable;