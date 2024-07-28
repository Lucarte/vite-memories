/* eslint-disable react-refresh/only-export-components */

import { useLoaderData, Link } from "react-router-dom";
import { MemoryValues } from "../types/MemoryValues";
import { LoaderFunction } from "react-router-dom";
import { getAllMemories } from "../utils/api";

// Define props for TitleList component to accept an array of MemoryValues
interface TitleListProps {
	memories: Pick<MemoryValues, "title">[];
}

const TitleList = () => {
	const memories = useLoaderData() as TitleListProps["memories"];

	return (
		<article className='flex flex-col items-center gap-6 pt-6 text-right'>
			<h1 className='pt-4 text-xl font-bold text-center underline'>
				T.i.t.l.e..L.i.s.t. <br />
			</h1>
			<section className='w-screen'>
				<ul className='list-disc'>
					{memories.map((memory, index) => (
						<li
							key={index}
							className='p-2 my-2 text-center text-white bg-black '>
							<Link
								to={`/memories/title/${memory.title}`}
								className='text-white'>
								{memory.title}
							</Link>
						</li>
					))}
				</ul>
			</section>
		</article>
	);
};

export const loader: LoaderFunction = async () => {
	try {
		const memories: MemoryValues[] = await getAllMemories();
		// Extract only the titles
		const memoryTitles = memories.map((memory) => ({ title: memory.title }));
		return memoryTitles;
	} catch (error) {
		console.error("Error fetching memory titles:", error);
		return [];
	}
};

export default TitleList;
