import React from 'react';
import ReactDOM from 'react-dom';
import './config/index.css';
import Routes from './config/routes/routes';
import * as serviceWorker from './config/serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(<Routes />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
