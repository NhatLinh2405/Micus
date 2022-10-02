import SongBar from "./SongBar";
import { ISong, IActiveSong } from "../interface";

interface IProps {
	artistId: string;
	data: ISong[];
	isPlaying: boolean;
	activeSong: IActiveSong;
	handlePlayClick: (song: ISong, i: number) => void;
	handlePauseClick: () => void;
}

export default function RelatedSongs({
	data,
	artistId,
	isPlaying,
	activeSong,
	handlePlayClick,
	handlePauseClick,
}: IProps) {
	return (
		<div className="flex flex-col">
			<h1 className="text-3xl font-bold text-white">Related Songs:</h1>
			<div className="flex flex-col w-full mt-6">
				{data?.map((song: ISong, i: number) => (
					<SongBar
						key={`${artistId}-${song.key}-${i}`}
						song={song}
						i={i}
						artistId={artistId}
						isPlaying={isPlaying}
						activeSong={activeSong}
						handlePauseClick={handlePauseClick}
						handlePlayClick={handlePlayClick}
					/>
				))}
			</div>
		</div>
	);
}
