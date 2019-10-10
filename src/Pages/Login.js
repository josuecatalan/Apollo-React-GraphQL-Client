import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { useForm } from '../Utils/Hooks';

const Login = props => {
	const [errors, setErrors] = useState({});

	///para hacer uppercase a los nombres: .val().replace(/\b[a-z]/g, c => c.toUpperCase())

	const { handleChange, handleSubmit, values } = useForm(registerUserCallback, {
		username: '',
		password: ''
	});

	const [loginUser, { loading }] = useMutation(LOGIN_USER, {
		update(_, result) {
			props.history.push('/');
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: values
	});

	function registerUserCallback() {
		loginUser();
	}

	return (
		<div className='form-container-login'>
			<Form onSubmit={handleSubmit} noValidate className={loading ? 'loading' : ''}>
				<h1 className='page-title'>Login Form</h1>
				<Form.Group widths='equal'>
					<Form.Input
						fluid
						required
						type='text'
						icon='user'
						autoComplete='new-username'
						label='Username'
						placeholder='Username...'
						name='username'
						value={values.username}
						error={errors.username ? true : false}
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
				</Form.Group>
				<Form.Button icon='sign in' primary content='Login' />
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

const LOGIN_USER = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			_id
			firstname
			lastname
			username
			email
			usericon
			range
			bachtitle
			token
		}
	}
`;

export default Login;
