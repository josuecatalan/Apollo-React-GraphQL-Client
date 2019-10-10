import React from 'react';
import { Card, Image, Button, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';

const PostCard = ({ date: { user, description, start_date, _id, likeCount, commentCount } }) => {
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
				<Card.Header>{user}</Card.Header>
				<Card.Meta as={Link} to={`/dates/${_id}`}>
					{moment(start_date).fromNow(true)}
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
};

export default PostCard;
