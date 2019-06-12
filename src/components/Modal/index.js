import React, { Component } from 'react';
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
    closeModal: PropTypes.func,
};


class Modal extends Component {

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    }

    handleClickOutside = (event) => {
        const { closeModal } = this.props;
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            closeModal();
        }
    }

    render() {
        const {alerts, closeModal} = this.props;
        return (
            <div className="modal-cover" onClick={(e) => this.handleClickOutside(e)}>
                <div className="modal-wrapper" ref={this.setWrapperRef}>
                    <span 
                        className="close-modal" 
                        onClick={() => closeModal()}
                        >x</span>
                    
                    <div className="modal-list">
                        {
                            alerts && alerts.map((alert, i) => {
                                return <Alert key={i} {...alert} />
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

Modal.propTypes = propTypes;


export default Modal;
