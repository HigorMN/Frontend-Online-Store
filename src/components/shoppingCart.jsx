import { Component } from 'react';
import { getProductById } from '../services/api';

export default class shoppingCart extends Component {
  state = {
    cart: [],
  };

  componentDidMount() {
    this.fetchCart();
  }

  fetchCart = async () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const fetchApi = await Promise.all(cart.map(async (e) => {
      const produto = await getProductById(e);
      return produto;
    }));
    this.setState({ cart: fetchApi });
  };

  render() {
    const { cart } = this.state;
    return (
      <div>
        { cart.length === 0
          ? (
            <h1 data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </h1>)
          : (
            <div>
              {cart.map((product) => (
                <div key={ product.id }>
                  <p data-testid="shopping-cart-product-name">{product.title}</p>
                  <img src={ product.thumbnail } alt={ product.title } />
                  <p>{product.price}</p>
                </div>
              ))}
              <p data-testid="shopping-cart-product-quantity">{cart.length}</p>
            </div>)}
      </div>
    );
  }
}
