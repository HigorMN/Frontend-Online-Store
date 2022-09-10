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
    const comparacao = !this[JSON.stringify(r)] && (this[JSON.stringify(r)] = true);
    return comparacao;
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
                <p data-testid="shopping-cart-product-quantity">
                  {`Quantidade: ${cart.filter((id) => id.id === product.id).length}`}
                </p>
              </div>
            ))}
      </div>
    );
  }
}
