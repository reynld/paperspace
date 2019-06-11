import React, { Component } from 'react';
import Avatar from './Avatar';

class App extends Component {

  onAvatarClicked = () => {
    console.log('CLICKED')
  }

  render() {
    return (
      <div className="App">
        <Avatar onAvatarClicked={this.onAvatarClicked} notifications={2}/>
      </div>
    );
  }
}

export default App;
