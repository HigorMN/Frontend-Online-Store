import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getProductById } from '../services/api';
import addCardClick from '../services/addCard';

export default class Detail extends Component {
  state = {
    product: {},
  };

  componentDidMount() {
    this.getProduct();
  }

  getProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const result = await getProductById(id);
    this.setState({ product: result });
  };

  render() {
    const { product } = this.state;

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
      </>
    );
  }
}

Detail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string }),
  }).isRequired,
};
