import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import searchIMG from '../images/search.png';
import cart from '../images/cart.png';
import logo from '../images/logo.png';

export default class Header extends React.Component {
  render() {
    const { search, onInputChange, onClick, cartContent } = this.props;
    return (
      <header className="header">
        <form>
          <input
            type="text"
            name="search"
            id=""
            onChange={ onInputChange }
            value={ search }
            placeholder="Digite o que você busca"
            data-testid="query-input"
            className="input-search"
          />
          <button
            type="button"
            data-testid="query-button"
            onClick={ onClick }
            className="button-header"
          >
            <img src={ searchIMG } alt="btn" />
          </button>
        </form>
        <div className="logo-header">
          <img src={ logo } alt="logo" />
        </div>
        <div />
        <nav className="cart-header">
          <Link to="/cart" data-testid="shopping-cart-button">
            <img
              width="50"
              height="50"
              src={ cart }
              alt="Cart-img"
            />
          </Link>
          <p data-testid="shopping-cart-size">{cartContent}</p>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  search: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  cartContent: PropTypes.number.isRequired,
};
