import React from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from './Header';
import Loading from './Loading';
import MusicCardFav from './MusicCardFav';

class Favorites extends React.Component {
  state = {
    login: false,
    songs: [],
  }

  componentDidMount() {
    this.favoritesFunc();
  }

  favoritesCard = () => {
    const { songs } = this.state;
    // getFavoriteSongs().then((songFav) => {
    // console.log(songFav);
    // songs.map((album, index) => (
    //   <MusicCard
    //     key={ index }
    //     trackName={ album.trackName }
    //     previewUrl={ album.previewUrl }
    //     trackId={ album.trackId }
    //     album={ album }
    //     getFavoriteSongs={ getFavoriteSongs }
    //     favoritesCard={ this.favoritesFunc }
    //   />));
    // });
  }

  favoritesFunc2 = () => {
    this.setState({ login: true });
    this.favoritesFunc();
  }

  favoritesFunc = () => {
    this.setState({ login: true });
    getFavoriteSongs().then((songFav) => {
      this.setState({
        songs: songFav,
        login: false,
      });
    });
  }

  render() {
    const { login, songs } = this.state;
    return login ? <Loading /> : (
      <div data-testid="page-favorites">
        <Header />
        {
          songs.map((album, index) => (
            <MusicCardFav
              key={ index }
              trackName={ album.trackName }
              previewUrl={ album.previewUrl }
              trackId={ album.trackId }
              album={ album }
              getFavoriteSongs={ getFavoriteSongs }
            />
          ))
        }
      </div>
    );
  }
}

export default Favorites;
