import React from 'react';

const LikersList = ({ likes, user }) => {
	const likesLength = likes.length;
	const you = likes.find(like => like.username === user.username) ? true : false;
	let likedBy = '';

	if (!you & (likesLength === 0)) {
		likedBy = '';
	} else if (you & (likesLength === 1)) {
		likedBy = (
			<ul style={{ paddingLeft: 1, marginBottom: 5 }}>
				<li style={{ display: 'inline-block' }}>You like this Post</li>
			</ul>
		);
	} else if (you & (likesLength > 1)) {
		likedBy = (
			<ul style={{ paddingLeft: 1, marginBottom: 5 }}>
				<li style={{ display: 'inline-block' }}>{`You and ${likesLength - 1} more 
        ${likesLength - 1 === 1 ? `user` : `users`} liked this Post.`}</li>
			</ul>
		);
	} else if (!you & (likesLength > 0)) {
		likedBy = (
			<ul style={{ paddingLeft: 1, marginBottom: 5 }}>
				<li style={{ display: 'inline-block' }}>{`${likesLength} ${
					likesLength === 1 ? `user` : `users`
				} liked this Post.`}</li>
			</ul>
		);
	}
	return likedBy;
};

export default LikersList;
