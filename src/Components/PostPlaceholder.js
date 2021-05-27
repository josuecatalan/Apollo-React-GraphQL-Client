import React from 'react';
import { Grid, Placeholder, Segment, Button, Dropdown } from 'semantic-ui-react';

const PostPlaceholder = ({ user }) => (
	<>
		<Grid.Column style={{ marginBottom: 20 }}>
			<Segment raised>
				<Placeholder>
					<Placeholder.Header image>
						<Placeholder.Line length='medium' />
						<Placeholder.Line length='short' />
					</Placeholder.Header>
					<Placeholder.Paragraph>
						<Placeholder.Line length='medium' />
					</Placeholder.Paragraph>
				</Placeholder>
				<br />
				<Button
					loading
					basic
					as='div'
					content=''
					color='teal'
					icon='heart'
					label={{
						basic: true,
						color: 'teal',
						pointing: 'left',
						content: '-'
					}}
				/>
				<Button
					loading
					basic
					as='div'
					content=''
					color='blue'
					icon='comments'
					label={{
						basic: true,
						color: 'blue',
						pointing: 'left',
						content: '-'
					}}
				/>
				{user && (
					<Dropdown
						loading
						className='ui medium compact icon right floated button'
						icon='caret down'
						closeOnBlur={true}
						floating
					/>
				)}
			</Segment>
		</Grid.Column>
	</>
);

export default PostPlaceholder;
