import { Component } from 'react';

export default class shoppingCart extends Component {
  state = {
    cart: [],
  };

  componentDidMount() {
    this.fetchCart();
  }

  fetchCart = async () => {
    const cart = localStorage.getItem('cart');
    const products = JSON.parse(cart);
    this.setState({ cart: products || [] });
  };

  render() {
    const { cart } = this.state;
    return (
      <div>
        {cart.length === 0
          ? (
            <h1 data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </h1>)
          : cart.map((product) => (
            <div key={ product.id }>
              <img src={ product.thumbnail } alt={ product.title } />
              <p data-testid="shopping-cart-product-name">{product.title}</p>
              <p>{product.price}</p>
              <p data-testid="shopping-cart-product-quantity">01</p>
            </div>
          ))}
      </div>
    );
  }
}
