import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import MenuBar from './Components/MenuBar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import NotFound from './Pages/404';

const App = ({ history }) => (
	<Router>
		<Container>
			<MenuBar />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/register' component={Register} />
				<Route component={NotFound} />
			</Switch>
		</Container>
	</Router>
);

export default App;
