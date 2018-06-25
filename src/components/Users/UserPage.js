
class UserPage extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      userEmail: '',
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          userName: user.displayName,
          userEmail: user.email,
        });
      } else {
        console.log('no user');
      }
    });
  }


  render() {
    return (
      <div />
    );
  }
}

export default UserPage
