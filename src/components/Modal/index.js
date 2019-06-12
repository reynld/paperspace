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
    toggleDetail: func,
};


class Modal extends Component {

    wrapperRef = React.createRef()

    handleClickOutside = (event) => {
        const { closeModal } = this.props;
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            closeModal();
        }
    }

    renderAlerts = () => {
        const { alerts } = this.props;
        return alerts.map((alert, i) => {
            return <Alert key={i} alert={alert} selectAlert={this.onSelectAlertClick}/>
        })
    }

    renderButton = () => {
        const { closeModal, detailView, toggleDetail } = this.props;

        if (detailView) {
            return (
                <i
                    className="fas fa-chevron-left modal-button back-button" 
                    onClick={() => toggleDetail()}
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

    onSelectAlertClick = (alert) => {
        const { selectAlert } = this.props;
        this.wrapperRef.current.scrollTo(0, 0);
        selectAlert(alert)
    }

    render() {
        const { detailView, selectedAlert } = this.props;
        return (
            <div className="modal-cover" onClick={(e) => this.handleClickOutside(e)}>
                <div 
                    className={`modal-wrapper ${detailView ? "detail-modal-wrapper" : ""}`}
                    ref={this.wrapperRef}>
                    {this.renderButton()}
                    <DetailAlert alert={selectedAlert}/>
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
