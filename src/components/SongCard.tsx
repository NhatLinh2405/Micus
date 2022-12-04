import { Link } from "react-router-dom";
import { useAppDispatch } from "../app/store";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import PlayPause from "./PlayPause";

import { IActiveSong, ISong } from "../interface";

interface Props {
	song: ISong;
	isPlaying: boolean;
	activeSong: IActiveSong;
	data: unknown;
	i: number;
}

export default function SongCard({ song, isPlaying, activeSong, data, i }: Props) {
	const dispatch = useAppDispatch();

	const handlePauseClick = () => {
		dispatch(playPause(false));
	};

	const handlePlayClick = () => {
		dispatch(setActiveSong({ song, data, i }));
		dispatch(playPause(true));
	};

	return (
		<div className="flex flex-col w-[250px] p-3 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
			<div className="relative w-full h-56 group">
				<div
					className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
						activeSong?.title === song.title ? "flex bg-black bg-opacity-70" : "hidden"
					}`}
				>
					<PlayPause
						isPlaying={isPlaying}
						activeSong={activeSong}
						song={song}
						handlePause={handlePauseClick}
						handlePlay={handlePlayClick}
					/>
				</div>
				<img src={song.images?.coverart} alt="song-_img" />
			</div>
			<div className="flex flex-col mt-4">
				<p className="text-lg font-semibold text-white">
					<Link to={`/songs/${song?.key}`}>{song.title}</Link>
				</p>
				<p className="mt-1 text-sm text-gray-200 truncate">
					<Link to={song.artists ? `/artists/${song.artists[0].adamid}` : "/top-artists"}>
						{song.subtitle}
					</Link>
				</p>
			</div>
		</div>
	);
}
