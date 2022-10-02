import { IActiveSong } from "../../interface";
interface IProps {
	activeSong: IActiveSong;
	isActive: boolean;
	isPlaying: boolean;
}

export default function Track({ isPlaying, isActive, activeSong }: IProps) {
	return (
		<div className="flex items-center justify-start flex-1">
			<div
				className={`${
					isPlaying && isActive ? "animate-[spin_3s_linear_infinite]" : ""
				} hidden sm:block h-16 w-16 mr-4`}
			>
				<img src={activeSong?.images?.coverart} alt="cover art" className="rounded-full" />
			</div>
			<div className="w-[50%]">
				<p className="text-lg font-bold text-white truncate">
					{activeSong?.title ? activeSong?.title : "No active Song"}
				</p>
				<p className="text-gray-200 truncate">
					{activeSong?.subtitle ? activeSong?.subtitle : "No active Song"}
				</p>
			</div>
		</div>
	);
}
