import Header from './Header';
import Nav from './Nav';
import Home from './Home';
import SongList from './SongList';
import Player from './Player';
import AddSong from './AddSong';
import Footer from './Footer';
import { useEffect, useRef, useState } from 'react';
import useAxiosFetch from './hooks/useAxiosFetch';
import './App.css';

const App = () => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [player, setPlayer] = useState(false);
	const [addSong, setAddSong] = useState(false);
	const [songs, setSongs] = useState([]);
	const [searchResults, setSearchResults] = useState([]);
	const [playing, setPlaying] = useState([]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [duration, setDuration] = useState('');
	const [currentTime, setCurrentTime] = useState(0);
	const [order, setOrder] = useState('loop');
	const audioRef = useRef(null);
	const { data, fetchError, isLoading } = useAxiosFetch(
		'http://localhost:3500/songs'
	);

	useEffect(() => {
		setSongs(data);
	}, [data]);

	useEffect(() => {
		setSearchResults(songs);
	}, [songs]);

	const handleSeek = e => {
		audioRef.current.currentTime = e.target.value;
		setCurrentTime(e.target.value);
	};

	const handleTimeUpdate = () => {
		setCurrentTime(audioRef.current.currentTime);
		setDuration(audioRef.current.duration);
	};

	const handlePlay = () => {
		audioRef.current.play();
		setIsPlaying(true);
	};

	const handlePause = () => {
		audioRef.current.pause();
		setIsPlaying(false);
	};

	const handlePlayPause = () => {
		if (isPlaying) {
			handlePause();
		} else {
			handlePlay();
		}
	};

	const handlePlayer = id => {
		const playedSong = songs.filter(song => song.id === id);
		setPlaying(playedSong[0]);

		setPlayer(true);
	};

	const handleNext = () => {
		const length = searchResults.length;
		let index = searchResults.indexOf(playing);

		if (index == length - 1) {
			setPlaying(searchResults[0]);
		} else {
			setPlaying(searchResults[index + 1]);
		}
		setIsPlaying(true);
	};

	const handleShuffle = () => {
		const length = searchResults.length;
		let index = Math.floor(Math.random() * length);

		setPlaying(searchResults[index]);
	};

	const handleRepeat = () => {
		let index = searchResults.indexOf(playing);
		audioRef.current.play();

		setPlaying(searchResults[index]);
	};

	const handleNextSong = () => {
		if (order === 'loop') {
			handleNext();
		} else if (order === 'shuffle') {
			handleShuffle();
		} else if (order === 'repeat') {
			handleRepeat();
		}
	};

	const handlePrev = () => {
		const length = searchResults.length;
		let index = searchResults.indexOf(playing);

		if (index <= 0) {
			setPlaying(searchResults[length - 1]);
		} else {
			setPlaying(searchResults[index - 1]);
		}
		setIsPlaying(true);
	};

	useEffect(() => {
		audioRef.current.addEventListener('timeupdate', handleTimeUpdate);

		return () => {
			audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
		};
	}, []);

	useEffect(() => {
		audioRef.current.getAttribute('src') && audioRef.current.play();
	}, [audioRef.current, playing]);

	return (
		<div className='App'>
			<audio
				src={playing.song}
				ref={audioRef}
				onEnded={handleNextSong}></audio>

			<Header />
			<Nav
				songs={songs}
				setSearchResults={setSearchResults}
				setAddSong={setAddSong}
			/>
			{!isLoaded && (
				<Home
					data={data}
					setIsLoaded={setIsLoaded}
				/>
			)}
			{isLoaded && !player && !addSong && (
				<SongList
					searchResults={searchResults}
					handlePlayer={handlePlayer}
					fetchError={fetchError}
					isLoading={isLoading}
					setAddSong={setAddSong}
					setSearchResults={setSearchResults}
				/>
			)}
			{isLoaded && player && (
				<Player
					handlePlay={handlePlay}
					handleSeek={handleSeek}
					handlePlayPause={handlePlayPause}
					handlePrev={handlePrev}
					handleNext={handleNext}
					setOrder={setOrder}
					setPlayer={setPlayer}
					currentTime={currentTime}
					duration={duration}
					playing={playing}
					isPlaying={isPlaying}
					order={order}
				/>
			)}
			{isLoaded && addSong && (
				<AddSong
					songs={songs}
					setSongs={setSongs}
					setAddSong={setAddSong}
				/>
			)}
			<Footer
				playing={playing}
				isPlaying={isPlaying}
				handlePrev={handlePrev}
				handleNext={handleNext}
				handlePlayer={handlePlayer}
				handlePlayPause={handlePlayPause}
			/>
		</div>
	);
};

export default App;
