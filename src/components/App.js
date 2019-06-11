import React, { Component } from 'react';
import axios from 'axios';
import Avatar from './Avatar';
import Modal from './Modal';
import images from '../assets/illustrations.json'


class App extends Component {

  state = {
    showModal: false,
    alerts: []
  }

  componentDidMount() {
    const { REACT_APP_GIST } = process.env;
    axios.get(REACT_APP_GIST)
    .then(res => {
      this.parseMarkdown(res.data)
    })
    .catch(err => console.error(`
Error retrieving markdown: 
${err}
    `))
  }

  parseMarkdown = (md) => {
    const mdArr = md.split('\n');
    const alerts = [];
    let alert = [];

    //  Loops through each markdown line
    //  checking to see if the line starts with '###'
    //  if it does, it appends the line to the alert array
    //  once we reach a line the does not start '###'
    //  we have all the alerts values and that current line is the body
    //  then we append a new alert object into the alerts array
    //  using the position in the alert array to determine what value it is
    ///////////
    mdArr.forEach((ln, i) => {
      if (i !== 0) {
        const alen = alert.length;

        if (ln.startsWith('###')) {
          const content = ln.split('### ');
          alert.push(content[1]);

        } else if (alen >= 2 && alen <= 3) {

          alerts.push({
            title: alert[0],
            body:  ln,
            date: alert[1],
            image: alen === 3 ? images[alert[2]] : ""
          })

          alert = []

        } else if (ln !== ""){
          console.error(`
Error formatting markdown:
Alert: "${alert}"
Current line: "${ln}"
Index: "${i}"
          `)
        }
      }
    })

    alerts.sort((a, b) => new Date(b.date) - new Date(a.date))
    this.setState({...this.state, alerts})
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
