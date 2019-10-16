import React, { useContext } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';

import { AuthContext } from '../Context/Auth';
import LikeButton from './LikeButton';

function PostCard({
	date: { nameString, username, description, createdAt, likes, _id, likeCount, commentCount }
}) {
	const { user } = useContext(AuthContext);

	return (
		<Card fluid>
			<Card.Content>
				<Image
					floated='right'
					size='mini'
					src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
				/>
				<Card.Header as={Link} to={`/users/${username}`}>
					{`${nameString} (@${username}) `}
				</Card.Header>
				<Card.Meta></Card.Meta>
				<Card.Meta as={Link} to={`/dates/${_id}`}>
					{moment(createdAt).fromNow()}
				</Card.Meta>
				<Card.Description>{description}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<LikeButton user={user} post={{ _id, likes, likeCount }} />
				<Button
					basic
					as={Link}
					content=''
					to={`/dates/${_id}`}
					color='blue'
					icon='comments'
					label={{
						basic: true,
						color: 'blue',
						pointing: 'left',
						content: commentCount
					}}
				/>
				{user && user.username === username && (
					<Button
						floated='right'
						color='red'
						icon='trash'
						onClick={() => {
							console.log('Delete Date!');
						}}
					/>
				)}
			</Card.Content>
		</Card>
	);
}

export default PostCard;
