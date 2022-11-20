import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import shoppingCart from './components/shoppingCart';
import Detail from './pages/Detail';
import './css/Header.css';
import './css/Categories.css';
import './css/Detail.css';
import './css/Home.css';
import './css/Cart.css';

import FinishCart from './pages/FinishCart';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/frontend-online-store/" component={ Home } />
          <Route exact path="/frontend-online-store/cart" component={ shoppingCart } />
          <Route
            exact
            path="/frontend-online-store/cart/FinishCart"
            component={ FinishCart }
          />
          <Route
            exact
            path="/frontend-online-store/ProductDetail/:id"
            component={ Detail }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
