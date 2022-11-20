import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import searchIMG from '../images/search.png';
import cart from '../images/cart.png';
import logo from '../images/logo.png';

export default class Header extends React.Component {
  render() {
    const { search, onInputChange, onClick, cartContent, redirectHeader } = this.props;
    return (
      <header className="header">
        {redirectHeader && <Redirect to="/" />}
        <div className="search-header">
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
        </div>
        <div className="logo-header">
          <img src={ logo } alt="logo" />
        </div>
        <nav className="cart-header">
          <Link
            to="/frontend-online-store/cart"
            data-testid="shopping-cart-button"
            className="header-link"
          >
            <img
              width="50"
              height="50"
              src={ cart }
              alt="Cart-img"
            />
            <div className="counter-header">
              <p data-testid="shopping-cart-size">{cartContent}</p>
            </div>
          </Link>
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
  redirectHeader: PropTypes.bool.isRequired,
};
