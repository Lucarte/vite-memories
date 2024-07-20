// Both.tsx
/* eslint-disable react-refresh/only-export-components */
import { Suspense } from "react";
import {
	useLoaderData,
	Await,
	LoaderFunction,
	redirect,
	defer,
} from "react-router-dom";
import HerzSpinner from "../components/HerzSpinner";
import ViewMemories from "../components/ViewMemories";
import { MemoryValues } from "../types/MemoryValues";
import { getBrunnisMemories, loggedInData } from "../utils/api";

interface DeferredLoaderData {
	memories: MemoryValues[];
}

export const loader: LoaderFunction = async () => {
	// Check if logged in
	const { loggedIn } = await loggedInData();
	if (!loggedIn) {
		return redirect("/login");
	}

	try {
		const response = await getBrunnisMemories();
		const memories = response.Memories;
		return defer({ memories });
	} catch (error) {
		console.error(`Error fetching memories for Brunnis:`, error);
		return defer({ memories: [] }); // Return empty array or handle error
	}
};

const Both = () => {
	const deferredData = useLoaderData() as DeferredLoaderData;
	console.log("Deferred Data:", deferredData);
	return (
		<article className='flex flex-col items-center pr-20 mt-12 mb-20 text-right'>
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
		</article>
	);
};

export default Both;
