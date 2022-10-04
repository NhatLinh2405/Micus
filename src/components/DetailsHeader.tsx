import { Link } from "react-router-dom";
import { ISong } from "../interface";

interface IProps {
	artistId: string;
	artistData?: any;
	songData?: ISong;
}

export default function DetailsHeader({ artistId, artistData, songData }: IProps) {
	const artist = artistData?.artists[artistId].attributes;

	return (
		<div className="relative flex flex-col w-full">
			<div className="w-full bg-gradient-to-l from-transparent rounded-2xl to-black sm:h-60 h-36" />
			<div className="absolute sm:left-6 sm:top-6 top-4 left-3 flex-center-y">
				<img
					src={
						artistId
							? artist.artwork.url.replace("{w}", "500").replace("{h}", "500")
							: songData?.images.coverart
					}
					className="object-cover border-2 rounded-full shadow-xl sm:w-48 w-28 h-28 sm:h-48 shadow-black"
					alt="art"
				/>
				<div className="ml-5">
					<p className="text-xl font-bold text-white sm:text-3xl">
						{artistId ? artist.name : songData?.title}
					</p>
					{!artistId && (
						<Link to={`/artists/${songData?.artists[0].adamid}`}>
							<p className="mt-2 text-base text-gray-200">{songData?.subtitle}</p>
						</Link>
					)}
					<p className="mt-2 text-base text-gray-200">
						{artistId ? artist?.genreNames[0] : songData?.genres?.primary}
					</p>
				</div>
			</div>
			<div className="w-full h-12 sm:h-16" />
		</div>
	);
}
