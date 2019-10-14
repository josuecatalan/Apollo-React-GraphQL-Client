import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
	query {
		getDates {
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
