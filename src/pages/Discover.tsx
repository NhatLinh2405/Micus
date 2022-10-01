import { genres } from "../constant/constants";
import { Error, Loader, SongCard } from "../components";
import { useAppDispatch, useAppSelector } from "../app/store";
import { selectGenreListId } from "../redux/features/playerSlice";
import { useGetSongsByGenreQuery } from "../redux/services/shazamCore";

import { ISong } from "../interface";

export default function Discover() {
	const dispatch = useAppDispatch();
	const { activeSong, isPlaying, genreListId } = useAppSelector((state) => state.player);
	const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || "POP");

	const genreTitle = genres.find(({ value }) => value === genreListId)?.title || "POP";

	if (isFetching) return <Loader title="Loading songs..." />;
	if (error) return <Error />;
	return (
		<div className="flex flex-col">
			<div className="flex-col justify-between w-full mt-4 mb-10 flex-center-y sm:flex-row">
				<h2 className="text-3xl font-bold text-left text-white">Discover {genreTitle}</h2>
				<select
					onChange={(e) => dispatch(selectGenreListId(e.target.value))}
					value={"POP" || "POP"}
					className="p-3 mt-5 text-sm text-gray-200 bg-black rounded-lg outline-none sm:mt-0"
				>
					{genres.map((genre) => (
						<option key={genre.id} value={genre.value}>
							{genre.value}
						</option>
					))}
				</select>
			</div>
			<div className="flex-wrap gap-4 flex-center-x sm:justify-start">
				{data?.map((song: ISong, i: number) => (
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
