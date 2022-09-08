import React, { Component } from 'react';

export default class Search extends Component {
  state = {
    search: '',
  };

  onInputChange = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  };

  // searchEmpty = () => {

  // };

  render() {
    const { search } = this.state;
    const zero = 0;

    return (
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
    );
  }
}
