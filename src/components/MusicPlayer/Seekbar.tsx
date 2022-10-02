interface IProps {
	value: number;
	min: string;
	max: number;
	appTime: number;
	onInput: (e: any) => void;
	setSeekTime: React.Dispatch<React.SetStateAction<number>>;
}

export default function Seekbar({ value, min, max, onInput, setSeekTime, appTime }: IProps) {
	const getTime = (time: number) => `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;
	return (
		<div className="flex-row items-center hidden sm:flex">
			<button
				type="button"
				onClick={() => setSeekTime(appTime - 5)}
				className="hidden text-white lg:mr-4 lg:block"
			>
				-
			</button>
			<p className="text-white">{value === 0 ? "0:00" : getTime(value)}</p>
			<input
				type="range"
				step="step"
				value={value}
				min={min}
				max={max}
				onInput={onInput}
				className="w-24 h-1 mx-4 rounded-lg md:block md:w-56 2xl:w-96 2xl:mx-6"
			/>
			<p className="text-white">{max === 0 ? "0:00" : getTime(max)}</p>
			<button
				type="button"
				onClick={() => setSeekTime(appTime + 5)}
				className="hidden text-white lg:ml-4 lg:block"
			>
				+
			</button>
		</div>
	);
}
