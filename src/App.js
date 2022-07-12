import React from 'react';
import { Route } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Page404 from './pages/Page404';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <>
        <Route exact to="/" component={ Login } />
        <Route to="/search" component={ Search } />
        <Route to="/album/:id" component={ Album } />
        <Route to="/favorites" component={ Favorites } />
        <Route to="/profile" component={ Profile } />
        <Route to="/profile/edit" component={ ProfileEdit } />
        <Route to="/*" component={ Page404 } />
      </>
    );
  }
}

export default App;
