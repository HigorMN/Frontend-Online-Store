import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
  getCategoryById,
} from '../services/api';
import addCardClick from '../services/addCard';
import Header from './Header';
import fretegratis from '../images/fretegratis.png';

export default class Home extends Component {
  state = {
    search: '',
    categoriesList: [],
    cards: [],
    clicou: false,
    cartContent: 0,
  };

  componentDidMount() {
    this.fetchAPIgetCategories();
    this.getCartNumber();
  }

  getCartNumber = () => {
    const getLocal = JSON.parse(localStorage.getItem('cart')) || [];
    const count = getLocal.length;
    this.setState({ cartContent: count });
  };

  onInputChange = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  };

  addCart = (product) => {
    addCardClick(product);
    this.getCartNumber();
  };

  fetchAPIgetCategories = async () => {
    const categories = await getCategories();
    this.setState({ categoriesList: categories });
  };

  handleClick = async () => {
    const { search } = this.state;
    const products = await getProductsFromCategoryAndQuery(null, search);
    this.setState({ cards: products.results || [], clicou: true });
  };

  categoryClick = async ({ target }) => {
    const { value } = target;
    const products = await getCategoryById(value);
    this.setState({ cards: products.results || [] });
  };

  render() {
    const { search, categoriesList, cards, clicou, cartContent } = this.state;
    const zero = 0;
    const string = 'Nenhum produto foi encontrado';

    return (
      <>
        <Header
          search={ search }
          onInputChange={ this.onInputChange }
          onClick={ this.handleClick }
          cartContent={ cartContent }
          redirectHeader={ false }
        />
        <main className="main">
          <section className="categories">
            <h1>Categorias</h1>
            {categoriesList.map((e) => (
              <div key={ e.id } className="input-categories">
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
          <div className="products-container">
            { (cards.length === zero && search.length === zero) && (
              <div className="text-center">
                <h1>VOCÊ AINDA NÃO</h1>
                <h1>REALIZOU UMA BUSCA</h1>
                <p data-testid="home-initial-message">
                  Digite algum termo de pesquisa ou escolha uma categoria.
                </p>
              </div>)}
            <div>
              { (cards.length === zero && clicou)
                ? (
                  <div className="text-center">
                    <h1>{string}</h1>
                    <p>Digite outro termo de pesquisa ou escolha uma categoria</p>
                  </div>)
                : (
                  <div className="product">
                    { cards.map((product) => (
                      <div className="products" key={ product.id }>
                        <Link
                          to={ `/ProductDetail/${product.id}` }
                          data-testid="product-detail-link"
                          className="link"
                        >
                          <div
                            data-testid="product"
                          >
                            {product.shipping.free_shipping && (
                              <img
                                src={ fretegratis }
                                alt="frete gratis"
                                data-testid="free-shipping"
                                className="fretegratis"
                              />)}
                            <img src={ product.thumbnail } alt={ product.title } />
                            <div className="text-products">
                              <h3>{product.title}</h3>
                            </div>
                            <div className="products-price">
                              <p>R$</p>
                              <h1>{product.price}</h1>
                            </div>
                          </div>
                        </Link>
                        <button
                          type="button"
                          data-testid="product-add-to-cart"
                          onClick={ () => this.addCart(product) }
                          className="button-addCard"
                        >
                          Adicionar ao Carrinho
                        </button>
                      </div>
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
