import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

const VALID_NUMBER = 3;
const CEP_VALID = 8;
const CPF_VALID = 11;

export default class FinishCart extends Component {
  state = {
    cart: [],
    fullName: '',
    email: '',
    phone: '',
    cep: '',
    cpf: '',
    address: '',
    payment: '',
    validate: false,
    redirectV: false,
  };

  componentDidMount() {
    this.fetchCart();
  }

  fetchCart = () => {
    const cartList = JSON.parse(localStorage.getItem('cart')) || [];
    this.setState({ cart: cartList });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleCLick = () => {
    const {
      fullName,
      email,
      phone,
      cep,
      cpf,
      address,
      payment,
    } = this.state;
    const vName = !fullName.length > VALID_NUMBER;
    const vEmail = !(email.includes('@') && email.length > VALID_NUMBER);
    const vPhone = !phone.length >= VALID_NUMBER;
    const vCep = !cep.length === CEP_VALID;
    const vCpf = !cpf.length === CPF_VALID;
    const vAddress = !address.length > VALID_NUMBER;
    const vPayment = payment.length === 0;

    if (vName || vEmail || vPhone || vCep || vCpf || vAddress || vPayment) {
      this.setState({ validate: true });
    } else {
      this.setState({ validate: false, redirectV: true });
      localStorage.removeItem('cart');
    }
  };

  render() {
    const {
      cart,
      fullName,
      email,
      phone,
      cep,
      cpf,
      address,
      payment,
      validate,
      redirectV } = this.state;
    return (
      <>
        <div>
          { redirectV && <Redirect to="/" /> }
          <h3>Revise os Produtos</h3>
          {cart.filter(function repeated(e) {
            const compare = !this[e.id] && (this[e.id] = true);
            return compare;
          }, Object.create(null)).map((e) => (
            <div key={ e.id }>
              <img src={ e.thumbnail } alt={ e.title } />
              <p>{e.title}</p>
              <p>
                <span>Valor total dos Produtos R$: </span>
                {cart.filter((f) => f.id === e.id)
                  .reduce((acc, corrent) => acc + Number(corrent.price), 0)}
              </p>
            </div>
          ))}
          <h4>Valor Total</h4>
          <p>{cart.reduce((acc, corrent) => acc + Number(corrent.price), 0)}</p>
        </div>
        <form>
          <p>PAGAMENTO</p>
          {validate && <p data-testid="error-msg">Campos inválidos</p>}
          <label htmlFor="fullName">
            Nome Completo:
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={ fullName }
              onChange={ this.handleChange }
              data-testid="checkout-fullname"
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              data-testid="checkout-email"
            />
          </label>
          <label htmlFor="cpf">
            CPF:
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={ cpf }
              onChange={ this.handleChange }
              data-testid="checkout-cpf"
            />
          </label>
          <label htmlFor="phone">
            Telefone:
            <input
              type="text"
              id="phone"
              name="phone"
              value={ phone }
              onChange={ this.handleChange }
              data-testid="checkout-phone"
            />
          </label>
          <label htmlFor="cep">
            CEP:
            <input
              type="text"
              id="cep"
              name="cep"
              value={ cep }
              onChange={ this.handleChange }
              data-testid="checkout-cep"
            />
          </label>
          <label htmlFor="address">
            Endereço:
            <input
              type="text"
              id="address"
              name="address"
              value={ address }
              onChange={ this.handleChange }
              data-testid="checkout-address"
            />
          </label>
          <div value={ payment }>
            <label htmlFor="ticket">
              <input
                type="radio"
                name="payment"
                id="ticket"
                value="ticket-payment"
                data-testid="ticket-payment"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="visa">
              <input
                type="radio"
                name="payment"
                id="visa"
                value="visa-payment"
                onChange={ this.handleChange }
                data-testid="visa-payment"
              />
            </label>
            <label htmlFor="master">
              <input
                type="radio"
                name="payment"
                id="master"
                value="master-payment"
                onChange={ this.handleChange }
                data-testid="master-payment"
              />
            </label>
            <label htmlFor="elo">
              <input
                type="radio"
                name="payment"
                id="elo"
                value="elo-payment"
                onChange={ this.handleChange }
                data-testid="elo-payment"
              />
            </label>
          </div>
          <button
            type="button"
            data-testid="checkout-btn"
            onClick={ this.handleCLick }
          >
            Comprar
          </button>
        </form>
      </>
    );
  }
}
