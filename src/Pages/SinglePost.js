import React, { useContext, useState, useRef } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { Grid, Form, Image, Card, Button } from 'semantic-ui-react';
import moment from 'moment';
import 'moment/locale/es';

import { AuthContext } from '../Context/Auth';
import Loading from '../Components/Loading';
import LikeButton from '../Components/LikeButton';
import DeleteButton from '../Components/DeleteButton';

const SinglePost = props => {
	const dateID = props.match.params.dateId;
	const { user } = useContext(AuthContext);
	const [comment, setComment] = useState('');
	let postMarkup;

	const { loading, data } = useQuery(FETCH_POST_QUERY, {
		variables: {
			dateID
		}
	});

	const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
		update() {
			setComment('');
			commentInputRef.current.blur();
		},
		variables: {
			dateID,
			body: comment
		}
	});

	const commentInputRef = useRef(null);

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
			commentCount,
			comments
		} = data.getDate;

		postMarkup = (
			<Grid style={{ marginTop: 10 }} className={loading ? 'loading' : ''}>
				<Grid.Row>
					<Grid.Column width={2}>
						<Image
							floated='right'
							size='small'
							src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
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
						{user && (
							<Card fluid>
								<Card.Content>
									<p>Post a comment:</p>
									<Form>
										<Form.Input
											fluid
											type='text'
											placeholder='comment..'
											name='comment'
											value={comment}
											onChange={event => setComment(event.target.value)}
											ref={commentInputRef}
											action
										>
											<input />
											<Button
												type='submit'
												content='Submit'
												size='small'
												icon='comment alternate'
												color='teal'
												disabled={comment.trim() === '' ? true : false}
												onClick={submitComment}
											/>
										</Form.Input>
									</Form>
								</Card.Content>
							</Card>
						)}
						{comments.map(comment => (
							<Card fluid key={comment._id}>
								<Card.Content>
									{user && user.username === comment.username && (
										<DeleteButton dateId={{ _id }} commentId={comment._id} />
									)}
									<Card.Header as={Link} to={`/users/${comment.username}`}>
										{`${comment.nameString} (@${comment.username}) `}
									</Card.Header>
									<Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
									<Card.Description>{comment.body}</Card.Description>
								</Card.Content>
							</Card>
						))}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}

	return postMarkup;
};

const SUBMIT_COMMENT_MUTATION = gql`
	mutation createComment($dateID: ID!, $body: String!) {
		createComment(dateID: $dateID, body: $body) {
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
