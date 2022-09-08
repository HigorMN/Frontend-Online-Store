import React, { Component } from 'react';
import { getCategories } from '../services/api';

export default class Home extends Component {
  state = {
    search: '',
    categoriesList: [],
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

  render() {
    const { search, categoriesList } = this.state;
    const zero = 0;

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
          <form>
            <input
              type="text"
              name="search"
              id=""
              onChange={ this.onInputChange }
              value={ search }
            />
          </form>
          { search.length === zero && (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>)}
        </div>
      </main>
    );
  }
}
