import React, { useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getProductById } from '../services/api';
import addCardClick from '../services/addCard';
import back from '../images/back.png';
import StarRatings from '../components/StarRatings';
import context from '../Context/myContext';
import StarRatingsFixed from '../components/StarRatingFixed';

const VALID_NUMBER = 3;

export default function Detail(props) {
  const [product, setProduct] = useState({});
  const [evaliationSave, setEvaliationSave] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [inputEmail, setInputEmail] = useState('');
  const [inputTextArea, setInputTextArea] = useState('');
  const [search, setSearch] = useState('');
  const [image, setImage] = useState('');
  const [validate, setValidate] = useState(false);
  const [redirectHeader, setRedirectHeader] = useState(false);
  const [cartContent, setCartContent] = useState(0);

  const { evaluation, setEvaluation } = useContext(context);

  const getProduct = useCallback(async () => {
    const { match: { params: { id } } } = props;
    const result = await getProductById(id);
    const img = result.pictures[0].url;
    setProduct(result);
    setImage(img);
    setAttributes(result.attributes);
  }, [props]);

  const getEvaluationLocal = useCallback(() => {
    const { match: { params: { id } } } = props;
    const getEvaluation = JSON.parse(localStorage.getItem(id));
    setEvaliationSave(getEvaluation || []);
  }, [props]);

  const getCartNumber = () => {
    const getLocal = JSON.parse(localStorage.getItem('cart')) || [];
    const count = getLocal.length;
    setCartContent(count);
  };

  useEffect(() => {
    const chama = () => {
      getProduct();
      getEvaluationLocal();
      getCartNumber();
    };
    chama();
  }, [getEvaluationLocal, getProduct]);

  const evaluationClick = (evaluation2) => {
    if (!JSON.parse(localStorage.getItem(product.id))) {
      localStorage.setItem(product.id, JSON.stringify([]));
    }
    const getEvaluation = JSON.parse(localStorage.getItem(product.id));
    localStorage.setItem(product.id, JSON.stringify([...getEvaluation, evaluation2]));
  };

  const validateClick = () => {
    const validEmail = !(inputEmail.includes('@') && inputEmail.length > VALID_NUMBER);
    const valid2 = !(inputTextArea.length >= VALID_NUMBER || Number(evaluation) > 0);

    if (validEmail || valid2) {
      setValidate(true);
    } else {
      evaluationClick({ email: inputEmail, text: inputTextArea, rating: evaluation });
      setInputEmail('');
      setInputTextArea('');
      setEvaluation(0);
      setValidate(false);
      getEvaluationLocal();
    }
  };

  const addCart = (products) => {
    addCardClick(products);
    getCartNumber();
  };

  const onInputChange = ({ target }) => {
    setSearch(target.value);
    setRedirectHeader(true);
  };

  return (
    <>
      <Header
        search={ search }
        onInputChange={ onInputChange }
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
              onClick={ () => addCart(product) }
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
              onChange={ ({ target: { value } }) => setInputEmail(value) }
              className="evaluation-email-input"
            />
          </label>
          <StarRatings evaluation={ evaluation } />
        </div>
        <div className="evaluation-message-container">
          <textarea
            name="inputTextArea"
            data-testid="product-detail-evaluation"
            value={ inputTextArea }
            placeholder="Mensagem (opcional)"
            onChange={ ({ target: { value } }) => setInputTextArea(value) }
          />
        </div>
        <div className="btn-evaluation">
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ validateClick }
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
            <StarRatingsFixed rating={ e.rating } />
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

Detail.propTypes = {
  match: PropTypes.shape(
    { params: PropTypes.shape({ id: PropTypes.string }) },
  ).isRequired,
};
