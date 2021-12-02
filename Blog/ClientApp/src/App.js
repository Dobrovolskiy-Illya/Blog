import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import  Register  from './components/Register';
import  SignIn  from './components/SignIn';
import { CurrentArticle } from './components/CurrentArticle';
import  CreateArticle  from './components/CreateArticle';
import Logout from './components/Logout';
import { Future } from './components/Future'
import { StartPage } from './components/StartPage';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route exact path='/' component={StartPage} />
            <Route path='/counter' component={Counter} />
            <Route path='/fetch-data' component={FetchData} />
            <Route path='/register' component={Register} />
            <Route path='/signin' component={SignIn} />
            <Route path='/currentArticle' component={CurrentArticle} />
            <Route path='/createArticle' component={CreateArticle} />
            <Route path='/logout' component={Logout} />
            <Route path='/future' component={Future} />
      </Layout>
    );
  }
}
