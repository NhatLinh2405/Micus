import { IArtists } from "../interface";
import { ArtistCard, Error, Loader } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

export default function TopArtists() {
	const { data, isFetching, error } = useGetTopChartsQuery("world");

	if (isFetching) return <Loader title="Loading songs around you" />;
	if (error) return <Error />;

	return (
		<div className="flex flex-col">
			<h2 className="mt-4 mb-10 text-3xl font-bold text-left text-white">Top Artists</h2>

			<div className="flex-wrap gap-4 flex-center sm:justify-start">
				{data?.map((track: IArtists) => (
					<ArtistCard key={track.key} track={track} />
				))}
			</div>
		</div>
	);
}
