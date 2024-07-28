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
		<div className=''>
			<input
				className='w-screen h-12 p-2 mb-3 text-center mt-28 ring-inset ring-gray-900 focus:ring-2 focus:ring-inset focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-1 focus-visible:outline-orange-600'
				type='text'
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder='Search...'
			/>
			{loading && <LineSpinner />}
			<div className='flex flex-col items-center'>
				<ul className='space-y-2 dark:text-white'>
					<h1 className='mt-10 mb-4 text-xl font-semibold tracking-wider text-white dark:text-black'>
						Search Results:
					</h1>
					{results.map((result, index: number) => (
						<li
							key={result.title}
							className={`${
								index % 2 === 0 ? "rotate-0" : "rotate-[8deg]"
							} hover:text-xl w-72 text-center px-4 py-2 text-sm bg-white rounded-lg rounded-tr-none rounded-bl-none bg-opacity-85 dark:bg-black rotate-12 dark:bg-opacity-85 font-semibold`}>
							<Link
								to={`/memories/title/${result.title}`}
								className='text-black dark:text-white'
								onClick={onResultClick}>
								{result.title}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Search;
