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
			<h1 className='pt-4 text-xl font-bold text-center underline lg:text-2xl 2xl:text-3xl md:mb-10 2xl:mb-20'>
				T.i.t.l.e..L.i.s.t. <br />
			</h1>
			<section className='flex flex-col items-center'>
				<ul className='space-y-2 dark:text-white'>
					{memories.map((memory, index) => (
						<li
							key={memory.title}
							className={`${
								index % 2 !== 0
									? "rotate-[8deg] hover:-rotate-12"
									: "hover:-rotate-12"
							} w-72 lg:max-w-96 text-center px-4 py-2 text-sm bg-black rounded-lg rounded-tr-none rounded-bl-none bg-opacity-85 dark:bg-white dark:bg-opacity-85 font-semibold hover:uppercase`}>
							<Link
								to={`/memories/title/${memory.title}`}
								className='text-white dark:text-black focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-orange-600'>
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
