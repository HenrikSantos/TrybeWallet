import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAPI, saveExpense, updateExpense, endEditing } from '../redux/actions';

const ALIMENTACAO = 'Alimentação';
class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: ALIMENTACAO,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
  }

  handleChanges = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.verify);
  };

  saveExpense = () => {
    const { dispatch } = this.props;
    const totalData = { ...this.state };
    dispatch(saveExpense(totalData));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTACAO,
    });
  };

  editExpense = () => {
    const { idToEdit, expenses, dispatch } = this.props;
    const index = expenses.findIndex((element) => element.id === idToEdit);
    const oldExchangeRates = {
      exchangeRates: expenses[index].exchangeRates, id: expenses[index].id };
    expenses[index] = { ...this.state, ...oldExchangeRates };
    dispatch(updateExpense(expenses));
    dispatch(endEditing());
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTACAO,
    });
  };

  render() {
    const { currencies, isEditing } = this.props;
    const { value, description } = this.state;

    return (
      <form className="container mx-auto row my-3 gap-1">
        <input
          className="col-2"
          type="number"
          name="value"
          id="value"
          placeholder="$ 0.00"
          value={ value }
          data-testid="value-input"
          onChange={ this.handleChanges }
        />
        <input
          className="col-2"
          type="text"
          name="description"
          id="description"
          placeholder="descrição"
          value={ description }
          data-testid="description-input"
          onChange={ this.handleChanges }
        />
        <select
          className="col-1"
          onChange={ this.handleChanges }
          data-testid="currency-input"
          name="currency"
          id="currency"
        >
          {currencies.map((element) => (
            <option key={ element } value={ element }>{element}</option>
          ))}
        </select>
        <select
          className="col-2"
          onChange={ this.handleChanges }
          data-testid="method-input"
          name="method"
          id="method"
        >
          <option value="Dinheiro" defaultValue="selected">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          className="col-2"
          onChange={ this.handleChanges }
          data-testid="tag-input"
          name="tag"
          id="tag"
        >
          <option value="Alimentação" defaultValue="selected">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        { isEditing ? (
          <button
            className="col-2"
            type="button"
            onClick={ this.editExpense }
          >
            Editar despesa
          </button>
        ) : (
          <button
            className="col-2"
            type="button"
            onClick={ this.saveExpense }
          >
            Adicionar despesa
          </button>
        )}
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.shape({
    map: PropTypes.func,
  }),
  dispatch: PropTypes.func,
  idToEdit: PropTypes.number,
  expenses: PropTypes.shape({
    findIndex: PropTypes.func,
  }),
  isEditing: PropTypes.bool,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  cotation: state.wallet.cotation,
  isEditing: state.wallet.isEditing,
  idToEdit: state.wallet.idToEdit,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
