import React from 'react';
import { connect } from 'react-redux';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from "./pages/signin/signin.component"
import Header from './components/header/header.component';
import { Route, Routes } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { createUserProfileDocument, db } from "./firebase/firebase.utils";
import { doc, onSnapshot } from "firebase/firestore";
import { setCurrentUser } from './redux/user/user.actions';
import './App.css';

const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
)
class App extends React.Component {
  // Redux connect replaces this
  // constructor() {
  //   super();
  //   this.state = { currentUser: null }
  // }

  componentDidMount() {

    const { setCurrentUser } = this.props;

    const auth = getAuth();
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        console.log("UserAuth", userAuth);
        const userRef = await createUserProfileDocument(userAuth);
        this.unsubSnapshot = onSnapshot(doc(db, "users", userAuth.uid), (doc) => {
          const data = doc.data();
          console.log(data);
          if (!data) {
            console.log("There is no data", doc);
            return;
          }
          setCurrentUser({
            id: userAuth.uid,
            ...data
          });

          // Old fashion way handling state
          // this.setState({
          //   currentUser: {
          //     id: data.id,
          //     ...data
          //   }
          // }, () => console.log("State: " + this.state))
        });

      } else {
        // this.setState({ currentUser: null });
        setCurrentUser({ setCurrentUser: userAuth });
      }
    });
  }

  unsubSnapshot = null;
  unsubscribeFromAuth = null;

  componentWillUnmount() {
    this.unsubscribeFromAuth();
    this.unsubSnapshot();
  }
  render() {
    return (
      // <div className='App'>
      //   <HomePage />
      // </div>
      <div>
        <Header />
        <Routes>
          <Route excact path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/signin" element={<SignInAndSignUpPage />} />
        </Routes>

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);
