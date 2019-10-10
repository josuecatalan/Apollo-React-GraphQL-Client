import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { useForm } from '../Utils/Hooks';

const Register = props => {
	const [errors, setErrors] = useState({});

	const rangeOptions = [
		{ key: 'a', text: 'Admin', value: '1' },
		{ key: 'u', text: 'User', value: '2' }
	];

	const titleOptions = [
		{ key: 'dr', text: 'Dr.', value: 'Dr.' },
		{ key: 'de', text: 'Dev.', value: 'Dev.' },
		{ key: 'us', text: 'User', value: 'User' }
	];

	///para hacer uppercase a los nombres: .val().replace(/\b[a-z]/g, c => c.toUpperCase())

	const { handleChange, handleSubmit, values } = useForm(registerUser, {
		firstname: '',
		lastname: '',
		username: '',
		email: '',
		password: '',
		title: 'User',
		range: '2',
		icon: 'user',
		confirmPassword: ''
	});

	const [addUser, { loading }] = useMutation(REGISTER_USER, {
		update(_, result) {
			props.history.push('/');
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: values
	});

	function registerUser() {
		addUser();
	}

	return (
		<div className='form-container'>
			<Form onSubmit={handleSubmit} noValidate className={loading ? 'loading' : ''}>
				<h1 className='page-title'>Register Form</h1>
				<Form.Group widths='equal'>
					<Form.Input
						fluid
						required
						type='text'
						icon='address card outline'
						label='First Name'
						placeholder='First Name...'
						name='firstname'
						value={values.firstname}
						error={errors.firstname ? true : false}
						onChange={handleChange}
					/>
					<Form.Input
						fluid
						required
						type='text'
						icon='address card outline'
						label='Last Name'
						placeholder='Last Name...'
						name='lastname'
						value={values.lastname}
						error={errors.lastname ? true : false}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group widths='equal'>
					<Form.Input
						fluid
						required
						type='text'
						icon='user'
						label='Username'
						placeholder='Username...'
						name='username'
						value={values.username}
						error={errors.username ? true : false}
						onChange={handleChange}
					/>
					<Form.Input
						fluid
						required
						autoComplete='new@email.com'
						type='email'
						icon='at'
						label='Email'
						placeholder='Email...'
						name='email'
						value={values.email}
						error={errors.email ? true : false}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group widths='equal'>
					<Form.Input
						fluid
						required
						autoComplete='new-password'
						type='password'
						icon='keyboard'
						label='Password'
						placeholder='Password...'
						name='password'
						value={values.password}
						error={errors.password ? true : false}
						onChange={handleChange}
					/>
					<Form.Input
						fluid
						required
						autoComplete='new-password'
						type='password'
						icon='keyboard'
						label='Confirm Password'
						placeholder='Confirm Password...'
						name='confirmPassword'
						value={values.confirmPassword}
						error={errors.confirmPassword ? true : false}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group widths='equal'>
					<Form.Select
						fluid
						disabled={true}
						label='Range'
						placeholder='Select a User Range'
						options={rangeOptions}
						value={values.range}
						search
					/>
					<Form.Select
						fluid
						disabled={true}
						label='Title'
						placeholder='Select a User Title'
						options={titleOptions}
						value={values.title}
						search
					/>
				</Form.Group>
				<Form.Button icon='user plus' primary content='Register' />
			</Form>
			{Object.keys(errors).length > 0 && (
				<div className='ui error message'>
					<ul className='list'>
						{Object.values(errors).map(value => (
							<li key={value}>{value}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

const REGISTER_USER = gql`
	mutation register(
		$firstname: String!
		$lastname: String!
		$username: String!
		$email: String!
		$password: String!
		$confirmPassword: String!
	) {
		register(
			registerInput: {
				firstname: $firstname
				lastname: $lastname
				username: $username
				email: $email
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
			_id
			firstname
			lastname
			username
			createdAt
			token
		}
	}
`;

export default Register;
