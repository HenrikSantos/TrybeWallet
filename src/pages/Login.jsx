import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { userlogin } from '../redux/actions';
import './Login.css';

const MIN_PASSWORD = 6;

class Login extends React.Component {
  state = {
    email: '',
    senha: '',
    isBtnDisabled: true,
  };

  validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  verify = () => {
    const { email, senha } = this.state;
    this.setState({
      isBtnDisabled: !(this.validateEmail(email) && senha.length >= MIN_PASSWORD),
    });
  };

  handleChanges = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.verify);
  };

  login = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(userlogin(email));
    history.push('/carteira');
  };

  render() {
    const { email, senha, isBtnDisabled } = this.state;
    return (
      <div className="vertical-center mx-auto">
        <div className="container mx-auto row">
          <h1 className="col-12 text-center mb-4">TrybeWallet</h1>
          <input
            className="col-12 col-md-7 mx-auto mt-2"
            data-testid="email-input"
            placeholder="Email"
            type="email"
            name="email"
            id="email"
            value={ email }
            onChange={ this.handleChanges }
          />
          <input
            className="col-12 col-md-7 mx-auto mt-2"
            data-testid="password-input"
            type="password"
            placeholder="Senha"
            name="senha"
            id="senha"
            value={ senha }
            onChange={ this.handleChanges }
          />
          <button
            className="col-12 col-md-7 mx-auto mt-2 btn btn-primary"
            type="button"
            disabled={ isBtnDisabled }
            onClick={ this.login }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
