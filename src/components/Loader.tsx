import loader from "../assets/loader.svg";

interface IProps {
	title: string;
}

export default function Loader({ title }: IProps) {
	return (
		<div className="flex-col w-full flex-center ">
			<img src={loader} alt="loader" className="object-contain w-32 h-32" />
			<h1 className="mt-2 text-2xl font-bold text-white">{title || "Loading..."}</h1>
		</div>
	);
}
