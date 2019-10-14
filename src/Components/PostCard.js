import React from 'react';
import { Card, Image, Button, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';

function PostCard({
	date: { user, username, description, createdAt, _id, likeCount, commentCount }
}) {
	const likeDate = () => {
		console.log('Liked!!!');
	};
	const commentOnDate = () => {
		console.log('Commented!!!');
	};
	return (
		<Card fluid>
			<Card.Content>
				<Image
					floated='right'
					size='mini'
					src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
				/>
				<Card.Header as={Link} to={`/users/@${username}`}>
					{`${user} (@${username}) `}
				</Card.Header>
				<Card.Meta></Card.Meta>
				<Card.Meta as={Link} to={`/dates/${_id}`}>
					{moment(createdAt).fromNow()}
				</Card.Meta>
				<Card.Description>{description}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button as='div' labelPosition='right' onClick={likeDate}>
					<Button color='teal' basic>
						<Icon name='heart' />
					</Button>
					<Label as='a' basic color='teal' pointing='left'>
						{likeCount}
					</Label>
				</Button>
				<Button as='div' labelPosition='right' onClick={commentOnDate}>
					<Button color='blue' basic>
						<Icon name='comments' />
					</Button>
					<Label as='a' basic color='blue' pointing='left'>
						{commentCount}
					</Label>
				</Button>
			</Card.Content>
		</Card>
	);
}

export default PostCard;
