import React, { useEffect, useRef } from 'react';
import { FaRepeat, FaShuffle } from 'react-icons/fa6';
import {
	GiNextButton,
	GiPauseButton,
	GiPlayButton,
	GiPreviousButton,
} from 'react-icons/gi';
import PlayerImage from './assets/image/PlayerImage.png';

const Player = ({
	handlePlayPause,
	handleSeek,
	handlePlay,
	playing,
	currentTime,
	duration,
	isPlaying,
	order,
	setOrder,
	handlePrev,
	handleNext,
	setPlayer,
}) => {
	const shuffle = useRef(null);
	const repeat = useRef(null);

	const handleFormatTime = time => {
		const mins = Math.floor(time / 60);
		const secs = Math.floor(time % 60);
		const formatedSecs = secs.toString().padStart(2, '0');
		return `${mins}:${formatedSecs}`;
	};

	const handleShuffle = () => {
		if (order === 'shuffle') {
			setOrder('loop');
		} else if (order !== 'shuffle') {
			setOrder('shuffle');
		}
	};

	const handleRepeat = () => {
		if (order === 'repeat') {
			setOrder('loop');
		} else if (order !== 'repeat') {
			setOrder('repeat');
		}
	};

	useEffect(() => {
		handlePlay();
	}, []);

	return (
		<main className='Player'>
			<div
				className='downIcon'
				onClick={() => setPlayer(false)}>
				<div className='downArrow'></div>
			</div>
			<div className='bigContainer bs'>
				<div className='imgContainer sbs'>
					<div className='img sbs'>
						<img
							src={PlayerImage}
							alt='Player Hero Image'
						/>
					</div>
				</div>
				<div className='songDetails'>
					<h2>
						- <span>{playing.artist}</span>-
					</h2>
					<p className='artist'>{playing.title}</p>
				</div>
			</div>
			<div className='progressMain'>
				<div className='time elasped'>
					<p>{handleFormatTime(currentTime)}</p>
				</div>
				<input
					type='range'
					name='progress'
					id='progress'
					min='0'
					max={duration || ''}
					value={currentTime}
					onChange={handleSeek}
				/>
				<div className='time total'>
					<p>{handleFormatTime(duration)}</p>
				</div>
			</div>
			<div className='playBtns'>
				<button
					className='shuffle order no-btn'
					value='shuffle'
					id='shuffle'
					onClick={handleShuffle}
					ref={shuffle}>
					<FaShuffle
						style={{ fill: order === 'shuffle' ? ' #040b34' : ' #e1f3fe' }}
					/>
				</button>
				<button
					className='prev btn sbs no-btn'
					onClick={handlePrev}>
					<GiPreviousButton />
				</button>
				<button
					className='playBtn btn sbs no-btn'
					id={isPlaying ? 'playing' : 'paused'}
					onClick={handlePlayPause}>
					<GiPlayButton />
					<GiPauseButton />
				</button>
				<button
					className='next btn sbs no-btn'
					onClick={handleNext}>
					<GiNextButton />
				</button>
				<button
					className='single order no-btn'
					value='repeat'
					id='repeat'
					onClick={handleRepeat}
					ref={repeat}>
					<FaRepeat
						style={{ fill: order === 'repeat' ? ' #040b34' : ' #e1f3fe' }}
					/>
				</button>
			</div>
		</main>
	);
};

export default Player;
