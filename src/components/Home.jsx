import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
  getCategoryById,
} from '../services/api';
import Header from './Header';

export default class Home extends Component {
  state = {
    search: '',
    categoriesList: [],
    cards: [],
    clicou: false,
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
    this.setState({ cards: products.results, clicou: true });
  };

  categoryClick = async ({ target }) => {
    const { value } = target;
    const products = await getCategoryById(value);
    this.setState({ cards: products.results });
  };

  getCartLocal = () => JSON.parse(localStorage.getItem('cart'));

  addCardCLick = async ({ target }) => {
    const { value } = target;
    if (!JSON.parse(localStorage.getItem('cart'))) {
      localStorage.setItem('cart', JSON.stringify([]));
    }
    const favoritos = this.getCartLocal();
    localStorage.setItem('cart', JSON.stringify([...favoritos, value]));
  };

  render() {
    const { search, categoriesList, cards, clicou } = this.state;
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
                <label htmlFor={ e.id } data-testid="category">
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
              { (cards.length === zero && clicou)
                ? (<p>{string}</p>)
                : (
                  <div className="product">
                    { cards.map((product) => (
                      <>
                        <Link
                          to={ `/ProductDetail/${product.id}` }
                          key={ product.id }
                          data-testid="product-detail-link"
                        >
                          <div
                            data-testid="product"
                            className="products"
                          >
                            <p>{product.title}</p>
                            <img src={ product.thumbnail } alt={ product.title } />
                            <p>{product.price}</p>
                          </div>
                        </Link>
                        <button
                          type="button"
                          data-testid="product-add-to-cart"
                          value={ product.id }
                          onClick={ this.addCardCLick }
                        >
                          Adicionar ao Carrinho
                        </button>
                      </>
                    ))}
                  </div>
                )}
            </div>
          </div>
        </main>
      </>
    );
  }
}
