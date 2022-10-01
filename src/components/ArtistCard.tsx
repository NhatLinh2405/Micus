import { useNavigate } from "react-router-dom";
import { IArtists } from "../interface";

interface IProps {
	track: IArtists;
}

export default function ArtistCard({ track }: IProps) {
	const navigate = useNavigate();

	return (
		<div
			className="flex flex-col w-[250px] p-3 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
			onClick={() => navigate(`/artists/${track?.artists[0].adamid}`)}
		>
			<img alt="song_img" src={track?.images?.coverart} className="w-full h-56 rounded-lg" />
			<p className="mt-4 text-lg font-semibold text-white truncate">{track?.subtitle}</p>
		</div>
	);
}
