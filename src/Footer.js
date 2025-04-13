import React from 'react';
import {
	GiNextButton,
	GiPauseButton,
	GiPlayButton,
	GiPreviousButton,
} from 'react-icons/gi';

const Footer = ({
	playing,
	isPlaying,
	handlePlayer,
	handlePlayPause,
	handlePrev,
	handleNext,
}) => {
	return playing.id ? (
		<footer
			className='Footer'
			key={playing.id}>
			<button
				className='songDetail no-btn'
				onClick={e => handlePlayer(playing.id)}>
				<h3>{playing.title}</h3>
				<div className='artist'>
					{playing.artist} | {playing.album}
				</div>
			</button>
			<div className='playBtns'>
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
			</div>
		</footer>
	) : (
		''
	);
};

export default Footer;
