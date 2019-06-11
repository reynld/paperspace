import React from 'react';
import PropTypes from 'prop-types';
import Alert from './Alert';


const propTypes = {
    alerts: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            body: PropTypes.string,
            date: PropTypes.string,
            image: PropTypes.string,
        })
    )
};


const Modal = ({alerts}) => {
    return (
        <div className="modal-container">
            <span className="close-modal">x</span>
            {
                alerts && alerts.map((alert, i) => {
                    return <Alert key={i} {...alert} />
                })
            }
        </div>
    );
};


Modal.propTypes = propTypes;


export default Modal;
