import React, { useState } from 'react';
import api from './api/post';

const AddSong = ({ songs, setSongs, setAddSong }) => {
	const [songTitle, setSongTitle] = useState('');
	const [artist, setArtist] = useState('');
	const [album, setAlbum] = useState('');
	const [file, setFile] = useState('');

	const handleSubmit = async e => {
		e.preventDefault();
		const id = songs.length
			? String(Number(songs[songs.length - 1].id) + 1)
			: '1';

		const newSong = {
			id,
			title: songTitle.toLowerCase(),
			artist: artist.toLowerCase(),
			album: album.toLowerCase(),
			song: file,
		};
		try {
			const response = await api.post('/songs', newSong);
			console.log(response);

			const allSongs = [...songs, response.data];
			console.log(allSongs);
			setSongs(allSongs);
			setSongTitle('');
			setAlbum('');
			setArtist('');
			setFile('');
			setAddSong(false);
		} catch (err) {
			console.log(`Error: ${err.message}`);
		}
	};

	const encodeImageFileAsURL = (e, fnx) => {
		let file = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => fnx(reader.result);
	};

	return (
		<form
			action=''
			className='AddSong'
			onSubmit={e => handleSubmit(e)}>
			<label htmlFor=''>Song Name</label>
			<input
				type='text'
				id=''
				name=''
				placeholder=''
				value={songTitle}
				required
				onChange={e => setSongTitle(e.target.value)}
			/>
			<label htmlFor=''>Artist</label>
			<input
				type='text'
				id=''
				name=''
				placeholder=''
				value={artist}
				required
				onChange={e => setArtist(e.target.value)}
			/>
			<label htmlFor=''>Album</label>
			<input
				type='text'
				id=''
				name=''
				placeholder=''
				value={album}
				onChange={e => setAlbum(e.target.value)}
			/>
			<label htmlFor=''>Song File</label>
			<input
				type='file'
				name=''
				id=''
				required
				onChange={e => encodeImageFileAsURL(e, setFile)}
			/>
			<div className='btns'>
				<button
					type='button'
					className='cancel sbs'
					onClick={() => setAddSong(false)}>
					cancel
				</button>

				<button
					type='submit'
					className='add sbs'>
					add song
				</button>
			</div>
		</form>
	);
};

export default AddSong;
