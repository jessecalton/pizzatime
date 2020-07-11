import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import Checkout from './components/Checkout';
import * as serviceWorker from './serviceWorker';

const app = (
  <BrowserRouter>
    <Switch>
      <Route path='/checkout' component={Checkout} />
      <Route path='/' exact component={App} />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
