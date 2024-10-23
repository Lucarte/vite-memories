import Client from "meilisearch";
import { useState, useEffect, useCallback } from "react";
import { SearchResult } from "../types/SearchResult";
// import { Index } from "meilisearch";
import LineSpinner from "./LineSpinner";
import { Link } from "react-router-dom";

// Initialize Meilisearch client
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
	const [query, setQuery] = useState(initialQuery || "");
	const [results, setResults] = useState<SearchResult[]>([]);
	const [loading, setLoading] = useState(false);

	// Function to handle the search operation
	const handleSearch = useCallback(async () => {
		setLoading(true);
		try {
			const index = client.index("memories");
			const searchResults = await index.search<SearchResult>(query, {
				filter: category ? `category = "${category}"` : "",
			});
			setResults(searchResults.hits as SearchResult[]);
		} catch (error) {
			console.error("Error searching:", error);
		}
		setLoading(false);
	}, [query, category]); // Add query and category as dependencies

	// Effect to perform search when query changes
	useEffect(() => {
		if (query.length > 0) {
			handleSearch();
		} else {
			setResults([]);
		}
	}, [query, handleSearch]); // Add handleSearch as a dependency
	// // Function to handle the search operation
	// const handleSearch = async () => {
	// 	setLoading(true);
	// 	try {
	// 		const index: Index = client.index("memories");
	// 		const searchResults = await index.search<SearchResult>(query, {
	// 			filter: category ? `category = "${category}"` : "",
	// 		});
	// 		setResults(searchResults.hits as SearchResult[]);
	// 	} catch (error) {
	// 		console.error("Error searching:", error);
	// 	}
	// 	setLoading(false);
	// };

	// // Effect to perform search when query changes
	// useEffect(() => {
	// 	if (query.length > 0) {
	// 		handleSearch();
	// 	} else {
	// 		setResults([]);
	// 	}
	// }, [query]);

	return (
		<div className=''>
			<input
				className='w-screen md:max-w-[25rem] h-12 p-2 mb-3 text-center mt-28 ring-inset ring-gray-900 focus:ring-2 focus:ring-inset focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-1 focus-visible:outline-orange-600'
				type='text'
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder='Search...'
			/>
			{loading && <LineSpinner />}
			<div className='flex flex-col items-center'>
				<h1 className='mt-10 mb-4 text-xl font-semibold tracking-wider text-white dark:text-black'>
					Search Results:
				</h1>
				<ul className='space-y-2 dark:text-white'>
					{results.map((result, index: number) => (
						<li
							key={result.title}
							className={`${
								index % 2 !== 0
									? "rotate-[8deg] hover:-rotate-12"
									: "hover:-rotate-12"
							} w-72 lg:max-w-96 text-center px-4 py-2 text-sm bg-white rounded-lg rounded-tr-none rounded-bl-none bg-opacity-85 dark:bg-black dark:bg-opacity-85 font-semibold hover:uppercase`}>
							<Link
								to={`/memories/title/${result.title}`}
								className='text-black dark:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-orange-600'
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
