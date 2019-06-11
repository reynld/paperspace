import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
    alerts: PropTypes.arrayOf(
        PropTypes.shape()
    )
};


const Modal = ({alerts}) => {
    return (
        <div className="modal-container">
            <span className="close-modal">x</span>
            {
                alerts && alerts.map((alert, i) => {
                    return <div>{alert}</div>
                })
            }
        </div>
    );
};


Modal.propTypes = propTypes;


export default Modal;
