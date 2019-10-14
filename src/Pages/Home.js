import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid } from 'semantic-ui-react';

import { AuthContext } from '../Context/Auth';
import Loading from '../Components/Loading';
import PostCard from '../Components/PostCard';
import PostForm from '../Components/PostForm';
import { FETCH_POSTS_QUERY } from '../Utils/GraphQL';

const Home = props => {
	const { user } = useContext(AuthContext);
	const { loading, data } = useQuery(FETCH_POSTS_QUERY);

	const [dates, setDates] = useState([]);
	useEffect(() => {
		if (data) {
			setDates(data.getDates);
		}
	}, [data]);

	return (
		<Grid columns={3} stackable={true} className={loading ? 'loading' : ''}>
			<Grid.Row className='page-title'>
				<h1>Recent Posts</h1>
			</Grid.Row>
			<Grid.Row>
				{user && (
					<Grid.Column>
						<PostForm user={user} />
					</Grid.Column>
				)}
				{loading ? (
					<Loading />
				) : (
					dates &&
					dates.map(date => (
						<Grid.Column key={date._id} style={{ marginBottom: 20 }}>
							<PostCard date={date} />
						</Grid.Column>
					))
				)}
			</Grid.Row>
		</Grid>
	);
};

export default Home;
