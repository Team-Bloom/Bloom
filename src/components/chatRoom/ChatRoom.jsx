import React from 'react';
import ReactDOM from 'react-dom';
import './ChatRoom.css';
import Message from '../message/Message.jsx';
import { db } from '../../index.js';

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newMsg: '',
    };
  }

  componentDidUpdate() {
    this.scrollToBot();
  }

  scrollToBot() {
    ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(
      this.refs.chats
    ).scrollHeight;
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  submitMessage = evt => {
    evt.preventDefault();

    const newMsg = {
      username: this.props.user.metadata.name,
      content: this.state.newMsg,
    };
    db.collection('Projects')
      .doc(this.props.projectId)
      .update({
        messages: [...this.props.messages, newMsg],
      });
    this.setState({
      newMsg: '',
    });
  };

  render() {
    console.log("line 50 in ChatRoom", this.props)
    return (
      <div className="chatroom">
        <h3>Bloom Chat</h3>
        <ul className="chats" ref="chats">
          {this.props.messages && this.props.messages.map((message, index) => (
            <Message key={index} message={message} user={this.props.user} />
          ))}
        </ul>
        <form className="input" onSubmit={e => this.submitMessage(e)}>
          <input
            onChange={this.handleChange}
            name="newMsg"
            type="text"
            ref="msg"
            value={this.state.newMsg}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default ChatRoom;
