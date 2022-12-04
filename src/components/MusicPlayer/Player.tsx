/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useRef } from "react";

interface IProps {
	activeSong: {
		hub: {
			actions: { uri: string }[];
		};
	};
	isPlaying: boolean;
	volume: number;
	seekTime: number;
	repeat: boolean;
	currentIndex: number;
	onEnded: () => void;
	onTimeUpdate: React.ReactEventHandler<HTMLAudioElement>;
	onLoadedData: React.ReactEventHandler<HTMLAudioElement>;
}

export default function Player({
	activeSong,
	isPlaying,
	volume,
	seekTime,
	onEnded,
	onTimeUpdate,
	onLoadedData,
	repeat,
}: IProps) {
	const ref = useRef<HTMLAudioElement>(null);
	// eslint-disable-next-line no-unused-expressions
	if (ref.current) {
		if (isPlaying) {
			ref.current.play();
		} else {
			ref.current.pause();
		}
	}

	useEffect(() => {
		if (ref.current) {
			ref.current.volume = volume;
		}
	}, [volume]);

	useEffect(() => {
		if (ref.current) {
			ref.current.currentTime = seekTime;
		}
	}, [seekTime]);

	return (
		<audio
			src={activeSong?.hub?.actions?.[1].uri}
			ref={ref}
			loop={repeat}
			onEnded={onEnded}
			onTimeUpdate={onTimeUpdate}
			onLoadedData={onLoadedData}
		/>
	);
}
