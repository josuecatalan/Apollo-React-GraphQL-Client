import React from 'react';
import { Dropdown, Button } from 'semantic-ui-react';

import DeleteButton from './DeleteButton';
import MyPopup from './MyPopup';

const ActionMenu = ({ user, dateId, username, commentId, callback }) => {
	return (
		<>
			<MyPopup content='Action Menu' invert={true} caller='hover' side='left center'>
				<Dropdown
					className='ui small compact icon right floated button'
					icon='caret down'
					closeOnBlur={true}
					floating
				>
					<Dropdown.Menu>
						<Button.Group vertical labeled icon>
							{user && user.username === username && <Button content='Edit' icon='pencil' />}
							{user && user.username === username && (
								<DeleteButton
									dateId={dateId}
									user={user}
									username={username}
									commentId={commentId ? commentId : ''}
									callback={callback ? callback : ''}
								/>
							)}
							{user && user.username !== username && <Button content='Report' icon='flag' />}
						</Button.Group>
					</Dropdown.Menu>
				</Dropdown>
			</MyPopup>
		</>
	);
};

export default ActionMenu;
