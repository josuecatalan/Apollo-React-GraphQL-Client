import React, { useState } from 'react';
import { Popup } from 'semantic-ui-react';

const MyPopup = ({ invert, content, children, side, width, flowing, caller, size, emoji }) => {
	const [isOpen, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
		setTimeout(() => {
			setOpen(false);
		}, 1000);
	};

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
			open={emoji ? emoji : isOpen}
			onOpen={handleOpen}
		/>
	);
};

export default MyPopup;
