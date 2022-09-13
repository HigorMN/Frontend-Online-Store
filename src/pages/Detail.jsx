import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getProductById } from '../services/api';
import addCardClick from '../services/addCard';

const NUMBER_ARRAY = 5;
const VALID_NUMBER = 3;

export default class Detail extends Component {
  state = {
    product: {},
    inputEmail: '',
    inputTextArea: '',
    evaluation: 0,
    evaliationSave: [],
    validate: false,
  };

  componentDidMount() {
    this.getProduct();
    this.getEvaluationLocal();
  }

  getEvaluationLocal = () => {
    const { match: { params: { id } } } = this.props;
    const getEvaluation = JSON.parse(localStorage.getItem(id));
    this.setState({ evaliationSave: getEvaluation || [] });
  };

  getProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const result = await getProductById(id);
    this.setState({ product: result });
  };

  validateClick = () => {
    const { inputEmail, inputTextArea, evaluation } = this.state;
    const validEmail = !(inputEmail.includes('@') && inputEmail.length > VALID_NUMBER);
    const valid2 = !(inputTextArea.length >= VALID_NUMBER || Number(evaluation) > 0);

    if (validEmail || valid2) {
      this.setState({ validate: true });
    } else {
      this.evaluationClick({
        email: inputEmail,
        text: inputTextArea,
        rating: evaluation });
      this.setState({
        inputEmail: '',
        inputTextArea: '',
        evaluation: 0,
        validate: false,
      });
      this.getEvaluationLocal();
    }
  };

  evaluationClick = (evaluation) => {
    const { product } = this.state;
    if (!JSON.parse(localStorage.getItem(product.id))) {
      localStorage.setItem(product.id, JSON.stringify([]));
    }
    const getEvaluation = JSON.parse(localStorage.getItem(product.id));
    localStorage.setItem(product.id, JSON.stringify([...getEvaluation, evaluation]));
  };

  handleInputChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const {
      product,
      inputEmail,
      inputTextArea, evaluation, validate, evaliationSave } = this.state;
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
        <form action="">
          <p>Avaliações</p>
          {validate && <p data-testid="error-msg">Campos inválidos</p>}
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
          <div>
            {[...Array(NUMBER_ARRAY)].map((item, index) => {
              const rating = index + 1;
              return (
                <label htmlFor={ rating } key={ rating } value={ evaluation }>
                  <input
                    type="radio"
                    name="evaluation"
                    id={ rating }
                    value={ rating }
                    data-testid={ `${rating}-rating` }
                    onChange={ this.handleInputChange }
                  />
                </label>
              );
            })}
          </div>
          <textarea
            name="inputTextArea"
            id=""
            data-testid="product-detail-evaluation"
            value={ inputTextArea }
            onChange={ this.handleInputChange }
          />
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.validateClick }
          >
            Avaliar
          </button>
        </form>
        {evaliationSave.map((e, index) => (
          <div key={ index }>
            <p data-testid="review-card-email">{e.email}</p>
            <p data-testid="review-card-rating">{e.rating}</p>
            <p data-testid="review-card-evaluation">{e.text}</p>
          </div>
        ))}
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
