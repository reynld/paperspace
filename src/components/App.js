import React, { Component } from 'react';
import Avatar from './Avatar';
import Modal from './Modal';
import images from '../assets/illustrations.json'

class App extends Component {

  state = {
    showModal: false,
    alerts: [
      {
        title: "Title-1",
        body: "Body-3",
        date: "6/11/2019",
        image: images[0]
      },
      {
        title: "Title-2",
        body: "Body-2",
        date: "6/9/2019",
        image: images[1]
      },
      {
        title: "Title-3",
        body: "Body-3",
        date: "6/1/2019",
        image: images[2]
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
