import React from 'react';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import { Route, Routes } from 'react-router-dom';
import './App.css';

const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
)
class App extends React.Component {
  render() {
    return (
      // <div className='App'>
      //   <HomePage />
      // </div>
      <div>
        <Routes>        
          <Route excact path="/" element={<HomePage/>} />
          <Route path="/shop" element={<ShopPage/>} />
        </Routes>

      </div>
    );
  }
}

export default App;
