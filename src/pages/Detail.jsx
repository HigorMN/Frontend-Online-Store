import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getProductById } from '../services/api';
import addCardClick from '../services/addCard';
import back from '../images/back.png';

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
    cartContent: 0,
    redirectHeader: false,
    search: '',
    image: '',
    attributes: [],
  };

  componentDidMount() {
    this.getProduct();
    this.getEvaluationLocal();
    this.getCartNumber();
  }

  getEvaluationLocal = () => {
    const { match: { params: { id } } } = this.props;
    const getEvaluation = JSON.parse(localStorage.getItem(id));
    this.setState({ evaliationSave: getEvaluation || [] });
  };

  getProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const result = await getProductById(id);
    const img = result.pictures[0].url;
    this.setState({ product: result, image: img, attributes: result.attributes });
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

  getCartNumber = () => {
    const getLocal = JSON.parse(localStorage.getItem('cart')) || [];
    const count = getLocal.length;
    this.setState({ cartContent: count });
  };

  addCart = (product) => {
    addCardClick(product);
    this.getCartNumber();
  };

  onInputChange = ({ target }) => {
    this.setState({ search: target.value, redirectHeader: true });
  };

  render() {
    const {
      product,
      inputEmail,
      inputTextArea,
      evaluation,
      validate,
      evaliationSave,
      cartContent,
      redirectHeader,
      image, attributes, search } = this.state;
    return (
      <>
        <Header
          search={ search }
          onInputChange={ this.onInputChange }
          onClick={ () => {} }
          cartContent={ cartContent }
          redirectHeader={ redirectHeader }
        />
        <Link to="/frontend-online-store/" className="back">
          <img src={ back } alt="Voltar" />
          <p>Voltar</p>
        </Link>
        <section className="container-product-detail">
          <div className="img-product-detail">
            <p data-testid="product-detail-name">{product.title}</p>
            <img
              data-testid="product-detail-image"
              src={ image }
              alt={ product.title }
            />
          </div>
          <div className="margin" />
          <div className="esp-product-detail">
            <h1>Especificações técnicas</h1>
            <ul className="detail-ul">
              {attributes.map((e, index) => (
                <li key={ index }>
                  <p>{`${e.name}:`}</p>
                  <p>{e.values[0].name}</p>
                </li>
              ))}
            </ul>
            <div className="valor-detail">
              <h4>R$</h4>
              <p data-testid="product-detail-price" className="p">
                {`${product.price}`}
              </p>
              <button
                type="button"
                data-testid="product-detail-add-to-cart"
                className="button-addCard-detail"
                onClick={ () => this.addCart(product) }
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </section>
        <div className="evaluation-container">
          <h1 className="evaluation-title">Avaliações</h1>
          {validate && <p data-testid="error-msg">Campos inválidos</p>}
          <div className="evaluation-inputs">
            <label htmlFor="email">
              <input
                type="email"
                data-testid="product-detail-email"
                name="inputEmail"
                value={ inputEmail }
                id="email"
                placeholder="Email"
                onChange={ this.handleInputChange }
                className="evaluation-email-input"
              />
            </label>
            {[...Array(NUMBER_ARRAY)].map((item, index) => {
              const rating = index + 1;
              return (
                <label
                  htmlFor={ rating }
                  key={ rating }
                  value={ evaluation }
                  className="evaluation-label-rating"
                >
                  <i />
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
          <div className="evaluation-message-container">
            <textarea
              name="inputTextArea"
              id=""
              data-testid="product-detail-evaluation"
              value={ inputTextArea }
              placeholder="Mensagem (opcional)"
              onChange={ this.handleInputChange }
            />
          </div>
          <div className="btn-evaluation">
            <button
              type="button"
              data-testid="submit-review-btn"
              onClick={ this.validateClick }
              className="button-addCard-detail"
            >
              Avaliar
            </button>
          </div>
        </div>
        {evaliationSave.map((e, index) => (
          <div key={ index } className="evaluations">
            <div className="evaluations-email-rating">
              <p
                data-testid="review-card-email"
                className="evaluations-email"
              >
                {e.email}
              </p>
              <p
                data-testid="review-card-rating"
                className="evaluations-rating"
              >
                {e.rating}
              </p>
            </div>
            <p
              data-testid="review-card-evaluation"
              className="evaluations-text"
            >
              {e.text}
            </p>
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
