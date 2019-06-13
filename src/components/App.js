import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Avatar from './Avatar';
import Modal from './Modal';
import { parseMarkdown } from './Utils/helper'

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
    const { REACT_APP_GIST } = process.env;
    const cookies = new Cookies();
    
    axios.get(REACT_APP_GIST)
      .then(res => {
        const alerts = parseMarkdown(res.data)
        if (cookies.get('viewed')) {
          this.setState({...this.state, alerts, hasViewed: true})
        } else {
          this.setState({...this.state, alerts})
        }
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

  setViewedCookie = () => {
    const cookies = new Cookies();
    if (!cookies.get('viewed')) {
      let expires = new Date();
      expires.setTime(expires.getTime() + ( 60000 * 3));
      cookies.set("viewed", true, {path: "/", expires, });
    }
  }

  closeModal = () => {
    this.setState({
      ...this.state, 
      showModal: false, 
      hasViewed: true, 
    })

    this.setViewedCookie();
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
