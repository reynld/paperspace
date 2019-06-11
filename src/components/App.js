import React, { Component } from 'react';
import Avatar from './Avatar';
import Modal from './Modal';

class App extends Component {

  state = {
    showModal: false,
    alerts: [
      {
        title: "Title-1",
        body: "Body-3",
        date: "7/21/2018",
        image: ""
      },
      {
        title: "Title-2",
        body: "Body-2",
        date: "7/14/2018",
        image: ""
      },
      {
        title: "Title-3",
        body: "Body-3",
        date: "7/7/2018",
        image: ""
      }
    ]
  }

  onAvatarClicked = () => {
    this.setState({...this.state, showModal: !this.state.showModal})
  }

  render() {
    const { showModal, alerts } = this.state;
    return (
      <div className="App">
        <Avatar onAvatarClicked={this.onAvatarClicked} notifications={alerts.length}/>
        {
          showModal && <Modal alerts={alerts} onCloseModal={this.onAvatarClicked}/>
        }
      </div>
    );
  }
}

export default App;
