import React, { Component } from 'react';
import { string, func, arrayOf, shape, bool } from 'prop-types';
import Alert from './Alert';
import DetailAlert from './DetailAlert';


const propTypes = {
    alerts: arrayOf(
        shape({
            title: string,
            body: string,
            date: string,
            image: string,
        })
    ),
    selectedAlert: shape({
        title: string,
        body: string,
        date: string,
        image: string,
    }),
    closeModal: func,
    selectAlert: func,
    detailView: bool,
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

    renderAlerts = () => {
        const { alerts, selectAlert, selectedAlert, detailView } = this.props;

        if (detailView) {
            return <DetailAlert alert={selectedAlert} selectAlert={selectAlert}/>
        }

        return alerts.map((alert, i) => {
            return <Alert key={i} alert={alert} selectAlert={selectAlert}/>
        })
    }

    renderButton = () => {
        const { closeModal, detailView, selectAlert  } = this.props;

        if (detailView) {
            return (
                <i
                    className="fas fa-chevron-left modal-button back-button" 
                    onClick={() => selectAlert({})}
                />
            )
        }

        return (
            <i
                className="fas fa-times modal-button" 
                onClick={() => closeModal()}
            />
        )
    }

    render() {
        const { detailView } = this.props;
        return (
            <div className="modal-cover" onClick={(e) => this.handleClickOutside(e)}>
                <div 
                    className={`modal-wrapper ${detailView ? "detail-modal-wrapper" : ""}`}
                    ref={this.setWrapperRef}>
                    {this.renderButton()}
                    <div className="modal-list">
                        {this.renderAlerts()}
                    </div>
                </div>
            </div>
        );
    }
}

Modal.propTypes = propTypes;


export default Modal;
