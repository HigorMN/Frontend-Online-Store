import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    const { search, onInputChange, onClick } = this.props;
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
          />
          <button
            type="button"
            data-testid="query-button"
            onClick={ onClick }
          >
            🔎
          </button>
        </form>
        <div>
          <h1>Front-end</h1>
          <p>online store</p>
        </div>
        <nav>
          <Link to="/cart" data-testid="shopping-cart-button">
            <img
              width="50"
              height="50"
              src="https://images-ext-1.discordapp.net/external/W35H3hl6dwLex3iaIdbhQbJCV9dqo1WjIBWwP_8CIeM/https/static.vecteezy.com/system/resources/previews/004/999/463/original/shopping-cart-icon-illustration-free-vector.jpg?width=793&height=660"
              alt="Cart-img"
            />
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
};
