import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    const { search, onInputChange } = this.props;
    return (
      <div>
        <form>
          <input
            type="text"
            name="search"
            id=""
            onChange={ onInputChange }
            value={ search }
          />
        </form>
        <nav>
          <Link to="/cart" data-testid="shopping-cart-button">
            Carrinho
          </Link>
        </nav>
      </div>
    );
  }
}

Header.propTypes = {
  search: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};
