import React, { useContext, useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { Grid, Transition, Form, Image, Card, Button, Popup } from 'semantic-ui-react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart/dist-modern/index.js';
import moment from 'moment';
// import 'moment/locale/es';

import { AuthContext } from '../Context/Auth';
import Loading from '../Components/Loading';
import MyPopup from '../Components/MyPopup';
import LikeButton from '../Components/LikeButton';
import LikersList from '../Components/LikersList';
import CommentButton from '../Components/CommentButton';
import ActionMenu from '../Components/ActionMenu';

const SinglePost = props => {
	const dateID = props.match.params.dateId;
	const { user } = useContext(AuthContext);
	const [comment, setComment] = useState({
		text: ''
	});
	let postMarkup;

	const { loading, data } = useQuery(FETCH_POST_QUERY, {
		variables: {
			dateID
		}
	});

	const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
		update() {
			setComment({
				text: ''
			});
		},
		variables: {
			dateID,
			body: comment.text
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
								<MyPopup
									content={'Comments on this post'}
									side={'right center'}
									width={'very'}
									flowing={true}
									inverted={true}
								>
									<CommentButton commentCount={commentCount} />
								</MyPopup>
								{user && (
									<ActionMenu
										dateId={{ _id }}
										user={user}
										username={username}
										callback={deletePostCallback}
									/>
								)}
								{!user && (
									<>
										<h4>Please Login/Register to Comment or Like this Post</h4>
										<Button
											compact
											as={Link}
											to='/login'
											content='Login'
											icon='sign in'
											color='blue'
										/>
										<Button
											compact
											as={Link}
											to='/register'
											content='Register'
											icon='user plus'
											color='green'
										/>
									</>
								)}
								{user && <LikersList user={user} likes={likes} />}
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
											value={comment.text}
											onChange={event =>
												setComment({
													text: event.target.value
												})
											}
										>
											<input />
											<Popup
												on='click'
												inverted={false}
												wide='very'
												flowing={true}
												position='right center'
												size='tiny'
												content={
													<Picker
														native
														showSkinTones={false}
														showPreview={false}
														color='#00B5AD'
														title='Skin tone'
														emoji='point_right'
														onSelect={e => {
															let sym = e.unified.split('-');
															let codesArray = [];
															sym.forEach(el => codesArray.push('0x' + el));
															let emoji = String.fromCodePoint(...codesArray);
															let body = comment.text;
															setComment({
																text: body + emoji
															});
														}}
													/>
												}
												trigger={
													<Button
														floated='left'
														icon={{
															name: 'smile outline',
															color: 'black',
															size: 'large'
														}}
														size='small'
														compact
													/>
												}
											></Popup>
											<Button
												type='submit'
												content='Submit'
												size='small'
												icon='comment alternate'
												color='teal'
												disabled={comment.text === '' ? true : false}
												onClick={submitComment}
											/>
										</Form.Input>
									</Form>
								</Card.Content>
							</Card>
						)}
						{comments.map(comment => (
							<Transition.Group key={comment._id} animation='fadeInDown' duration={500}>
								<Card fluid>
									<Card.Content>
										{user && (
											<ActionMenu
												dateId={{ _id }}
												commentId={comment._id}
												user={user}
												username={comment.username}
											/>
										)}
										<Card.Header as={Link} to={`/users/${comment.username}`}>
											{`${comment.nameString} (@${comment.username}) `}
										</Card.Header>
										<Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
										<Card.Description>{comment.body}</Card.Description>
									</Card.Content>
								</Card>
							</Transition.Group>
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
