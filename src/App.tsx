import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "./app/store";
import { MusicPlayer, SearchBar, SideBar, TopPlay } from "./components";
import { AroundYou, ArtistDetails, Discover, Search, SongDetails, TopArtists, TopCharts } from "./pages";

const App = () => {
	const { activeSong } = useAppSelector((state) => state.player);
	return (
		<div className="container relative flex">
			<SideBar />
			<div className="flex flex-col flex-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
				<SearchBar />

				<div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
					<div className="flex-1 pb-40 h-fit">
						<Routes>
							<Route path="/" element={<Discover />} />
							<Route path="/top-artists" element={<TopArtists />} />
							<Route path="/top-charts" element={<TopCharts />} />
							<Route path="/around-you" element={<AroundYou />} />
							<Route path="/artists/:id" element={<ArtistDetails />} />
							<Route path="/songs/:songid" element={<SongDetails />} />
							<Route path="/search/:searchTerm" element={<Search />} />
						</Routes>
					</div>
					<div className="relative top-0 overflow-y-scroll xl:sticky hide-scrollbar">
						<TopPlay />
					</div>
				</div>
			</div>

			{activeSong?.title && (
				<div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
					<MusicPlayer />
				</div>
			)}
		</div>
	);
};

export default App;
