import { MemoryValues } from "../types/MemoryValues";
import http from "../utils/http";
import { Link, LoaderFunction, useLoaderData } from "react-router-dom";

const Memories = () => {
	const memories = useLoaderData() as MemoryValues[];

	return (
		<div className='flex flex-col gap-12'>
			<h1>Memories</h1>
			{memories ? (
				memories.map((memory) => {
					return (
						<div key={memory.title}>
							<Link to={memory.title} key={memory.title}>
								<ul>
									<li>Kid: {memory.kid}</li>
									<li>Title: {memory.title}</li>
									<li>Description: {memory.description}</li>
									<li>Year: {memory.year}</li>
									<li>Month: {memory.month}</li>
									<li>Day: {memory.day}</li>
									<li>Files: {memory.file_paths}</li>
									<li>URLs: {memory.urls}</li>
								</ul>
							</Link>
						</div>
					);
				})
			) : (
				<p>No Memories found.</p>
			)}
		</div>
	);
};

export default Memories;

// Memories loader
export const loader: LoaderFunction = async () => {
	try {
		const res = await http.get("/api/auth/memories");

		if (res.status !== 200) {
			throw new Error("Failed to fetch memories");
		}

		return res.data.Memories || [];
	} catch (error) {
		console.error("Error fetching memories:", error);
		throw error; // This will be caught by react-router-dom and trigger the errorElement
	}
};
