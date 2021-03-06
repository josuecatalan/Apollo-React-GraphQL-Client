import React, { useState } from 'react';
import { Form, Input, Button, Card, Popup } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import moment from 'moment';
// import 'moment/locale/es';

import { useForm } from '../Utils/Hooks';
import { FETCH_POSTS_QUERY } from '../Utils/GraphQL';

const PostForm = props => {
	const [text, setText] = useState({
		content: ''
	});
	const { values, handleChange, handleSubmit } = useForm(createPostCallback, {
		title: 'Example Title',
		startDate: moment().format('YYYY-MM-DDTHH:mm:ss'),
		endDate: moment()
			.add(1, 'hours')
			.format('YYYY-MM-DDTHH:mm:ss'),
		className: 'Amarillo',
		pacient: '5d4afe4b0149185384e284f5' /// NOTE: all of this data is pre-defined to save time...
	});

	const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
		variables: {
			...values,
			body: text.content
		},
		update(proxy, result) {
			const data = proxy.readQuery({
				query: FETCH_POSTS_QUERY
			});
			const new_post = result.data.createDate;
			proxy.writeQuery({
				query: FETCH_POSTS_QUERY,
				data: { getDates: [new_post, ...data.getDates] }
			});
			setText({
				content: ''
			});
		}
	});

	function createPostCallback() {
		createPost();
	}

	return (
		<div>
			<Form onSubmit={handleSubmit}>
				<Card fluid>
					<Card.Content style={{ backgroundColor: '#ECF4DC' }}>
						<Card.Header>Write a new Post:</Card.Header>
						<hr />
						<Form.Field>
							<Form.Input>
								<Input
									placeholder='What are you thinking...?'
									name='body'
									onChange={e =>
										setText({
											content: e.target.value
										})
									}
									value={text.content}
									error={error ? true : false}
								/>
								<Popup
									on='click'
									inverted={false}
									wide='very'
									flowing={true}
									position='bottom left'
									size='tiny'
									content={
										<Picker
											native
											showSkinTones={false}
											showPreview={false}
											onClick={e => {
												setText({
													content: text.content + ' '
												});
											}}
											on
											onSelect={e => {
												let sym = e.unified.split('-');
												let codesArray = [];
												sym.forEach(el => codesArray.push('0x' + el));
												let emoji = String.fromCodePoint(...codesArray);
												let post = text.content;
												setText({
													content: post + emoji
												});
											}}
											onChange={handleChange}
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
											onClick={e => e.preventDefault()}
											compact
										/>
									}
								></Popup>
							</Form.Input>
							<Form.Input
								fluid
								style={{ display: 'none' }}
								autoComplete='new-title'
								type='text'
								icon='pencil'
								placeholder='Title...'
								name='title'
								value={values.title}
								//error={errors.title ? true : false}
								onChange={handleChange}
							/>
							<Form.Input
								fluid
								style={{ display: 'none' }}
								autoComplete='new-startDate'
								type='text'
								icon='clock'
								placeholder='Start Date...'
								name='startDate'
								value={values.startDate}
								//error={errors.startDate ? true : false}
								onChange={handleChange}
							/>
							<Form.Input
								fluid
								style={{ display: 'none' }}
								autoComplete='new-endDate'
								type='text'
								icon='clock'
								placeholder='End Date...'
								name='endDate'
								value={values.endDate}
								//error={errors.endDate ? true : false}
								onChange={handleChange}
							/>
							<Form.Input
								fluid
								style={{ display: 'none' }}
								autoComplete='new-className'
								type='text'
								icon='css3 alternate'
								placeholder='Class Name...'
								name='className'
								value={values.className}
								//error={errors.className ? true : false}
								onChange={handleChange}
							/>
							<Form.Input
								fluid
								style={{ display: 'none' }}
								autoComplete='new-pacient'
								type='text'
								icon='user circle'
								placeholder='Pacient Name...'
								name='pacient'
								value={values.pacient}
								//error={errors.pacient ? true : false}
								onChange={handleChange}
							/>
							<Form.Button type='submit' color='teal' content='Submit' icon='edit' />
						</Form.Field>
					</Card.Content>
				</Card>
			</Form>
			{error && (
				<div className='ui error message' style={{ marginBottom: 20 }}>
					<ul className='list'>
						<li>{error.graphQLErrors[0].message}</li>
					</ul>
				</div>
			)}
		</div>
	);
};

const CREATE_POST_MUTATION = gql`
	mutation createDate(
		$title: String!
		$startDate: String!
		$endDate: String!
		$body: String!
		$className: String!
		$pacient: ID!
	) {
		createDate(
			input: {
				title: $title
				start_date: $startDate
				end_date: $endDate
				description: $body
				classname: $className
				pacient: $pacient
			}
		) {
			_id
			title
			start_date
			end_date
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

export default PostForm;
