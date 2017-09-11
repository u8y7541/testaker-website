import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';
import './index.css';
import Homepage from './Homepage';
import Login from './Login';
import CreateTest from './CreateTest';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
	<BrowserRouter>
		<div>
			<Route exact path = "/" render = {()=><Homepage />} />
			<Route exact path = "/login" render = {()=><Login />} />
			<Route exact path = "/createTest" render = {()=><CreateTest />} />
		</div>
	</BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
