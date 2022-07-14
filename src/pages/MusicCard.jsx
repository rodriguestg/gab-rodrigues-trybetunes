import PropTypes from 'prop-types';
import React from 'react';
import Loading from './Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    login: false,
    check: false,
  }

  componentDidMount() {
    const { getFavoriteSongs, trackId } = this.props;
    getFavoriteSongs().then((songs) => {
      const songVar = songs.find((song) => song.trackId === trackId);
      if (songVar) {
        return this.setState({
          check: true,
        });
      }
      if (!songVar) {
        return this.setState({
          check: false,
        });
      }
    });
  }

  add = ({ target }) => {
    this.setState({ login: true });
    const { album } = this.props;
    // console.log(await getMusics(id));
    if (target.checked) {
      addSong(album).then(() => {
        this.setState({
          login: false,
          check: true,
        });
      });
    }
    if (!target.checked) {
      removeSong(album).then(() => {
        this.setState({
          login: false,
          check: false,
        });
      });
    }
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { login, check } = this.state;
    return login ? <Loading /> : (
      <div>
        <p>{ trackName }</p>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <label htmlFor="favorites">
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            id="favorites"
            checked={ check }
            onChange={ this.add }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  // id: PropTypes.number.isRequired,
  getFavoriteSongs: PropTypes.func.isRequired,
  album: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};

export default MusicCard;
