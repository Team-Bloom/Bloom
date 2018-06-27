import React from "react";
import firebase from "firebase";
import { addNewUser } from "./function.js";
import Chat from '../chatRoom/ChatRoom'
import Node from '../components/node.js'

class Dashboard extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      newUser: ''
    }
  }
  render() {
    firebase.auth().onAuthStateChanged( async (user) => {
      if (user) {
        // console.log(user);
        const newUsr = await addNewUser({ name: user.displayName, email: user.email }, user.uid);
        this.setState({
          newUser: newUsr
        })
      } else {
        console.log("no one signed in");
      }
    });
    if(this.state.newUser.path) console.log("hellz yeah")
  return (
  <div>
    <h1>Hello</h1>
    <Chat path={this.state.newUser.path}/>
    <Node />
    </div>);
  }
}

export default Dashboard;
