import { useAppSelector } from "../app/store";
import { ISong } from "../interface";
import { Error, Loader, SongCard } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

export default function TopCharts() {
	const { activeSong, isPlaying } = useAppSelector((state) => state.player);
	const { data, isFetching, error } = useGetTopChartsQuery("world");

	if (isFetching) return <Loader title="Loading songs around you" />;
	if (error) return <Error />;

	return (
		<div className="flex flex-col">
			<h2 className="mt-4 mb-10 text-3xl font-bold text-left text-white">Discover Top Charts</h2>

			<div className="flex-wrap gap-4 flex-center sm:justify-start">
				{/* {typeof activeSong !== "number" || typeof activeSong === "string" ? <></> : ""} */}
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
