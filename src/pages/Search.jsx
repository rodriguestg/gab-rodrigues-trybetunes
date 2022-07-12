import React from 'react';
import Header from './Header';

class Search extends React.Component {
  state = {
    nameInput: 0,
  }

  testBtn = ({ target }) => {
    const numberName = target.value;
    this.setState({ nameInput: numberName.length });
  }

  render() {
    const { nameInput } = this.state;
    return (
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
            // onClick={}
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
