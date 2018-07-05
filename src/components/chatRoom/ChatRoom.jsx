import React from 'react';
import * as ReactDOM from 'react-dom';
import './ChatRoom.css';
import Message from '../message/Message.jsx';
import { db } from '../../exports.js';

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newMsg: '',
    };
  }
  UNSAFE_componentWillUpdate(nextProps) {
    this.historyChanged =
      nextProps.messages.length !== this.props.messages.length;
    if (this.historyChanged) {
      const { chats } = this.refs;
      const scrollPos = chats.scrollTop;
      const scrollBottom = chats.scrollHeight - chats.clientHeight;
      this.scrollAtBottom = scrollBottom <= 0 || scrollPos === scrollBottom;
      if (!this.scrollAtBottom) {
        const numMessages = chats.childNodes.length;
        this.topMessage = numMessages === 0 ? null : chats.childNodes[0];
      }
    }
  }

  componentDidUpdate() {
    if (this.historyChanged) {
      if (this.scrollAtBottom) {
        this.scrollToBot();
    //   }
    //   if (this.topMessage) {
    //     ReactDOM.findDOMNode(this.topMessage).scrollAtBottom();
    //   }
    // }
      }
    }
  }

  scrollToBot() {
    const { chats } = this.refs;
    const scrollHeight = chats.scrollHeight;
    const height = chats.clientHeight;
    const maxScrollTop = scrollHeight - height;
    console.log(maxScrollTop)
    ReactDOM.findDOMNode(chats).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  onScroll() {
    const { refs, props } = this;
    const scrollTop = refs.chats.scrollTop;
    if (scrollTop === 0) {
      props.fetchHistory();
    }
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
    return (
      <div>
        <div className="chatroom">
          <h3>Bloom Chat</h3>
          <div>
            <ul className="chats" ref="chats">
              {this.props.messages &&
                this.props.messages.map((message, index) => (
                  <Message
                    key={index}
                    message={message}
                    user={this.props.user}
                  />
                ))}
            </ul>
            <form className="input" onSubmit={el => this.submitMessage(el)}>
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
        </div>
      </div>
    );
  }
}

export default ChatRoom;
