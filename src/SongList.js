import React from 'react';
import SongDetails from './SongDetails';

const SongList = ({
	searchResults,
	handlePlayer,
	fetchError,
	isLoading,
	setSearchResults,
	setAddSong,
}) => {
	return (
		<ul className='SongList'>
			{isLoading && (
				<p
					style={{
						padding: '48px',
						color: 'hsl(231, 86%, 11%)',
						textAlign: 'center',
					}}>
					Loading ...
				</p>
			)}
			{fetchError && !isLoading && (
				<p
					style={{
						color: 'red',
						padding: '48px',
						textAlign: 'center',
					}}>
					{fetchError}
				</p>
			)}

			{searchResults ? (
				!fetchError &&
				!isLoading &&
				searchResults.map(searchResult => {
					return (
						<SongDetails
							searchResult={searchResult}
							searchResults={searchResults}
							setSearchResults={setSearchResults}
							handlePlayer={handlePlayer}
						/>
					);
				})
			) : (
				<>
					<h2>No song to display</h2>
					<button
						className='btn sbs'
						title='Add Song'
						onClick={() => setAddSong(true)}>
						Add a New Song
					</button>
				</>
			)}
		</ul>
	);
};

export default SongList;
