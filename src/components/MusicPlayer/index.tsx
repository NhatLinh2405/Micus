import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { nextSong, prevSong, playPause } from "../../redux/features/playerSlice";
import Controls from "./Controls";
import Player from "./Player";
import Seekbar from "./Seekbar";
import Track from "./Track";
import VolumeBar from "./VolumeBar";

const MusicPlayer = () => {
	const { activeSong, currentSongs, currentIndex, isActive, isPlaying } = useAppSelector(
		(state) => state.player
	);
	const [duration, setDuration] = useState<number>(0);
	const [seekTime, setSeekTime] = useState<number>(0);
	const [appTime, setAppTime] = useState<number>(0);
	const [volume, setVolume] = useState<number>(0.3);
	const [repeat, setRepeat] = useState<boolean>(false);
	const [shuffle, setShuffle] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (currentSongs.length) dispatch(playPause(true));
	}, [currentIndex, currentSongs, dispatch]);

	const handlePlayPause = () => {
		if (!isActive) return;

		isPlaying ? dispatch(playPause(false)) : dispatch(playPause(true));
	};

	const handleNextSong = () => {
		dispatch(playPause(false));

		if (!shuffle) {
			dispatch(nextSong((currentIndex + 1) % currentSongs.length));
		} else {
			dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
		}
	};

	const handlePrevSong = () => {
		if (currentIndex === 0) {
			dispatch(prevSong(currentSongs.length - 1));
		} else if (shuffle) {
			dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
		} else {
			dispatch(prevSong(currentIndex - 1));
		}
	};

	const handleTimeUpdate = (e: any) => {
		setAppTime(e.target.currentTime);
	};

	const handleLoadedData = (e: any) => {
		setDuration(e.target.duration);
	};

	return (
		<div className="relative flex items-center justify-between w-full px-8 sm:px-12">
			<Track isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} />
			<div className="flex flex-col items-center justify-center flex-1">
				<Controls
					isPlaying={isPlaying}
					isActive={isActive}
					repeat={repeat}
					setRepeat={setRepeat}
					shuffle={shuffle}
					setShuffle={setShuffle}
					currentSongs={currentSongs}
					handlePlayPause={handlePlayPause}
					handlePrevSong={handlePrevSong}
					handleNextSong={handleNextSong}
				/>
				<Seekbar
					value={appTime}
					min="0"
					max={duration}
					onInput={(e) => setSeekTime(e.target.value)}
					setSeekTime={setSeekTime}
					appTime={appTime}
				/>
				<Player
					activeSong={activeSong}
					volume={volume}
					isPlaying={isPlaying}
					seekTime={seekTime}
					repeat={repeat}
					currentIndex={currentIndex}
					onEnded={handleNextSong}
					onTimeUpdate={handleTimeUpdate}
					onLoadedData={handleLoadedData}
				/>
			</div>
			<VolumeBar
				value={volume}
				min="0"
				max="1"
				onChange={(e: any) => setVolume(e.target.value)}
				setVolume={setVolume}
			/>
		</div>
	);
};

export default MusicPlayer;
