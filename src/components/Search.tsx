import Client from "meilisearch";
import { useState, useEffect } from "react";
import { SearchResult } from "../types/SearchResult";
import { Index } from "meilisearch";
import LineSpinner from "./LineSpinner";
import { Link } from "react-router-dom";

const client = new Client({
	host: import.meta.env.VITE_MEILISEARCH_HOST,
	apiKey: import.meta.env.VITE_MEILISEARCH_API_KEY,
});

export type SearchProps = {
	initialQuery?: string;
	category?: string;
	// to handle closing search
	onResultClick: () => void;
};

const Search = ({ onResultClick, initialQuery, category }: SearchProps) => {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<SearchResult[]>([]);
	const [loading, setLoading] = useState(false);

	const handleSearch = async () => {
		setLoading(true);
		try {
			const index: Index = client.index("memories");
			const searchResults = await index.search<SearchResult>(query, {
				filter: category ? `category = "${category}"` : "",
			});
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
						className='gap-2 px-2 py-1 my-5 rounded-md rounded-tr-none rounded-bl-none translate-deg w-fit'>
						<Link
							to={`/memories/title/${result.title}`}
							className='text-white dark:text-black'
							onClick={onResultClick}>
							{result.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Search;
