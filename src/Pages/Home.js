import React, { useContext, useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';

import { AuthContext } from '../Context/Auth';
import PostPlaceholder from '../Components/PostPlaceholder';
import PostCard from '../Components/PostCard';
import PostForm from '../Components/PostForm';
import { FETCH_POSTS_QUERY } from '../Utils/GraphQL';

const Home = props => {
	const [dates, setDates] = useState([]);
	const { user } = useContext(AuthContext);
	const { loading, data } = useQuery(FETCH_POSTS_QUERY);
	useEffect(() => {
		if (data) {
			setDates(data.getDates);
		}
	}, [data]);

	return (
		<Grid columns={3} stackable={true}>
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
					Array.apply(null, user ? { length: 8 } : { length: 9 }).map((e, i) => (
						<PostPlaceholder key={i} user={user ? true : false} />
					))
				) : (
					<Transition.Group animation='scale' duration={300}>
						{dates &&
							dates.map(date => (
								<Grid.Column key={date._id} style={{ marginBottom: 20 }}>
									<PostCard date={date} />
								</Grid.Column>
							))}
					</Transition.Group>
				)}
			</Grid.Row>
		</Grid>
	);
};

export default Home;
