import React, { useContext } from 'react';
import { Card, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';

import { AuthContext } from '../Context/Auth';
import MyPopup from './MyPopup';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import DeleteButton from './DeleteButton';

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
				<MyPopup
					content={'Comment on post'}
					side={'right center'}
					inverted={true}
					width={'very'}
					flowing={true}
				>
					<CommentButton dateId={_id} commentCount={commentCount} />
				</MyPopup>
				{user && user.username === username && <DeleteButton dateId={{ _id }} />}
			</Card.Content>
		</Card>
	);
};

export default PostCard;
