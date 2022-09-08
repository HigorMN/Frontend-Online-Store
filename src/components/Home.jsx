import React, { Component } from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';

export default class Home extends Component {
  state = {
    search: '',
    cards: [],
  };

  onInputChange = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  };

  handleClick = async () => {
    const { search } = this.state;
    const products = await getProductsFromCategoryAndQuery(search);
    this.setState({ cards: products.results });
  };

  render() {
    const { search, cards } = this.state;
    const zero = 0;
    const string = 'Nenhum produto foi encontrado';

    return (
      <div>
        <form>
          <input
            type="text"
            name="search"
            id=""
            onChange={ this.onInputChange }
            value={ search }
            data-testid="query-input"
          />
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.handleClick }
          >
            🔎
          </button>
        </form>
        { search.length === zero && (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>)}

        <div>
          { cards.length === zero
            ? (<p>{string}</p>)
            : (
              <>
                { cards.map((product) => (
                  <div data-testid="product" key={ product.id }>
                    <p>{product.title}</p>
                    <p>{product.price}</p>
                    <img src={ product.thumbnail } alt={ product.title } />
                  </div>))}
              </>
            )}
        </div>
      </div>
    );
  }
}
