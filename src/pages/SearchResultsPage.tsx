import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import http from "../utils/http";
import { MemoryValues } from "../types/MemoryValues";

const SearchResultsPage = () => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const category = queryParams.get("category");
	const [memories, setMemories] = useState<MemoryValues[]>([]);

	useEffect(() => {
		if (category) {
			// Fetch memories for the selected category
			http
				.get(`/api/memories?category=${encodeURIComponent(category)}`)
				.then((response) => setMemories(response.data)) // Ensure response.data matches Memory type
				.catch((error) => console.error("Error fetching memories:", error));
		}
	}, [category]);

	return (
		<div>
			<h1>Results for: {category}</h1>
			<ul>
				{memories.map((memory) => (
					<li key={memory.id}>
						<a href={`/memory/${memory.id}`} className='underline'>
							{memory.title}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default SearchResultsPage;
