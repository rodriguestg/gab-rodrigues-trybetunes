import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from './Header';
import Loading from './Loading';

class Profile extends React.Component {
  state = {
    login: false,
    name: '',
    email: '',
    description: '',
    img: '',
  }

  componentDidMount() {
    getUser().then((user) => {
      this.setState({
        name: user.name,
        email: user.email,
        description: user.description,
        img: user.image,
        login: false,
      });
    });
  }

  render() {
    const { login, name, email, description, img } = this.state;
    return login ? <Loading /> : (
      <div data-testid="page-profile">
        <Header />
        <h1>{ name }</h1>
        <p>{ email }</p>
        <p>{ description }</p>
        <img data-testid="profile-image" src={ img } alt={ name } />
        <Link to="/profile/edit">
          <p>Editar perfil</p>
        </Link>
      </div>
    );
  }
}

export default Profile;
