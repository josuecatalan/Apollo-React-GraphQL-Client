import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { Grid, Image, Card, Button } from 'semantic-ui-react';
import moment from 'moment';
import 'moment/locale/es';

import { AuthContext } from '../Context/Auth';
import Loading from '../Components/Loading';
import LikeButton from '../Components/LikeButton';
import DeleteButton from '../Components/DeleteButton';

const SinglePost = props => {
	const dateID = props.match.params.dateId;
	const { user } = useContext(AuthContext);
	let postMarkup;

	const { loading, data } = useQuery(FETCH_POST_QUERY, {
		variables: {
			dateID
		}
	});

	function deletePostCallback() {
		props.history.push('/');
	}

	if (!data) {
		postMarkup = <Loading />;
	} else {
		const {
			_id,
			description,
			nameString,
			username,
			createdAt,
			likeCount,
			likes,
			commentCount
		} = data.getDate;

		postMarkup = (
			<Grid style={{ marginTop: 10 }} className={loading ? 'loading' : ''}>
				<Grid.Row>
					<Grid.Column width={2}>
						<Image
							floated='right'
							size='small'
							src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
						/>
					</Grid.Column>
					<Grid.Column width={10}>
						<Card fluid>
							<Card.Content>
								<Card.Header as={Link} to={`/users/${username}`}>
									{`${nameString} (@${username}) `}
								</Card.Header>
								<Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
								<Card.Description>{description}</Card.Description>
							</Card.Content>
							<hr />
							<Card.Content extra>
								<LikeButton user={user} date={{ _id, likes, likeCount }} />
								<Button
									basic
									content=''
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
									<DeleteButton dateId={{ _id }} callback={deletePostCallback} />
								)}
							</Card.Content>
						</Card>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}

	return postMarkup;
};

const FETCH_POST_QUERY = gql`
	query getDate($dateID: ID!) {
		getDate(dateID: $dateID) {
			_id
			description
			nameString
			username
			createdAt
			likeCount
			likes {
				_id
				nameString
				username
				createdAt
			}
			commentCount
			comments {
				_id
				body
				nameString
				username
				createdAt
			}
		}
	}
`;

export default SinglePost;
