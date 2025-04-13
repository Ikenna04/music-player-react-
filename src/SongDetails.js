import React, { useEffect } from 'react';
import { GiTrashCan } from 'react-icons/gi';
import api from './api/post';

const SongDetails = ({
	searchResult,
	searchResults,
	setSearchResults,
	handlePlayer,
}) => {
	const handleDelete = async (e, id) => {
		e.preventDefault();
		try {
			await api.delete(`/songs/${id}`);

			const songList = searchResults.filter(
				searchResult => searchResult.id !== id
			);
			setSearchResults(songList);
			console.log(searchResults);
		} catch (err) {
			console.log(`Error: ${err.message}`);
		}
	};

	useEffect(() => {
		console.log(searchResults);
	}, [searchResults]);

	return (
		<li
			key={searchResult.id}
			className='SongDetails'>
			<button
				className='songDetail no-btn'
				onClick={e => handlePlayer(searchResult.id, e)}>
				<h3>{searchResult.title}</h3>
				<div className='artist'>
					{searchResult.artist} | {searchResult.album}
				</div>
			</button>
			<button
				type='submit'
				className='del'
				onClick={e => handleDelete(e, searchResult.id)}>
				<GiTrashCan />
			</button>
		</li>
	);
};

export default SongDetails;
