import React, { useEffect } from 'react';
import logo from './assets/image/PlayerLogo.png';
import icon from './assets/image/PlayerIcon.png';

const Home = ({ data, setIsLoaded }) => {
	useEffect(() => {
		setTimeout(() => {
			setIsLoaded(true);
		}, 5000);

		console.log(data[0]);
	}, [data[0]]);

	return (
		<main className='Home'>
			<img
				src={icon}
				alt='WeJam'
			/>
			<img
				src={logo}
				alt='WeJam'
			/>
		</main>
	);
};

export default Home;
