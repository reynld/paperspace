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
    ),
    onCloseModal: PropTypes.func,
};


const Modal = ({alerts, onCloseModal}) => {
    return (
        <div className="modal-wrapper">
            <span className="close-modal" onClick={() => onCloseModal()}>x</span>
            <div className="modal-list">
                {
                    alerts && alerts.map((alert, i) => {
                        return <Alert key={i} {...alert} />
                    })
                }
            </div>
        </div>
    );
};


Modal.propTypes = propTypes;


export default Modal;
