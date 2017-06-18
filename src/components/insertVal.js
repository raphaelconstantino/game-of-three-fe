import React from 'react'
import PropTypes from 'prop-types';

const insertVal = ({performAction, inputRef, inputElement, currentUserId}) => (
  <div className="form-inline">
      <input type="text" className="form-control" ref={inputRef} />
      <button className="btn btn-info" type="submit" onClick={e => {
          e.preventDefault();
          performAction( {value : inputElement().value}, currentUserId ); 
          inputElement().value = '';
        }}>Submit</button>
  </div>    
)

insertVal.propTypes = {
  performAction: PropTypes.func.isRequired
}

export default insertVal;