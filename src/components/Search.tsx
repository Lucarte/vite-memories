import Client from "meilisearch";
import { useState, useEffect } from "react";
import { SearchResult } from "../types/SearchResult";
import { Index } from "meilisearch";
import LineSpinner from "./LineSpinner";
import { Link } from "react-router-dom";

const client = new Client({
	host: import.meta.env.VITE_MEILISEARCH_HOST, // Ensure this matches your .env variable
	apiKey: import.meta.env.VITE_MEILISEARCH_API_KEY, // Ensure this matches your .env variable
});

interface SearchProps {
	onResultClick: () => void; // to handle closing search
}

const Search = ({ onResultClick }: SearchProps) => {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<SearchResult[]>([]);
	const [loading, setLoading] = useState(false);

	const handleSearch = async () => {
		setLoading(true);
		try {
			const index: Index = client.index("memories");
			const searchResults = await index.search<SearchResult>(query);

			setResults(searchResults.hits as SearchResult[]);
		} catch (error) {
			console.error("Error searching:", error);
		}
		setLoading(false);
	};

	useEffect(() => {
		if (query.length > 0) {
			handleSearch();
		} else {
			setResults([]);
		}
	}, [query]);

	const handleResultClick = () => {
		onResultClick(); // Close search when result is clicked
	};

	return (
		<div>
			<input
				className='p-2 rounded mt-28'
				type='text'
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder='Search...'
			/>
			{loading && <LineSpinner />}
			<ul>
				{results.map((result) => (
					<li
						key={result.title}
						className='gap-3 px-2 py-1 my-5 bg-black translate-deg rounded-2xl w-fit border-tr-none'>
						<Link
							to={`/memories/title/${result.title}`}
							className='text-white dark:text-black'
							onClick={handleResultClick} // Close search on click
						>
							{result.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Search;
