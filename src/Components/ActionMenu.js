import React from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';

// import DeleteButton from './DeleteButton';
import MyPopup from './MyPopup';

const ActionMenu = ({ user, dateId, username }) => {
	return (
		<>
			<MyPopup content='Action Menu' invert={true} caller='hover' side='left center'>
				<Dropdown className='ui small compact icon right floated button' icon='caret down' floating>
					<Dropdown.Menu>
						<Dropdown.Item disabled={user.username === username ? false : true}>
							<Icon name='pencil' />
							<span>Edit</span>
						</Dropdown.Item>
						<Dropdown.Item disabled={user.username === username ? false : true}>
							<Icon name='trash' />
							<span>Delete</span>
							{/* <DeleteButton dateId={dateId} /> */}
						</Dropdown.Item>
						<Dropdown.Item disabled={user.username === username ? true : false}>
							<Icon name='flag' />
							<span>Report</span>
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</MyPopup>
		</>
	);
};

export default ActionMenu;
