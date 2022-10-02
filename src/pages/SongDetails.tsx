import { useParams } from "react-router-dom";
import { DetailsHeader, RelatedSongs, Error, Loader } from "../components";

import { useAppDispatch, useAppSelector } from "../app/store";

import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from "../redux/services/shazamCore";
import { ISong } from "../interface";

export default function SongDetails() {
	const dispatch = useAppDispatch();
	const { songid } = useParams<string>();
	const { activeSong, isPlaying } = useAppSelector((state) => state.player);

	const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery(songid);
	const { data, isFetching: isFetchingRelatedSongs, error } = useGetSongRelatedQuery(songid);

	const handlePauseClick = () => {
		dispatch(playPause(false));
	};

	const handlePlayClick = (song: ISong, i: number) => {
		dispatch(setActiveSong({ song, data, i }));
		dispatch(playPause(true));
	};
	if (isFetchingSongDetails && isFetchingRelatedSongs) return <Loader title="Searching song details" />;
	if (error) return <Error />;

	return (
		<div className="flex flex-col">
			<DetailsHeader artistId="" songData={songData} />
			<div className="mb-10">
				<h2 className="text-3xl font-bold text-white">Lyrics:</h2>
				<div className="mt-5">
					{songData?.sections[1].type === "LYRICS" ? (
						songData?.sections[1].text.map((line: number, i: number) => (
							<p key={i} className="my-1 text-base text-gray-200">
								{line}
							</p>
						))
					) : (
						<p className="text-base text-gray-200">Sorry, no lyrics found!</p>
					)}
				</div>
			</div>

			<RelatedSongs
				data={data}
				artistId=""
				isPlaying={isPlaying}
				activeSong={activeSong}
				handlePlayClick={handlePlayClick}
				handlePauseClick={handlePauseClick}
			/>
		</div>
	);
}
