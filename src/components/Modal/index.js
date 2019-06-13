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

    state = {
        mounted: false,
        unmount: false
    }

    wrapperRef = React.createRef()

    componentDidMount() {
        setTimeout(() => {
            this.setState({...this.state, mounted: true,})
        }, 1)
    }

    closeModal = () => {
        const { closeModal } = this.props;
        this.setState({...this.state, unmount: true})
        setTimeout(() => {
            closeModal();
        }, 400)
    }

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.closeModal()
        }
    }

    onSelectAlertClick = (alert) => {
        const { selectAlert } = this.props;
        this.wrapperRef.current.scrollTo(0, 0);
        selectAlert(alert)
    }

    getModalClassName = () => {
        const { detailView} = this.props;
        const { mounted, unmount } = this.state;

        let className = 'modal-wrapper';

        if (detailView) {
            className += " detail-modal-wrapper";
        }

        if (mounted) {
            className += " modal-mounted";
        }

        if (unmount) {
            className += " modal-unmount";
        } 

        return className
    }

    renderAlerts = () => {
        const { alerts } = this.props;
        return alerts.map((alert, i) => {
            return <Alert key={i} alert={alert} selectAlert={this.onSelectAlertClick}/>
        })
    }

    renderButton = () => {
        const { detailView, toggleDetail } = this.props;

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
                onClick={() => this.closeModal()}
            />
        )
    }

    renderContent = () => {
        const { alerts, selectedAlert } = this.props
        if (alerts.length > 0) {
            return (
                <>
                    <DetailAlert alert={selectedAlert}/>
                    <div className="modal-list">{this.renderAlerts()}</div>
                </>
            )
        }

        return (
            <div className="no-alerts">
                No new updates
            </div>
        )
    }

    render() {
        return (
            <div className="modal-cover" onClick={(e) => this.handleClickOutside(e)}>
                <div 
                    className={this.getModalClassName()}
                    ref={this.wrapperRef}
                >
                    {this.renderButton()}
                    {this.renderContent()}
                </div>
            </div>
        );
    }
}

Modal.propTypes = propTypes;


export default Modal;
