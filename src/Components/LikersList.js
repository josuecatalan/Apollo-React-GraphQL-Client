import React from 'react';

const LikersList = ({ likes, user }) => {
	const likesLenght = likes.length;
	const you = user.nameString === likes.nameString ? true : false;
	// const likesList =
	// 	likes.length === 0 ? (
	// 		<ul style={{ display: 'none' }}></ul>
	// 	) : you ? (
	// 		<ul style={{ paddingLeft: 1, marginBottom: 2, marginTop: 6 }}>
	// 			<li style={{ display: 'inline-block' }}>You like this Post</li>
	// 		</ul>
	// 	) : (
	// 		<ul style={{ paddingLeft: 1, marginBottom: 5 }}>
	// 			<li style={{ display: 'inline-block' }}>{`${likesLenght} users liked this Post.`}</li>
	// 		</ul>
	// 	);
	let likesList = '';

	if (you && likesLenght === 1) {
		likesList = (
			<ul style={{ paddingLeft: 1, marginBottom: 2, marginTop: 6 }}>
				<li style={{ display: 'inline-block' }}>You like this Post</li>
			</ul>
		);
	} else if (likes.length === 0) {
		likesList = (
			<ul style={{ display: 'none' }}>
				<li></li>
			</ul>
		);
	} else if (you && likesLenght > 1) {
		likesList = (
			<ul style={{ paddingLeft: 1, marginBottom: 5 }}>
				<li
					style={{ display: 'inline-block' }}
				>{`You and other ${likesLenght} users liked this Post.`}</li>
			</ul>
		);
	} else if (!you && likesLenght > 0) {
		likesList = (
			<ul style={{ paddingLeft: 1, marginBottom: 5 }}>
				<li style={{ display: 'inline-block' }}>{`${likesLenght} users liked this Post.`}</li>
			</ul>
		);
	}
	// TODO: arreglar la lista de los que han dado like incluyendo al usuario actual.
	// const likeString = () => {
	// 	if (you && likes.length === 1) {
	// 		return (

	// 		);
	// 	} else if (you && likes.length > 1) {
	// 		return (

	// 		);
	// 	} else {
	// 		return null;
	// 	}
	// };
	//you && `You and other ${likesLenght - 1} people likes this Post.`
	// const likersCombo = likes.map(like => (
	// 	<li style={{ display: 'inline-block' }} key={like._id}>
	// 		{`${like.nameString},${' '}`}
	// 	</li>
	// ));
	return likesList;
};

export default LikersList;
