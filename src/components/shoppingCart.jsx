import { Component } from 'react';
import { Link } from 'react-router-dom';
import addCardClick from '../services/addCard';

export default class shoppingCart extends Component {
  state = {
    cart: [],
  };

  componentDidMount() {
    this.fetchCart();
  }

  fetchCart = () => {
    const cartList = JSON.parse(localStorage.getItem('cart')) || [];
    this.setState({ cart: cartList });
  };

  increaseClick = (product) => {
    addCardClick(product);
    this.fetchCart();
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
  };

  removeClick = (product) => {
    const getCartLocal = JSON.parse(localStorage.getItem('cart'));
    const removeAll = getCartLocal.filter((e) => e.id !== product.id);
    localStorage.setItem('cart', JSON.stringify(removeAll));
    this.fetchCart();
  };

  render() {
    const { cart } = this.state;
    return (
      <div>
        <h1>Carrinho de compras</h1>
        {cart.length === 0
          ? (
            <h1 data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </h1>)
          : cart.filter(function repeated(r) {
            const compare = !this[r.id] && (this[r.id] = true);
            return compare;
          }, Object.create(null))
            .map((product) => (
              <div key={ product.id }>
                <img src={ product.thumbnail } alt={ product.title } />
                <p data-testid="shopping-cart-product-name">{product.title}</p>
                <p>{product.price}</p>
                <div className="cart-quantity">
                  <button
                    type="button"
                    data-testid="product-increase-quantity"
                    onClick={ () => this.increaseClick(product) }
                  >
                    +
                  </button>
                  <p data-testid="shopping-cart-product-quantity">
                    {cart.filter((id) => id.id === product.id).length}
                  </p>
                  <button
                    type="button"
                    data-testid="product-decrease-quantity"
                    onClick={ () => this.decreaseClick(product) }
                  >
                    -
                  </button>
                  <button
                    type="button"
                    data-testid="remove-product"
                    onClick={ () => this.removeClick(product) }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
        <Link to="/cart/FinishCart" data-testid="checkout-products">
          Finalizar compra
        </Link>
      </div>
    );
  }
}
