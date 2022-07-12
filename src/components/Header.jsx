import React from 'react';
import Loading from '../pages/Loading';
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
      </header>
    );
  }
}

export default Header;
