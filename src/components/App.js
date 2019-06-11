import React, { Component } from 'react';
import Avatar from './Avatar';
import Modal from './Modal';

class App extends Component {

  state = {
    showModal: false,
  }

  onAvatarClicked = () => {
    this.setState({...this.state, showModal: !this.state.showModal})
  }

  render() {
    const { showModal } = this.state;
    return (
      <div className="App">
        <Avatar onAvatarClicked={this.onAvatarClicked} notifications={2}/>
        {
          showModal && <Modal/>
        }
      </div>
    );
  }
}

export default App;
