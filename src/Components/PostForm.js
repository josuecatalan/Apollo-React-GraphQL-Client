import React from 'react';
import { Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import moment from 'moment';
import 'moment/locale/es';

import { useForm } from '../Utils/Hooks';
import { FETCH_POSTS_QUERY } from '../Utils/GraphQL';

function PostForm({ history }) {
	const { values, handleChange, handleSubmit } = useForm(createPostCallback, {
		title: 'Example Title',
		startDate: moment().format('YYYY-MM-DDTHH:mm:ss'),
		endDate: moment()
			.add(1, 'hours')
			.format('YYYY-MM-DDTHH:mm:ss'),
		body: '',
		className: 'Amarillo',
		pacient: '5d4afe4b0149185384e284f5' //all of this data is pre-defined to save time...
	});

	const [createPost] = useMutation(CREATE_POST_MUTATION, {
		variables: values,
		update(dataProxy, result) {
			const data = dataProxy.readQuery({
				query: FETCH_POSTS_QUERY
			});
			data.getDates = [result.data.createDate, ...data.getDates];
			dataProxy.writeQuery({
				query: FETCH_POSTS_QUERY,
				data
			});
			values.body = '';
		}
	});

	//FIXME: make the 'Home' page show the new date added.

	function createPostCallback() {
		createPost();
	}

	return (
		<div>
			<Form onSubmit={handleSubmit}>
				<h2 className='page-title'>Create a Post:</h2>
				<Form.Field>
					<Form.TextArea
						placeholder='What are you thinking...?'
						name='body'
						icon='font'
						rows='2'
						onChange={handleChange}
						value={values.body}
					/>
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
			</Form>
		</div>
	);
}

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
			user
			username
			createdAt
			likeCount
			likes {
				id
				user
				username
				createdAt
			}
			commentCount
			comments {
				_id
				body
				user
				username
				createdAt
			}
		}
	}
`;

export default PostForm;
