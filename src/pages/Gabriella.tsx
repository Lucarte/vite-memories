import React, { Suspense } from "react";
import {
	useLoaderData,
	Await,
	LoaderFunction,
	redirect,
	defer,
} from "react-router-dom";
import HerzSpinner from "../components/HerzSpinner"; // Loading spinner component
import ViewMemories from "../components/ViewMemories";
import { MemoryValues } from "../types/MemoryValues";
import { getMemoriesByKid, loggedInData } from "../utils/api";

interface DeferredLoaderData {
	memories: MemoryValues[];
}

export const loader: LoaderFunction = async ({ params }) => {
	// Check if logged in
	const { loggedIn } = await loggedInData();
	if (!loggedIn) {
		return redirect("/login");
	}

	const { kid } = params;
	if (!kid) {
		console.error("No kid parameter provided.");
		return defer({ memories: [] });
	}

	try {
		const response = await getMemoriesByKid(kid);
		const memories = response.Memories;
		return defer({ memories });
	} catch (error) {
		console.error(`Error fetching memories for kid ${kid}:`, error);
		return defer({ memories: [] }); // Return empty array or handle error
	}
};
const Gabriella = () => {
	const deferredData = useLoaderData() as DeferredLoaderData;
	console.log("Deferred Data:", deferredData);
	return (
		<>
			<div className='flex flex-col items-center gap-6 pt-6 text-right'>
				<h1 className='pt-4 pb-6 text-xl font-bold text-center'>
					Gabriella's Page
				</h1>
				<p>Welcome to Gabriella's MEMORIES!</p>
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

export default Gabriella;
