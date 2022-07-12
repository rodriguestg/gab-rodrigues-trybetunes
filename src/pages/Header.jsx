import React from 'react';
import { NavLink } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    login: true,
    nameUser: '',
  }

  componentDidMount() {
    this.renderName();
  }

  renderName = async () => {
    getUser().then((user) => {
      this.setState({
        login: false,
        nameUser: user.name,
      });
    });
  }

  render() {
    const { login, nameUser } = this.state;
    return login ? <Loading /> : (
      <header data-testid="header-component" onLoad={ this.renderName }>
        <p data-testid="header-user-name">{ nameUser }</p>
        <NavLink data-testid="link-to-search" to="/search"><p>Pesquisar</p></NavLink>
        <NavLink data-testid="link-to-favorites" to="/favorites">
          <p>Músicas favoritas</p>
        </NavLink>
        <NavLink data-testid="link-to-profile" to="/profile"><p>Perfil</p></NavLink>
      </header>
    );
  }
}

export default Header;
