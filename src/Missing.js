import React from 'react';
import { Link } from 'react-router-dom';

const Missing = () => {
	return (
		<div className='Missing'>
			<h1>Page not Found</h1>
			<Link to='/'>Go Back to song list</Link>
		</div>
	);
};

export default Missing;
