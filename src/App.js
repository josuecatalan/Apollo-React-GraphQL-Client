import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import { AuthProvider } from './Context/Auth';
import AuthRoute from './Utils/AuthRoute';

import MenuBar from './Components/MenuBar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import SinglePost from './Pages/SinglePost';
import NotFound from './Pages/404';

import 'semantic-ui-css/semantic.min.css';
import 'animate.css/animate.min.css';
import './App.css';

const App = props => (
	<AuthProvider>
		<Router>
			<Container>
				<MenuBar />
				<Switch>
					<Route exact path='/' component={Home} />
					<AuthRoute exact path='/login' component={Login} />
					<AuthRoute exact path='/register' component={Register} />
					<Route exact path='/dates/:dateId' component={SinglePost} />
					<Route component={NotFound} />
				</Switch>
			</Container>
		</Router>
	</AuthProvider>
);

export default App;
