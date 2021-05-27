import React from 'react';

const LikersList = ({ likes, user }) => {
	const likesQty = likes.length;
	const you = likes.find(like => like.username === user.username) ? true : false;
	let likedBy = '';

	if (!you & (likesQty === 0)) {
		likedBy = '';
	} else if (you & (likesQty === 1)) {
		likedBy = (
			<ul style={{ paddingLeft: 1, marginBottom: 5 }}>
				<li style={{ display: 'inline-block' }}>You like this Post</li>
			</ul>
		);
	} else if (you & (likesQty > 1)) {
		likedBy = (
			<ul style={{ paddingLeft: 1, marginBottom: 5 }}>
				<li style={{ display: 'inline-block' }}>{`You and ${likesQty - 1} other 
        ${likesQty - 1 === 1 ? `user` : `users`} liked this Post.`}</li>
			</ul>
		);
	} else if (!you & (likesQty > 0)) {
		likedBy = (
			<ul style={{ paddingLeft: 1, marginBottom: 5 }}>
				<li style={{ display: 'inline-block' }}>{`${likesQty} ${
					likesQty === 1 ? `user` : `users`
				} liked this Post.`}</li>
			</ul>
		);
	}
	return likedBy;
};

export default LikersList;
