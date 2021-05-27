import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import MyPopup from './MyPopup';

const CommentButton = ({ dateId, commentCount }) => {
	return (
		<MyPopup
			content={dateId ? 'Comment on this Post' : 'Comments of this Post'}
			side={dateId ? 'top left' : 'right center'}
			invert={true}
		>
			<Button
				basic
				as={dateId ? Link : 'div'}
				content=''
				to={dateId ? `/dates/${dateId}` : ''}
				color='blue'
				icon='comments'
				label={{
					basic: true,
					color: 'blue',
					pointing: 'left',
					content: commentCount
				}}
			/>
		</MyPopup>
	);
};

export default CommentButton;
