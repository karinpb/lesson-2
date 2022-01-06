import React from 'react';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from "./pages/signin/signin.component"
import Header from './components/header/header.component';
import { Route, Routes } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { createUserProfileDocument, db } from "./firebase/firebase.utils";
import { doc, onSnapshot } from "firebase/firestore";
import './App.css';

const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
)
class App extends React.Component {
  constructor() {
    super();
    this.state = { currentUser: null }
  }

  componentDidMount() {
    const auth = getAuth();
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        console.log("UserAuth",userAuth);
        const userRef = await createUserProfileDocument(userAuth);
        // userRef.onSnapShot(snapShot => {
        //   this.setState({
        //     currentUser: {
        //       id: snapShot.id,
        //       ...snapShot.data()
        //     }
        //   }, () => console.log("State: " + this.state))
        // });

        this.unsubSnapshot = onSnapshot(doc(db, "users", userAuth.uid), (doc) => {
          const data=doc.data();
          if(!data){
            console.log("There is no data", doc);
            return;
          }
          console.log("Current data: ", data);
               this.setState({
            currentUser: {
              id: data.id,
              ...data
            }
          }, () => console.log("State: " + this.state))
        });

      } else {
        this.setState({ currentUser: null });
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
        <Header currentUser={this.state.currentUser} />
        <Routes>
          <Route excact path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/signin" element={<SignInAndSignUpPage />} />
        </Routes>

      </div>
    );
  }
}

export default App;
