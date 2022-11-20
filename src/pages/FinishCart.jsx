import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Pagamento from '../components/Pagamento';
import back from '../images/back.png';

export default class FinishCart extends Component {
  state = {
    cart: [],
    redirectHeader: false,
    cartContent: 0,
    search: '',
  };

  componentDidMount() {
    this.fetchCart();
    this.getCartNumber();
  }

  fetchCart = () => {
    const cartList = JSON.parse(localStorage.getItem('cart')) || [];
    this.setState({ cart: cartList });
  };

  onInputChange = ({ target }) => {
    this.setState({ search: target.value, redirectHeader: true });
  };

  getCartNumber = () => {
    const getLocal = JSON.parse(localStorage.getItem('cart')) || [];
    const count = getLocal.length;
    this.setState({ cartContent: count });
  };

  render() {
    const {
      cart, search, redirectHeader, cartContent } = this.state;
    return (
      <>
        <Header
          search={ search }
          onInputChange={ this.onInputChange }
          onClick={ () => {} }
          cartContent={ cartContent }
          redirectHeader={ redirectHeader }
        />
        <Link to="/frontend-online-store/cart" className="back">
          <img src={ back } alt="Voltar" />
          <p>Voltar</p>
        </Link>
        <main className="container-cart">
          <div className="checkout-revise">
            <div className="checkout-itens">
              <h3 className="checkout-title">Revise os Produtos</h3>
              {cart.filter(function repeated(e) {
                const compare = !this[e.id] && (this[e.id] = true);
                return compare;
              }, Object.create(null)).map((e) => (
                <div key={ e.id } className="cart-itens">
                  <div className="buttons-cart-margin" />
                  <img src={ e.thumbnail } className="cart-img" alt={ e.title } />
                  <p className="checkout-name ">{e.title}</p>
                  <div className="cart-quantity checkout-quant">
                    <div className="quantity-product">
                      <p>{cart.filter((f) => f.id === e.id).length}</p>
                    </div>
                  </div>
                  <div className="buttons-cart-margin" />
                  <p className="cart-price-item ckeckout-price">
                    {`R$${e.price}`}
                  </p>
                </div>
              ))}
              <h4
                className="checkout-title"
              >
                {`Valor Total: R$ ${cart
                  .reduce((acc, corrent) => acc + Number(corrent.price), 0).toFixed(2)}`}
              </h4>
            </div>
          </div>
          <Pagamento />
        </main>
      </>
    );
  }
}
