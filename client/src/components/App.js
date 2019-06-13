import React, { Component } from 'react';
import axios from 'axios';
import Avatar from './Avatar';
import Modal from './Modal';


class App extends Component {

  state = {
    showModal: false,
    alerts: [],
    hasViewed: false,
    selectedAlert: {},
    showDetail: false,
  }

  componentDidMount() {
    this.getAlerts();
  }

  getAlerts = () => {
    const { REACT_APP_BACKEND_URL } = process.env;
    axios.get(REACT_APP_BACKEND_URL)
    .then(res => {
      this.setState({...this.state, alerts: res.data})
    })
    .catch(err => console.error('Error retrieving alerts\nError: '+ err))
  }


  selectAlert = (alert) => {
    this.setState({
      ...this.state, 
      selectedAlert: alert,
      showDetail: true,
    })
  }

  toggleDetail = () => {
    this.setState({
      ...this.state,
      showDetail: false,
    })
  }

  closeModal = () => {
    this.setState({
      ...this.state, 
      showModal: false, 
      hasViewed: true, 
    })
  }

  openModal = () => {
    this.setState({...this.state, showModal: true})
  }

  render() {
    const { showModal, alerts, hasViewed, selectedAlert, showDetail } = this.state;
    const alertCount = hasViewed ? 0 : alerts.length;

    return (
      <div className="App">
        <Avatar openModal={this.openModal} notifications={alertCount}/>
        {
          showModal && 
            <Modal 
              alerts={alerts} 
              closeModal={this.closeModal} 
              selectAlert={this.selectAlert}
              selectedAlert={selectedAlert}
              detailView={showDetail}
              toggleDetail={this.toggleDetail}
            />
        }
      </div>
    );
  }
}

export default App;
