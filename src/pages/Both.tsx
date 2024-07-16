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
		<>
			{/* <div className='flex flex-col items-center gap-6 pt-6 text-right'>
				<h1 className='pt-4 pb-6 text-xl font-bold text-center'>B.O.T.H</h1>
				<p>Welcome to Both MEMORIES!</p>
			</div> */}
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

export default Both;
