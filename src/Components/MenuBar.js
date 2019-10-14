import React, { useState, useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../Context/Auth';

const MenuBar = props => {
	const { user, logout } = useContext(AuthContext);
	const pathname = window.location.pathname;
	const path = pathname === '/' ? 'home' : pathname.substr(1);

	const [activeItem, setActiveItem] = useState(path);

	const handleItemClick = (e, { name }) => setActiveItem(name);

	const menuBar = user ? (
		<div>
			<Menu pointing secondary color='teal' size='massive' stackable={true}>
				<Menu.Item
					name={user.firstname + ' ' + user.lastname}
					icon={user.usericon}
					active
					as={Link}
					to='/'
				/>
				<Menu.Menu position='right'>
					<Menu.Item name='logout' icon='sign out' onClick={logout} color='red' />
				</Menu.Menu>
			</Menu>
		</div>
	) : (
		<div>
			<Menu pointing secondary color='teal' size='massive' stackable={true}>
				<Menu.Item
					name='home'
					icon='home'
					active={activeItem === 'home'}
					onClick={handleItemClick}
					as={Link}
					to='/'
				/>
				<Menu.Menu position='right'>
					<Menu.Item
						name='login'
						icon='sign in'
						active={activeItem === 'login'}
						onClick={handleItemClick}
						as={Link}
						to='/login'
					/>
					<Menu.Item
						name='register'
						icon='user plus'
						active={activeItem === 'register'}
						onClick={handleItemClick}
						as={Link}
						to='/register'
					/>
				</Menu.Menu>
			</Menu>
		</div>
	);

	return menuBar;
};

export default MenuBar;
