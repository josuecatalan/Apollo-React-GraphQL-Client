import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Button, Confirm } from 'semantic-ui-react';
import MyPopup from './MyPopup';

import { FETCH_POSTS_QUERY } from '../Utils/GraphQL';

const DeleteButton = ({ dateId, commentId, callback }) => {
	const dateID = dateId._id;
	const commentID = commentId ? commentId : '';
	const [confirmOpen, setConfirmOpen] = useState(false);

	const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

	const [deleteDateOrComment] = useMutation(mutation, {
		update(proxy) {
			setConfirmOpen(false);
			if (!commentId) {
				let data = proxy.readQuery({
					query: FETCH_POSTS_QUERY
				});
				const resDates = data.getDates.filter(d => d._id !== dateID);
				proxy.writeQuery({
					query: FETCH_POSTS_QUERY,
					data: { getDates: [...resDates] }
				});
			}
			if (callback) {
				callback();
			}
		},
		variables: {
			dateID,
			commentID
		}
	});

	return (
		<>
			<MyPopup
				content={`Delete ${commentId ? 'Comment' : 'Post'}`}
				side={commentId ? 'left center' : 'top right'}
				invert={true}
			>
				<Button
					circular={commentId ? true : false}
					compact={commentId ? false : true}
					floated='right'
					color='red'
					icon={commentId ? 'eraser' : 'trash'}
					onClick={() => setConfirmOpen(true)}
					size={commentId ? 'mini' : 'small'}
				/>
			</MyPopup>
			<Confirm
				header='Are you sure?'
				size='small'
				open={confirmOpen}
				content={`You want to delete this ${commentId ? 'Comment' : 'Post'} permanently?`}
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
				onConfirm={deleteDateOrComment}
			/>
		</>
	);
};

const DELETE_POST_MUTATION = gql`
	mutation deleteDate($dateID: ID!) {
		deleteDate(dateID: $dateID)
	}
`;

const DELETE_COMMENT_MUTATION = gql`
	mutation deleteComment($dateID: ID!, $commentID: ID!) {
		deleteComment(dateID: $dateID, commentID: $commentID) {
			_id
			comments {
				_id
				body
				nameString
				username
				createdAt
			}
			commentCount
		}
	}
`;

export default DeleteButton;
