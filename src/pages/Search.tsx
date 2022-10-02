import { ISong } from "../interface";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../app/store";
import { Error, Loader, SongCard } from "../components";
import { useGetSongsBySearchQuery } from "../redux/services/shazamCore";

export default function Search() {
	const { searchTerm } = useParams();
	const { activeSong, isPlaying } = useAppSelector((state) => state.player);
	const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);

	isFetching ? <Loader title="Loading songs around you" /> : error && <Error />;
	const songs = data?.tracks.hits.map((song: ISong) => song.track);

	return (
		<div className="flex flex-col">
			<h2 className="mt-4 mb-10 text-2xl font-bold text-left text-white">
				Showing result for <span className="font-black">{searchTerm}</span>
			</h2>

			<div className="flex-wrap gap-4 flex-center sm:justify-start">
				{songs?.map((song: ISong, i: number) => (
					<SongCard
						key={song.key}
						song={song}
						isPlaying={isPlaying}
						activeSong={activeSong}
						data={data}
						i={i}
					/>
				))}
			</div>
		</div>
	);
}
