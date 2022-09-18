import { Component } from 'react';
import { Link } from 'react-router-dom';
import addCardClick from '../services/addCard';
import back from '../images/back.png';
import Header from './Header';

export default class shoppingCart extends Component {
  state = {
    cart: [],
    search: '',
    redirectHeader: false,
    cartContent: '',
  };

  componentDidMount() {
    this.fetchCart();
    this.getCartNumber();
  }

  fetchCart = () => {
    const cartList = JSON.parse(localStorage.getItem('cart')) || [];
    this.setState({ cart: cartList });
  };

  increaseClick = (product) => {
    const { cart } = this.state;
    const filter = cart.filter((e) => e.id === product.id).length;
    if (filter < product.available_quantity) {
      addCardClick(product);
    }
    this.fetchCart();
    this.getCartNumber();
  };

  decreaseClick = async (product) => {
    const getCartLocal = JSON.parse(localStorage.getItem('cart'));
    const filterIndex = getCartLocal.map((e) => e.id).lastIndexOf(product.id);
    const filter = getCartLocal.filter((e) => e.id === product.id);
    if (filter.length !== 1) {
      getCartLocal.splice(filterIndex, 1);
      localStorage.setItem('cart', JSON.stringify(getCartLocal));
    }
    this.fetchCart();
    this.getCartNumber();
  };

  removeClick = (product) => {
    const getCartLocal = JSON.parse(localStorage.getItem('cart'));
    const removeAll = getCartLocal.filter((e) => e.id !== product.id);
    localStorage.setItem('cart', JSON.stringify(removeAll));
    this.fetchCart();
    this.getCartNumber();
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
    const { cart, search, redirectHeader, cartContent } = this.state;
    return (
      <>
        <Header
          search={ search }
          onInputChange={ this.onInputChange }
          onClick={ () => {} }
          cartContent={ cartContent }
          redirectHeader={ redirectHeader }
        />
        <Link to="/" className="back">
          <img src={ back } alt="Voltar" />
          <p>Voltar</p>
        </Link>
        <main className="container-cart">
          {cart.length === 0
            ? (
              <div className="text-center-cart">
                <h1 data-testid="shopping-cart-empty-message">
                  Seu carrinho está vazio
                </h1>
                <p />
              </div>)
            : (
              <div className="container-cart-itens">
                <div className="cart-item">
                  <h1 className="cart-title">Carrinho de Compras</h1>
                  {cart.filter(function repeated(r) {
                    const compare = !this[r.id] && (this[r.id] = true);
                    return compare;
                  }, Object.create(null))
                    .map((product) => (
                      <div key={ product.id } className="cart-itens">
                        <button
                          type="button"
                          data-testid="remove-product"
                          onClick={ () => this.removeClick(product) }
                          className="buttons-cart btn-rmv"
                        >
                          x
                        </button>
                        <img
                          src={ product.thumbnail }
                          alt={ product.title }
                          className="cart-img"
                        />
                        <p
                          data-testid="shopping-cart-product-name"
                          className="product-name"
                        >
                          {product.title}
                        </p>
                        <div className="cart-quantity">
                          <button
                            type="button"
                            data-testid="product-decrease-quantity"
                            onClick={ () => this.decreaseClick(product) }
                            className="buttons-cart"
                          >
                            -
                          </button>
                          <p data-testid="shopping-cart-product-quantity">
                            {cart.filter((id) => id.id === product.id).length}
                          </p>
                          <button
                            type="button"
                            data-testid="product-increase-quantity"
                            onClick={ () => this.increaseClick(product) }
                            className="buttons-cart"
                          >
                            +
                          </button>
                          <p className="cart-price-item">{`R$${product.price}`}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>)}
          {cart.length > 0 && (
            <div className="amount-container">
              <div className="amount-title-container">
                <h1 className="amount-title">Valor total da compra:</h1>
                <h2
                  className="amount"
                >
                  {`R$ ${cart.reduce((acc, corr) => acc + corr.price, 0).toFixed(2)}`}
                </h2>
              </div>
              <div className="center" />
              <div>
                <Link
                  to="/cart/FinishCart"
                  data-testid="checkout-products"
                  className="checkout-btn"
                >
                  Finalizar compra
                </Link>
              </div>
            </div>)}
        </main>
      </>
    );
  }
}
