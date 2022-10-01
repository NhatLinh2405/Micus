import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

export default function SearchBar() {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState<string>("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		navigate(`/search/${searchTerm}`);
	};

	return (
		<form
			onSubmit={handleSubmit}
			autoComplete="off"
			className="p-2 text-gray-200 focus-within:text-white"
		>
			<label htmlFor="search-field" className="sr-only">
				Search all songs
			</label>
			<div className="flex-row justify-start flex-center-y">
				<FiSearch aria-hidden="true" className="w-5 h-5 ml-4" />
				<input
					name="search-field"
					autoComplete="off"
					id="search-field"
					placeholder="Search"
					type="search"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="flex-1 p-4 text-base font-medium text-white placeholder-gray-200 bg-transparent border-none outline-none"
				/>
			</div>
		</form>
	);
}
