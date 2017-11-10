import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';
import './index.css';

import Homepage from './screens/Homepage';
import Login from './screens/Login';
import CreateAccount from './screens/CreateAccount';
import CreateTest from './screens/CreateTest';
import Results from './screens/Results';
import MonitorTest from './screens/MonitorTest';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
	<BrowserRouter>
		<div>
			<Route exact path = "/" render = {()=><Homepage />} />
			<Route exact path = "/login" render = {()=><Login url = '/' />} />
			<Route exact path = "/createAccount" render = {()=><CreateAccount />} />
			<Route exact path = "/createTest" render = {()=><CreateTest />} />
			<Route exact path = "/results" render = {()=><Results />} />
			<Route exact path = "/monitor" render = {()=><MonitorTest />} />
		</div>
	</BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
