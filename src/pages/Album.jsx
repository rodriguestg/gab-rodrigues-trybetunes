import PropTypes from 'prop-types';
import React from 'react';
import getMusics from '../services/musicsAPI';
import Header from './Header';
import Loading from './Loading';
import MusicCard from './MusicCard';

class Album extends React.Component {
  state = {
    nameArt: '',
    nameAlb: '',
    albumsList: [],
    login: true,
  }

  componentDidMount() {
    this.searchClick();
  }

  searchClick = async () => {
    const { match: { params: { id } } } = this.props;
    console.log(await getMusics(id));
    getMusics(id).then((album) => {
      const { artistName, collectionName } = album[0];
      this.setState({
        nameArt: artistName,
        nameAlb: collectionName,
        albumsList: [...album],
        login: false,
      });
    });
  }

  render() {
    // getMusics();
    const { albumsList, login, nameArt, nameAlb } = this.state;
    const { match: { params: { id } } } = this.props;
    return login ? <Loading /> : (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{ nameArt }</h1>
        <p data-testid="album-name">{ nameAlb }</p>
        {
          albumsList.splice(1).map((album, index) => (
            <MusicCard
              key={ index }
              trackName={ album.trackName }
              previewUrl={ album.previewUrl }
              trackId={ album.trackId }
              id={ id }
            />
          ))
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }).isRequired,
  }).isRequired,
};

export default Album;
