import React from 'react'
import PropTypes from 'prop-types';

const output = ({currentStatus, children}) => (
    <div className="container">
        <h2>Actions Output</h2>
        <p>Current Value: <strong>{currentStatus}</strong></p>
        {children}
    </div>
)

output.propTypes = {
  currentStatus: PropTypes.number
}

export default output;