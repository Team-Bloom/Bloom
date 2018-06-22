import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import firebase from "firebase";
import config from "./firebaseConfig";
require("firebase/firestore");

firebase.initializeApp(config);
const db = firebase.firestore();

export const add = async () => {
  try {
    const newUser = await db.collection("Users").add({metadata: {
      first: "Test3",
      last: "tester",
      email: "test@test.com"
    }})
    await newUser.collection('projects').add({
      name: 'test'
    });
  } catch (e) {
    console.error(e);
  }
};
add();

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
