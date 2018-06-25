import React, { Component } from "react";
import "./ChatRoom.css";
import Message from "../message/Message.jsx";
import { db } from "../index.js";

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      message: "",
      list: []
    };

    // this.messageRef = db.collection("Projects").doc();
    // this.listenMessages();
  }

  componentWillReceiveProps(nextProps) {
    // console.log("Props line 21:\n", props)
    console.log("Next Props line 22:\n", nextProps)
    // if (nextProps.user) {
    //   this.setState({ userName: nextProps.user.displayName });
    // }
  }

  // handleChange(event) {
  //   this.setState({ message: event.target.value });
  // }

  // handleSend() {
  //   if (this.state.message) {
  //     var newItem = {
  //       userName: this.state.userName,
  //       message: this.state.message
  //     };
  //     this.messageRef.push(newItem);
  //     this.setState({ message: "" });
  //   }
  // }

  // handleKeyPress(event) {
  //   if (event.key !== "Enter") return;
  //   this.handleSend();
  // }

  // listenMessages() {
  //   this.messageRef.limitToLast(10).on("value", message => {
  //     this.setState({
  //       list: Object.values(message.val())
  //     });
  //   });
  // }

  render() {
    return (
      <div className="form">
      <h1> Hello</h1>
        {/* <div className="form__message">
          {this.state.list.map((item, index) => (
            <Message key={index} message={item} />
          ))}
        </div>
        <div className="form__row">
          <input
            className="form__input"
            type="text"
            placeholder="Type message"
            value={this.state.message}
            onChange={this.handleChange.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)}
          />
          <button className="form__button" onClick={this.handleSend.bind(this)}>
            send
          </button>
        </div> */}
      </div>
    );
  }
}
