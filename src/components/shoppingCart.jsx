import { Component } from 'react';
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
    console.log(cartList);
    this.setState({ cart: cartList });
  };

  increaseClick = (product) => {
    addCardClick(product);
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
            const compare = !this[JSON.stringify(r)] && (this[JSON.stringify(r)] = true);
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
                  >
                    -
                  </button>
                  <button type="button" data-testid="remove-product">Remove</button>
                </div>
              </div>
            ))}
      </div>
    );
  }
}
