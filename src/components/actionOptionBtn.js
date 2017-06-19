import React from 'react'
import PropTypes from 'prop-types';

const actionOptionBtn = ({performAction, value, action, currentUserId, label}) => (
    <button type="submit" 
        onClick={() => performAction({value, action}, currentUserId )} className="btn btn-info">
        {label}
    </button>
)

actionOptionBtn.propTypes = {
  performAction: PropTypes.func.isRequired,
  value : PropTypes.number.isRequired,
  action : PropTypes.number.isRequired,
  currentUserId : PropTypes.string.isRequired,
  label : PropTypes.string.isRequired
}

export default actionOptionBtn;