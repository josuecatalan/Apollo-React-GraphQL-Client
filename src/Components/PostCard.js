import React, { useContext } from 'react';
import { Card, Popup, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';

import { AuthContext } from '../Context/Auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

// const style = {
// 	borderRadius: 15,
// 	backgroundColor: 'teal',
// 	color: 'white',
// 	boxShadow: 10
// };

const PostCard = ({
	date: { nameString, username, description, createdAt, likes, _id, likeCount, commentCount }
}) => {
	const { user } = useContext(AuthContext);

	return (
		<Card fluid>
			<Card.Content>
				<Image
					floated='right'
					size='mini'
					src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
				/>
				<Card.Header as={Link} to={`/users/${username}`}>
					{`${nameString} (@${username}) `}
				</Card.Header>
				<Card.Meta as={Link} to={`/dates/${_id}`}>
					{moment(createdAt).fromNow()}
				</Card.Meta>
				<Card.Description>{description}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<LikeButton user={user} date={{ _id, likes, likeCount }} />
				<Popup
					inverted
					content='Comment on post'
					position='top left'
					trigger={
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
					}
				/>
				{user && user.username === username && <DeleteButton dateId={{ _id }} />}
			</Card.Content>
		</Card>
	);
};

export default PostCard;
