import axios from "axios";
import { ISong } from "../interface";

import { useState, useEffect } from "react";
import { useAppSelector } from "../app/store";

import { Loader, SongCard } from "../components";
import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";

export default function AroundYou() {
	const [country, setCountry] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);
	const { activeSong, isPlaying } = useAppSelector((state) => state.player);
	const { data, isFetching } = useGetSongsByCountryQuery(country);

	useEffect(() => {
		axios
			.get(`https://geo.ipify.org/api/v2/country?apiKey=${process.env.REACT_APP_GEO_API_KEY}`)
			.then((res) => setCountry(res?.data?.location.country))
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	}, [country]);

	if (isFetching && loading) return <Loader title="Loading Songs around you..." />;

	return (
		<div className="flex flex-col">
			<h2 className="mt-4 mb-10 text-3xl font-bold text-left text-white">
				Around You <span className="font-black">{country}</span>
			</h2>

			<div className="flex-wrap gap-4 flex-center sm:justify-start">
				{data ? (
					// Phần around you đã hoạt động, nhưng do API không có data nên không thể test
					data?.map((song: ISong, i: number) => (
						<SongCard
							key={song.key}
							song={song}
							isPlaying={isPlaying}
							activeSong={activeSong}
							data={data}
							i={i}
						/>
					))
				) : (
					<>
						{country === "VN" ? (
							<h3 className="text-2xl font-bold text-white">
								Due to the data returned by the backend, there is no Vietnam coutry even
								though there is a Vietnamese song
							</h3>
						) : (
							<h3 className="text-2xl font-bold text-white">No songs found</h3>
						)}
					</>
				)}
			</div>
		</div>
	);
}
