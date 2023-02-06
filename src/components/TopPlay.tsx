import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/store";

import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import { Swiper, SwiperSlide } from "swiper/react";

import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import PlayPause from "./PlayPause";

import { IActiveSong, ISong } from "../interface";

interface IProps {
	song: ISong;
	data?: ISong[];
	isPlaying: boolean;
	activeSong: IActiveSong;
	i: number;
	handlePauseClick: () => void;
	handlePlayClick: () => void;
}

export default function TopPlay() {
	const dispatch = useAppDispatch();
	const { activeSong, isPlaying } = useAppSelector((state) => state.player);
	const { data } = useGetTopChartsQuery("world");

	console.log(data);

	const divRef = useRef<HTMLDivElement>(null);

	const handlePauseClick = () => {
		dispatch(playPause(false));
	};

	const handlePlayClick = (song: ISong, i: number) => {
		dispatch(setActiveSong({ song, data, i }));
		dispatch(playPause(true));
	};

	const TopChartCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }: IProps) => (
		<div
			className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
				activeSong?.title === song?.title ? "bg-[#4c426e]" : "bg-transparent"
			} p-2 rounded-lg cursor-pointer mb-2`}
		>
			<h3 className="mr-3 text-base font-bold text-white">{i + 1}.</h3>
			<div className="flex flex-row items-center justify-between flex-1">
				<img className="w-20 h-20 rounded-lg" src={song?.images?.coverart} alt={song?.title} />
				<div className="flex flex-col justify-center flex-1 mx-3">
					<Link to={`/songs/${song.key}`}>
						<p className="text-xl font-bold text-white">{song?.title}</p>
					</Link>
					<Link
						to={song?.artists ? `/artists/${song?.artists[0].adamid}` : `/artists/${song?.url}`}
					>
						<p className="mt-1 text-base text-gray-200">{song?.subtitle}</p>
					</Link>
				</div>
			</div>
			<PlayPause
				isPlaying={isPlaying}
				activeSong={activeSong}
				song={song}
				handlePause={handlePauseClick}
				handlePlay={handlePlayClick}
			/>
		</div>
	);

	useEffect(() => {
		// cuộn về top mỗi khi load
		if (divRef.current) {
			divRef.current.scrollIntoView({ behavior: "smooth" });
		}
	});

	const topPlays = data?.slice(0, 5);

	return (
		<div
			ref={divRef}
			className="flex-1 mb-6 ml-0 xl:ml-6 xl:mb-0 xl:max-w-[440px] max-w-full flex flex-col"
		>
			<div className="flex flex-col w-full">
				<div className="flex-row justify-between flex-center-y">
					<h2 className="text-2xl font-bold text-white">Top Charts</h2>
					<Link to="/top-charts">
						<p className="text-base text-gray-200 cursor-pointer">See more</p>
					</Link>
				</div>
				<div className="flex flex-col gap-1 mt-4">
					{typeof activeSong !== "number" || typeof activeSong === "string" ? (
						<>
							{topPlays?.map((song: ISong, i: number) => (
								<TopChartCard
									song={song}
									i={i}
									key={song.key}
									isPlaying={isPlaying}
									activeSong={activeSong}
									handlePauseClick={handlePauseClick}
									handlePlayClick={() => handlePlayClick(song, i)}
								/>
							))}
						</>
					) : (
						""
					)}
				</div>
			</div>
			<div className="flex flex-col w-full my-8">
				<div className="flex-row justify-between flex-center-y">
					<h2 className="text-2xl font-bold text-white">Top Artists</h2>
					<Link to="/top-artists">
						<p className="text-base text-gray-200 cursor-pointer">See more</p>
					</Link>
				</div>
				<Swiper
					slidesPerView="auto"
					spaceBetween={15}
					freeMode={true}
					centeredSlides
					centeredSlidesBounds
					modules={[FreeMode]}
					className="mt-4"
				>
					{topPlays?.map((song: ISong, i: number) => (
						<SwiperSlide
							key={song.key}
							className="rounded-full shadow-lg"
							style={{ width: "25%", height: "auto" }}
						>
							<Link
								to={
									song?.artists
										? `/artists/${song?.artists[0].adamid}`
										: `/artists/${song?.url}`
								}
							>
								<img
									src={song?.images?.background}
									alt={song?.title}
									className="object-cover w-full rounded-full"
								/>
							</Link>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
}
