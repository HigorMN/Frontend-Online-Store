import React, { Component } from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import Header from './Header';

export default class Home extends Component {
  state = {
    search: '',
    categoriesList: [],
    cards: [],
  };

  componentDidMount() {
    this.fetchAPIgetCategories();
  }

  onInputChange = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  };

  fetchAPIgetCategories = async () => {
    const categories = await getCategories();
    this.setState({ categoriesList: categories });
  };

  handleClick = async () => {
    const { search } = this.state;
    const products = await getProductsFromCategoryAndQuery(search);
    this.setState({ cards: products.results });
  };

  render() {
    const { search, categoriesList, cards } = this.state;
    const zero = 0;
    const string = 'Nenhum produto foi encontrado';

    return (
      <main className="main">
        <section className="categories">
          <p>Categorias</p>
          {categoriesList.map((e) => (
            <div key={ e.id }>
              <label htmlFor="category" data-testid="category">
                <input type="radio" name="category" id={ e.id } value={ e.id } />
                <span>{e.name}</span>
              </label>
            </div>
          ))}
        </section>
        <div>
          <Header
            search={ search }
            onInputChange={ this.onInputChange }
            onClick={ this.handleClick }
          />
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
      </main>
    );
  }
}
