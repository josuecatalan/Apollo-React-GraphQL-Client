import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const MenuBar = ({ history }) => {
	const pathname = window.location.pathname;
	const path = pathname === '/' ? 'home' : pathname.substr(1);

	const [activeItem, setActiveItem] = useState(path);

	const handleItemClick = (e, { name }) => setActiveItem(name);

	return (
		<div>
			<Menu pointing secondary color='green' size='large' stackable={true}>
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
};

export default MenuBar;
