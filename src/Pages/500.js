import React from 'react';
import FatalErrorImg from '../Images/500.png';

const FatalError = props => {
	return (
		<div>
			<h1>Error: 500 Page Unexpected Error</h1>
			<img src={FatalErrorImg} alt='500 FatalError' />
		</div>
	);
};

export default FatalError;
