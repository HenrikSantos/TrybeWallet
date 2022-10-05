import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    let total = 0;
    expenses.forEach((element) => {
      const arrExchangeRates = Object.values(element.exchangeRates);
      const cotation = arrExchangeRates.find((e) => e.code === element.currency).ask;
      total += Number(element.value) * cotation;
    });
    return (
      <div className="container-fluid bg-dark text-white">
        <div className="container mx-auto row py-2 bg-dark">
          <h3
            className="col mx-auto text-start"
            data-testid="email-field"
          >
            { email }
          </h3>
          <div className="col mx-auto text-end">
            <spam
              className="fs-5"
              data-testid="header-currency-field"
            >
              BRL&nbsp;
            </spam>
            <spam
              className="fs-5"
              data-testid="total-field"
            >
              {total.toFixed(2)}
            </spam>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  isEditing: state.wallet.isEditing,
});

export default connect(mapStateToProps)(Header);
