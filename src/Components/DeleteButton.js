import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Button, Confirm } from 'semantic-ui-react';

import { FETCH_POSTS_QUERY } from '../Utils/GraphQL';

const DeleteButton = ({ dateId, callback }) => {
	const dateID = dateId._id;
	const [confirmOpen, setConfirmOpen] = useState(false);

	const [deleteDate] = useMutation(DELETE_POST_MUTATION, {
		variables: {
			dateID
		},
		update(proxy) {
			setConfirmOpen(false);
			let data = proxy.readQuery({
				query: FETCH_POSTS_QUERY
			});
			const resDates = data.getDates.filter(d => d._id !== dateID);
			proxy.writeQuery({
				query: FETCH_POSTS_QUERY,
				data: { getDates: [...resDates] }
			});
			if (callback) {
				callback();
			}
		}
	});

	return (
		<>
			<Button floated='right' color='red' icon='trash' onClick={() => setConfirmOpen(true)} />
			<Confirm
				header='Are you sure?'
				open={confirmOpen}
				content='You want to delete this post permanently?'
				confirmButton={{
					content: 'Yes, delete it',
					icon: 'trash',
					color: 'blue'
				}}
				cancelButton={{
					content: "No, please don't",
					icon: 'cancel',
					color: 'grey'
				}}
				onCancel={() => setConfirmOpen(false)}
				onConfirm={deleteDate}
			/>
		</>
	);
};

const DELETE_POST_MUTATION = gql`
	mutation deleteDate($dateID: ID!) {
		deleteDate(dateID: $dateID)
	}
`;

export default DeleteButton;
