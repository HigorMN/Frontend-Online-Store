import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getProductById } from '../services/api';
import addCardClick from '../services/addCard';

const minCharacters = 3;

export default class Detail extends Component {
  state = {
    product: {},
    inputEmail: '',
    inputTextArea: '',
    inputRadio: '',
    validate: false,
    isChecked: false,
  };

  componentDidMount() {
    this.getProduct();
  }

  getProduct = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const result = await getProductById(id);
    this.setState({ product: result });
  };

  validateClick = () => {
    const { inputEmail, inputTextArea } = this.state;
    const validateInputEmail = inputEmail.includes('@')
    && inputEmail.length > minCharacters;
    const validateTextArea = inputTextArea.length > minCharacters;
    const validateInputRadio = isChecked;
    const valid = validateInputEmail && validateTextArea && validateInputRadio;
    this.setState({ validate: valid });
  };

  handleInputChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
    if (checked === true) {
      this.setState({ isChecked: checked });
    }
  };

  render() {
    const { product, inputEmail, inputTextArea, isChecked } = this.state;

    return (
      <>
        <Header search="" onInputChange={ () => {} } onClick={ () => {} } />
        <div>
          <p data-testid="product-detail-name">{product.title}</p>
          <img
            data-testid="product-detail-image"
            src={ product.thumbnail }
            alt={ product.title }
          />
          <p data-testid="product-detail-price">{product.price}</p>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ () => addCardClick(product) }
          >
            Adicionar ao Carrinho
          </button>
        </div>
        <div>
          <form action="">
            <p>Avaliações</p>
            <label htmlFor="email">
              <input
                type="email"
                data-testid="product-detail-email"
                name="inputEmail"
                value={ inputEmail }
                id="email"
                onChange={ this.handleInputChange }
              />
            </label>
            <label htmlFor="inputRadio">
              <input
                type="radio"
                name="inputRadio"
                value={ 1 }
                checked={ isChecked }
                data-testid="${1}-rating"
                onChange={ this.handleInputChange }
              />
              <input
                type="radio"
                name="inputRadio"
                value={ 2 }
                checked={ isChecked }
                data-testid="${2}-rating"
                onChange={ this.handleInputChange }
              />
              <input
                type="radio"
                name="inputRadio"
                value={ 3 }
                checked={ isChecked }
                data-testid="${3}-rating"
                onChange={ this.handleInputChange }
              />
              <input
                type="radio"
                name="inputRadio"
                value={ 4 }
                checked={ isChecked }
                data-testid="${4}-rating"
                onChange={ this.handleInputChange }
              />
              <input
                type="radio"
                name="inputRadio"
                value={ 5 }
                checked={ isChecked }
                data-testid="${5}-rating"
                onChange={ this.handleInputChange }
              />
            </label>
            <textarea
              name="inputTextArea"
              id=""
              data-testid="product-detail-evaluation"
              value={ inputTextArea }
              onChange={ this.handleInputChange }
            />
            <button
              type="submit"
              data-testid="submit-review-btn"
              onClick={ this.validateClick }
            >
              Avaliar
            </button>
          </form>
        </div>
      </>
    );
  }
}

Detail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
