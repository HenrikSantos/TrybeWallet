import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateExpense, editTable } from '../redux/actions';
import './Table.css';

class Table extends Component {
  deleteExpense = (elementToDelete) => {
    const { expenses, dispatch } = this.props;
    const newArr = expenses.filter((element) => element.id !== elementToDelete.id);
    dispatch(updateExpense(newArr));
  };

  editExpense = (elementToEdit) => {
    const { dispatch } = this.props;
    dispatch(editTable(elementToEdit.id));
  };

  render() {
    const { expenses, isEditing } = this.props;
    return (
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th data-testid="table-valor">Valor</th>
            <th data-testid="table-moeda">Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses[0] && expenses.map((element) => {
            const arrExchangeRates = Object.values(element.exchangeRates);
            const item = arrExchangeRates
              .find((e) => e.code === element.currency);
            return (
              <tr key={ element.id }>
                <td>{element.description}</td>
                <td>{element.tag}</td>
                <td>{element.method}</td>
                <td>
                  {Number(element.value).toFixed(2)}
                </td>
                <td>{item.name}</td>
                <td>
                  R$
                  {Number(item.ask).toFixed(2)}
                </td>
                <td>
                  R$
                  {Number(item.ask * element.value).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  { isEditing ? (
                    <p>EDITANDO</p>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={ () => {
                          this.editExpense(element);
                        } }
                        data-testid="edit-btn"
                        className="btn btn-primary mx-1"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        data-testid="delete-btn"
                        onClick={ () => {
                          this.deleteExpense(element);
                        } }
                        className="btn btn-danger"
                      >
                        Excluir
                      </button>
                    </>
                  ) }
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.shape({
    map: PropTypes.func,
  }),
  isEditing: PropTypes.bool,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  isEditing: state.wallet.isEditing,
});

export default connect(mapStateToProps)(Table);
