import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Cadastro from './Cadastro';
import Painel from './Painel';
import Favoritos from './Favoritos';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route exact path="/cadastro" component={Cadastro}/>
      <Route exact path="/painel" component={Painel}/>
      <Route exact path="/favoritos" component={Favoritos}/>
  </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();