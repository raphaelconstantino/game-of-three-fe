import React from 'react'
import PropTypes from 'prop-types';

const playerBtn = ({label, chooseAction}) => (
    <button type="button" className="btn  btn-info"
        onClick={e => {
                    e.preventDefault();
                    chooseAction()
                }}>
                    {label}
    </button>
)

playerBtn.propTypes = {
  label: PropTypes.string.isRequired,
  chooseAction: PropTypes.func.isRequired
}

export default playerBtn;