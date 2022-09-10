import { Component } from 'react';

export default class shoppingCart extends Component {
  state = {
    cart: [],
  };

  componentDidMount() {
    this.fetchCart();
  }

  fetchCart = () => {
    const cart = localStorage.getItem('cart');
    const products = JSON.parse(cart);
    this.setState({ cart: products || [] });
  };

  repeated = (r) => {
    const comparacao = !this[r.id] && (this[r.id] = true);
    return comparacao;
  };

  increaseClick = () => {

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
          : cart.filter((repetidos) => this.repeated(repetidos), Object.create(null))
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
                  <button type="button" data-testid="product-decrease-quantity">-</button>
                  <button type="button" data-testid="remove-product">Remove</button>
                </div>
              </div>
            ))}
      </div>
    );
  }
}
