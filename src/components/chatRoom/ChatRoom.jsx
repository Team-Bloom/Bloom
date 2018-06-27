// import React, { Component } from "react";
// import "./ChatRoom.css";
// import Message from "../message/Message.jsx";
// import { db } from "../index.js";

// export default class ChatRoom extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       messages: {}
//     };

//     // this.messageRef = db.collection("Projects").doc();
//     // this.listenMessages();
//   }
//   // componentWillReceiveProps(nextProps) {
//   //   // `
//   //   console.log("Next Props line 22:\n", nextProps)
//   //   // if (nextProps.user) {
//   //   //   this.setState({ userName: nextProps.user.displayName });
//   //   // }
//   // }

//   // handleChange(event) {
//   //   this.setState({ message: event.target.value });
//   // }

//   // handleSend() {
//   //   if (this.state.message) {
//   //     var newItem = {
//   //       userName: this.state.userName,
//   //       message: this.state.message
//   //     };
//   //     this.messageRef.push(newItem);
//   //     this.setState({ message: "" });
//   //   }
//   // }

//   // handleKeyPress(event) {
//   //   if (event.key !== "Enter") return;
//   //   this.handleSend();
//   // }

//   // listenMessages() {
//   //   this.messageRef.limitToLast(10).on("value", message => {
//   //     this.setState({
//   //       list: Object.values(message.val())
//   //     });
//   //   });
//   // }

//   render() {
//     console.log('Line 57 Props:', this.props)
//     return (
//       <div className="form">
//       <h1> Hello</h1>
//         {/* <div className="form__message">
//           {this.state.list.map((item, index) => (
//             <Message key={index} message={item} />
//           ))}
//         </div>
//         <div className="form__row">
//           <input
//             className="form__input"
//             type="text"
//             placeholder="Type message"
//             value={this.state.message}
//             onChange={this.handleChange.bind(this)}
//             onKeyPress={this.handleKeyPress.bind(this)}
//           />
//           <button className="form__button" onClick={this.handleSend.bind(this)}>
//             send
//           </button>
//         </div> */}
//       </div>
//     );
//   }
// }

import React from 'react';
import ReactDOM from 'react-dom';
import './ChatRoom.css';
import firebase from 'firebase';
import Message from '../message/Message.jsx';
import { db } from '../../index.js';

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chats: [],
      user: '',
      photoURL: '',
    };

    this.submitMessage = this.submitMessage.bind(this);
  }

  async componentDidMount() {
    console.log(typeof this.props.projectId);
    this.scrollToBot();
    const { displayName, photoURL } = await firebase.auth().currentUser;

    const projectData = await db
      .collection('Projects')
      .doc(this.props.projectId)
      .get();
    //get the messages from the specific Project
    const { messages } = projectData.data();
    //load them into state to populate the chatbox YEAAHHH!!
    this.setState({
      user: displayName,
      chats: messages,
      photoURL: photoURL,
    });
  }

  componentDidUpdate() {
    this.scrollToBot();
  }

  scrollToBot() {
    ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(
      this.refs.chats
    ).scrollHeight;
  }

  submitMessage(e) {
    e.preventDefault();

    this.setState(
      {
        chats: this.state.chats.concat([
          {
            username: this.state.user,
            content: <p>{ReactDOM.findDOMNode(this.refs.msg).value}</p>,
            img: this.state.photoURL || 'http://i.imgur.com/Tj5DGiO.jpg',
          },
        ]),
      },
      () => {
        ReactDOM.findDOMNode(this.refs.msg).value = '';
      }
    );
  }

  render() {
    const { chats, user, photoURL } = this.state;

    return (
      <div className="chatroom">
        <h3>BloomTime</h3>
        <ul className="chats" ref="chats">
          {chats.map(chat => (
            <Message chat={chat} user={user}/>
          ))}
        </ul>
        <form className="input" onSubmit={e => this.submitMessage(e)}>
          <input type="text" ref="msg" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default ChatRoom;
