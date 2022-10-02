import { useParams } from "react-router-dom";
import { useAppSelector } from "../app/store";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";

export default function ArtistDetails() {
	const { id: artistId } = useParams<string>();
	const { activeSong, isPlaying } = useAppSelector((state) => state.player);

	const {
		data: artistData,
		isFetching: isFetchingArtistDetails,
		error,
	} = useGetArtistDetailsQuery(artistId);

	if (isFetchingArtistDetails) return <Loader title="Loading artist details..." />;
	if (error) return <Error />;

	return (
		<>
			{artistId ? (
				<div className="flex flex-col">
					<DetailsHeader artistId={artistId} artistData={artistData} />

					<RelatedSongs
						data={Object.values(artistData?.songs)}
						artistId={artistId}
						isPlaying={isPlaying}
						activeSong={activeSong}
						handlePlayClick={() => {}}
						handlePauseClick={() => {}}
					/>
				</div>
			) : (
				<h1>wrongs</h1>
			)}
		</>
	);
}
