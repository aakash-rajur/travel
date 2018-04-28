import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './components/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {preload} from "./utils";
import {source} from './utils/dataSource';

preload(...source.map(({background}) => background));

ReactDOM.render(
	<Router>
		<App source={source}/>
	</Router>,
	document.getElementById('root'));
registerServiceWorker();
