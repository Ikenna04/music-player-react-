import React, { useEffect, useState } from 'react';
import useWindowSize from './hooks/useWindowSize';
import { FaPlus } from 'react-icons/fa';

const Nav = ({ songs, setSearchResults, setAddSong }) => {
	const [search, setSearch] = useState('');
	const { width } = useWindowSize();

	useEffect(() => {
		const filteredResults = songs.filter(
			song =>
				song.artist.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
				song.album.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
				song.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
		);

		setSearchResults(filteredResults.reverse());
	}, [songs, search]);

	return (
		<nav className='Nav'>
			<form action=''>
				<input
					type='text'
					name='search'
					id='search'
					placeholder='Search Songs'
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
			</form>
			<button
				className='btn sbs no-wrap'
				title='Add Song'
				onClick={() => setAddSong(true)}>
				{width < 768 ? <FaPlus /> : 'Add Song'}
			</button>
		</nav>
	);
};

export default Nav;
