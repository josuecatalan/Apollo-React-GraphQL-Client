import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';

import Loading from '../Components/Loading';
import PostCard from '../Components/PostCard';

const Home = props => {
	let dates = '';
	const { loading, data } = useQuery(FETCH_POSTS_QUERY);

	if (data) {
		dates = { data: data.getDates };
	}

	return (
		<Grid columns={3} stackable={true} className={loading ? 'loading' : ''}>
			<Grid.Row className='page-title'>
				<h1>Recent Posts</h1>
			</Grid.Row>
			<Grid.Row>
				{loading ? (
					<Loading />
				) : (
					dates.data &&
					dates.data.map(date => (
						<Grid.Column key={date._id} style={{ marginBottom: 20 }}>
							<PostCard date={date} />
						</Grid.Column>
					))
				)}
			</Grid.Row>
		</Grid>
	);
};

const FETCH_POSTS_QUERY = gql`
	query {
		getDates {
			_id
			title
			start_date
			end_date
			description
			user
			likeCount
			likes {
				id
				username
				createdAt
			}
			commentCount
			comments {
				_id
				body
				username
				createdAt
			}
		}
	}
`;

export default Home;
