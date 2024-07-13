/* eslint-disable react-refresh/only-export-components */
import { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";
import HerzSpinner from "../components/HerzSpinner"; // Loading spinner component
import ViewMemories from "../components/ViewMemories";
import { MemoryValues } from "../types/MemoryValues";
import { memoryLoader } from "../utils/memoryLoader"; // Import the loader function

interface DeferredLoaderData {
	memories: MemoryValues[];
}

export const loader = memoryLoader; // Correctly assign the loader function

const Pablo = () => {
	const deferredData = useLoaderData() as DeferredLoaderData;
	console.log("Deferred Data:", deferredData);
	return (
		<>
			<div className='flex flex-col items-center gap-6 pt-6 text-right'>
				<h1 className='pt-4 pb-6 text-xl font-bold text-center'>P.A.B.L.O</h1>
				<p>Welcome to Pablo's MEMORIES!</p>
			</div>
			<section className='w-screen'>
				<Suspense
					fallback={
						<div className='flex justify-center w-screen'>
							<HerzSpinner />
						</div>
					}>
					<Await
						resolve={deferredData.memories}
						errorElement={<p>Could not load memories.</p>}>
						{(loadedMemories) => <ViewMemories memories={loadedMemories} />}
					</Await>
				</Suspense>
			</section>
		</>
	);
};

export default Pablo;
