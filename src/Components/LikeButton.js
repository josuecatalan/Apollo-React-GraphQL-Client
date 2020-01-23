import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Button, Icon, Label } from 'semantic-ui-react';
import MyPopup from './MyPopup';

const LikeButton = ({ user, date: { _id, likes, likeCount } }) => {
	const [liked, setLiked] = useState(false);

	useEffect(() => {
		if (user && likes.find(like => like.username === user.username)) {
			setLiked(true);
		} else {
			setLiked(false);
		}
	}, [user, likes]);

	const [likeDate] = useMutation(LIKE_POST_MUTATION, {
		variables: { dateID: _id }
	});

	const likeButton = user ? (
		liked ? (
			<Button color='teal'>
				<Icon name='heart' />
			</Button>
		) : (
			<Button color='teal' basic>
				<Icon name='heart' />
			</Button>
		)
	) : (
		<Button as={Link} to='/login' color='teal' basic>
			<Icon name='heart' />
		</Button>
	);

	return (
		<MyPopup content={user && liked ? 'Unlike Post' : 'Like Post'} side={'top left'} invert={true}>
			<Button
				as='div'
				labelPosition='right'
				onClick={
					user
						? () => {
								likeDate();
						  }
						: null
				}
			>
				{likeButton}
				<Label as='a' basic color='teal' pointing='left'>
					{likeCount}
				</Label>
			</Button>
		</MyPopup>
	);
};

const LIKE_POST_MUTATION = gql`
	mutation likeDate($dateID: ID!) {
		likeDate(dateID: $dateID) {
			_id
			likes {
				_id
				nameString
				username
				createdAt
			}
			likeCount
		}
	}
`;

export default LikeButton;
