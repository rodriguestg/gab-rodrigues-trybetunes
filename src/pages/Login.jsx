import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nameCount: 0,
      nameInput: '',
      login: false,
    };
  }

  countInput = ({ target }) => {
    const numberName = target.value;
    this.setState({ nameCount: numberName.length, nameInput: numberName });
  }

  handleClick = () => {
    const { nameInput } = this.state;
    const { history } = this.props;
    this.setState({ login: true });
    const newUser = {
      name: nameInput,
      email: '',
      image: '',
      description: '',
    };
    createUser(newUser).then(() => {
      history.push('/search');
    });
  }

  render() {
    const { login, nameCount } = this.state;
    // const carregandoElement = (<span>Carregando...</span>);
    // const logado = false;
    return login ? <Loading /> : (
      <div data-testid="page-login">
        <form>
          <label htmlFor="nameInput">
            <input
              id="nameInput"
              data-testid="login-name-input"
              type="text"
              name="Escreva seu nome"
              onChange={ this.countInput }
            />
          </label>
          <button
            disabled={ nameCount <= 2 }
            data-testid="login-submit-button"
            type="button"
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
        { this.carregando }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
