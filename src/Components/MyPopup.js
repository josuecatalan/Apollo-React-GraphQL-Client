import React from 'react';
import { Popup } from 'semantic-ui-react';

const MyPopup = ({ invert, content, children, side, width, flowing, caller, size }) => {
	return (
		<Popup
			on={caller ? caller : 'hover'}
			inverted={invert ? invert : false}
			wide={width ? width : 'very'}
			flowing={flowing ? flowing : true}
			content={content ? content : 'Not defined content!'}
			trigger={children}
			position={side ? side : 'top center'}
			size={size ? size : 'tiny'}
		/>
	);
};

export default MyPopup;
