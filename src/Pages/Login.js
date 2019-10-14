import React, { useState, useContext } from 'react';
import { Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AuthContext } from '../Context/Auth';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

import { useForm } from '../Utils/Hooks';

function Login(props) {
	const context = useContext(AuthContext);
	const [errors, setErrors] = useState({});

	const { handleChange, handleSubmit, values } = useForm(registerUserCallback, {
		username: 'joshrod',
		password: 'showdown'
	});

	const [loginUser, { loading }] = useMutation(LOGIN_USER, {
		update(
			_,
			{
				data: { login: userData }
			}
		) {
			context.login(userData);
			props.history.push('/');

			const { firstname, lastname } = userData;

			store.addNotification({
				title: `Welcome ${firstname + ' ' + lastname}!`,
				message: "You're now online",
				type: 'success',
				insert: 'top',
				showIcon: true,
				container: 'bottom-right',
				animationIn: ['animated', 'slideInRight'],
				animationOut: ['animated', 'fadeOut'],
				dismiss: {
					duration: 4000,
					onScreen: true,
					pauseOnHover: true
				}
			});
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
		<div className='form-container-login app-container'>
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
}

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
