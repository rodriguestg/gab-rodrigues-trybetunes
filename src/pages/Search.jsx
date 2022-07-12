import React from 'react';
import PropTypes from 'prop-types';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from './Header';
import Loading from './Loading';
import { Link } from 'react-router-dom';

class Search extends React.Component {
  state = {
    nameInput: 0,
    login: false,
    contentInput: '',
    albums: [],
  }

  testBtn = ({ target }) => {
    const numberName = target.value;
    this.setState({ nameInput: numberName.length, contentInput: numberName });
  }

  searchClick = () => {
    const { contentInput } = this.state;
    // console.log(await searchAlbumsAPI(contentInput));
    this.setState({ login: true });
    searchAlbumsAPI(contentInput).then((album) => {
      // history.push(`/album/${contentInput}`);
      this.setState({
        login: false,
        albums: [...album],
      });
    });
  }

  render() {
    const { nameInput, login, contentInput, albums } = this.state;
    const nenhumAlbum = (<p>Nenhum álbum foi encontrado</p>);
    const albumRender = (
      <section>
        <p>{ `Resultado de álbuns de: ${contentInput}` }</p>
        { albums.map((album) => (
          <div key={ album.artistId }>
            <img src={ album.artworkUrl100 } alt={ album.artistName } />
            <h1>{ album.artistName }</h1>
            <p>{ album.collectionName }</p>
            <Link
              data-testid={ `link-to-album-${album.collectionId}` }
              to={ `/album/${album.collectionId}` }
            />
          </div>
        ))}
      </section>
    );
    return login ? <Loading /> : (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="band">
            <input
              data-testid="search-artist-input"
              type="text"
              name="Nome da Banda"
              id="band"
              onChange={ this.testBtn }
            />
          </label>
          <button
            type="button"
            disabled={ nameInput < 2 }
            onClick={ this.searchClick }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
        { albums.length > 0 ? albumRender : nenhumAlbum }
      </div>

    );
  }
}

Search.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Search;
