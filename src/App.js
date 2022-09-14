import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import shoppingCart from './components/shoppingCart';
import Detail from './pages/Detail';
import './css/Header.css';
import './css/Categories.css';
import './css/Detail.css';
import FinishCart from './pages/FinishCart';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/cart" component={ shoppingCart } />
          <Route exact path="/cart/FinishCart" component={ FinishCart } />
          <Route exact path="/ProductDetail/:id" component={ Detail } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
