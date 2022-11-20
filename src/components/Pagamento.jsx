import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Estados from './Estados';
import boleto from '../images/boleto.png';
import visa from '../images/visa.png';
import mastercard from '../images/mastercard.png';
import elo from '../images/elo.png';

const VALID_NUMBER = 3;
const CEP_VALID = 8;
const CPF_VALID = 11;

export default class Pagamento extends Component {
  state = {
    fullName: '',
    email: '',
    phone: '',
    cep: '',
    cpf: '',
    address: '',
    payment: '',
    complement: '',
    Numero: '',
    city: '',
    validate: false,
    redirectV: false,
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
      fullName,
      email,
      phone,
      cep,
      cpf,
      address, payment, validate, complement, Numero, city, redirectV } = this.state;
    return (
      <div className="checkout-form">
        <form className="pay-form">
          { redirectV && <Redirect to="/frontend-online-store/" /> }
          <h1 className="pay-info-title">Informações do comprador</h1>
          {validate && <p data-testid="error-msg">Campos inválidos</p>}
          <div className="inputs-pay-container">
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={ fullName }
              placeholder="Nome Completo"
              onChange={ this.handleChange }
              data-testid="checkout-fullname"
              className="input-info-pay"
            />
            <span className="margin-pay-input" />
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={ cpf }
              placeholder="CPF"
              onChange={ this.handleChange }
              data-testid="checkout-cpf"
              className="input-info-pay"
            />
          </div>
          <div className="inputs-pay-container">
            <input
              type="email"
              id="email"
              name="email"
              value={ email }
              placeholder="Email"
              onChange={ this.handleChange }
              data-testid="checkout-email"
              className="input-info-pay"
            />
            <span className="margin-pay-input" />
            <input
              type="text"
              id="phone"
              name="phone"
              value={ phone }
              placeholder="Telefone"
              onChange={ this.handleChange }
              data-testid="checkout-phone"
              className="input-info-pay"
            />
          </div>
          <div className="inputs-pay-container">
            <input
              type="text"
              id="cep"
              name="cep"
              value={ cep }
              placeholder="CEP"
              onChange={ this.handleChange }
              data-testid="checkout-cep"
              className="input-info-pay-2"
            />
            <span className="margin-pay-input" />
            <input
              type="text"
              id="address"
              name="address"
              value={ address }
              placeholder="Endereço"
              onChange={ this.handleChange }
              data-testid="checkout-address"
              className="input-info-pay-3"
            />
          </div>
          <div className="inputs-pay-container">
            <input
              type="text"
              id="complement"
              name="complement"
              value={ complement }
              placeholder="Complemento"
              onChange={ this.handleChange }
              className="input-info-pay-3"
            />
            <span className="margin-pay-input" />
            <input
              type="text"
              id="Numero"
              name="Numero"
              value={ Numero }
              placeholder="Numero"
              onChange={ this.handleChange }
              className="input-info-pay-2"
            />
          </div>
          <div className="inputs-pay-container">
            <input
              type="text"
              id="city"
              name="city"
              value={ city }
              placeholder="Cidade"
              onChange={ this.handleChange }
              className="input-info-pay-3"
            />
            <span className="margin-pay-input" />
            <Estados />
          </div>
          <h1 className="pay-info-title">Método de pagamento</h1>
          <div className="paiment-container">
            <label htmlFor="ticket" value={ payment } className="ticket">
              <h4 className="title-ticket">Boleto</h4>
              <input
                type="radio"
                name="payment"
                id="ticket"
                value="ticket-payment"
                data-testid="ticket-payment"
                onChange={ this.handleChange }
                className="input-pay"
              />
              <img src={ boleto } alt="imagem do boleto" />
            </label>
            <label htmlFor="visa" className="cart-label">
              <h4 className="title-ticket">Cartão de Crédito</h4>
              <input
                type="radio"
                name="payment"
                id="visa"
                value="visa-payment"
                onChange={ this.handleChange }
                data-testid="visa-payment"
                className="input-pay"
              />
              <img src={ visa } alt="imagem cartão visa" />
            </label>
            <label htmlFor="master" className="cart-label">
              <div className="margin-cart" />
              <input
                type="radio"
                name="payment"
                id="master"
                value="master-payment"
                onChange={ this.handleChange }
                data-testid="master-payment"
                className="input-pay"
              />
              <img src={ mastercard } alt="imagem cartão master" />
              <p className="master-title">mastercard</p>
            </label>
            <label htmlFor="elo" className="cart-label-elo">
              <div className="margin-cart-elo" />
              <input
                type="radio"
                name="payment"
                id="elo"
                value="elo-payment"
                onChange={ this.handleChange }
                data-testid="elo-payment"
                className="input-pay"
              />
              <img src={ elo } alt="imagem crtão elo" />
            </label>
          </div>
          <div className="btn-center">
            <button
              type="button"
              data-testid="checkout-btn"
              onClick={ this.handleCLick }
              className="checkout-btn"
            >
              Comprar
            </button>
          </div>
        </form>
      </div>
    );
  }
}
