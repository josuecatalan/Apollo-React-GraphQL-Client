import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
	query {
		getDates {
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
