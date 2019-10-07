import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import 'animate.css/animate.min.css';
import './App.css';

import NotFound from './Pages/404';
import MenuBar from './Components/MenuBar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';

const App = props => (
	<Router>
		<Switch>
			<Container>
				<MenuBar />
				<Route exact path='/' component={Home} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/register' component={Register} />
				<Route component={NotFound} />
			</Container>
		</Switch>
	</Router>
);

export default App;
