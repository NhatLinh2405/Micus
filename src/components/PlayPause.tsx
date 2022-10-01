import { AiOutlinePauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { ISong, IActiveSong } from "../interface";

interface IProps {
	song: ISong;
	isPlaying: boolean;
	activeSong: IActiveSong;
	handlePause: () => void;
	handlePlay: () => void;
}

export default function PlayPause({ isPlaying, activeSong, song, handlePause, handlePlay }: IProps) {
	return (
		<>
			{isPlaying && activeSong?.title === song.title ? (
				<AiOutlinePauseCircle size={50} className="text-white" onClick={handlePause} />
			) : (
				<AiFillPlayCircle size={50} className="text-white" onClick={handlePlay} />
			)}
		</>
	);
}
