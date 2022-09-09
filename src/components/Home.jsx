import React, { Component } from 'react';
import {
  getCategories, getProductsFromCategoryAndQuery } from '../services/api';
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
    const products = await getProductsFromCategoryAndQuery(null, search);
    this.setState({ cards: products.results });
  };

  categoryClick = async ({ target }) => {
    this.setState({ cards: [] });
    const { value } = target;
    const products = await getProductsFromCategoryAndQuery(value, null);
    console.log(products);
    this.setState({ cards: products.results });
  };

  render() {
    const { search, categoriesList, cards } = this.state;
    const zero = 0;
    const string = 'Nenhum produto foi encontrado';

    return (
      <>
        <Header
          search={ search }
          onInputChange={ this.onInputChange }
          onClick={ this.handleClick }
        />
        <main className="main">
          <section className="categories">
            <p>Categorias</p>
            {categoriesList.map((e) => (
              <div key={ e.id }>
                <label htmlFor="category" data-testid="category">
                  <input
                    value={ e.id }
                    type="radio"
                    name="category"
                    id={ e.id }
                    onClick={ this.categoryClick }
                  />
                  <span>{e.name}</span>
                </label>
              </div>
            ))}
          </section>
          <div>
            { search.length === zero && (
              <p data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>)}
            <div>
              { cards.length === zero
                ? (<p>{string}</p>)
                : (
                  <div className="product">
                    { cards.map((product) => (
                      <div data-testid="product" key={ product.id } className="products">
                        <p>{product.title}</p>
                        <img src={ product.thumbnail } alt={ product.title } />
                        <p>{product.price}</p>
                      </div>))}
                  </div>
                )}
            </div>
          </div>
        </main>
      </>
    );
  }
}
