import React from 'react';
import logo from './assets/image/PlayerLogo.png';

const Header = () => {
	return (
		<header className='Header'>
			<img
				src={logo}
				alt='WeJam'
			/>
		</header>
	);
};

export default Header;
