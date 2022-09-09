import React, { Component } from 'react';
import Header from './Header';

export default class Home extends Component {
  state = {
    search: '',
  };

  // searchEmpty = () => {

  // };
  onInputChange = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  };

  render() {
    const { search } = this.state;
    const zero = 0;

    return (
      <div>
        <Header search={ search } onInputChange={ this.onInputChange } />

        <div>
          {search.length === zero && (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )}
        </div>
      </div>
    );
  }
}
