import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {preload} from "./utils";
import {source} from './utils/dataSource';

preload(...source.map(({background}) => background));

ReactDOM.render(<App source={source}/>, document.getElementById('root'));
registerServiceWorker();
