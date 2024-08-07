/* eslint-disable react-refresh/only-export-components */
import { Suspense, useEffect, useState } from "react";
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
import { getGabisMemories, loggedInData } from "../utils/api";
import ViewMemoriesXL from "../components/ViewMemoriesXL";

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
		const response = await getGabisMemories();
		const memories = response.Memories;
		return defer({ memories });
	} catch (error) {
		console.error(`Error fetching memories for kid Gabi:`, error);
		return defer({ memories: [] }); // Return empty array or handle error
	}
};

const Gabriella = () => {
	const deferredData = useLoaderData() as DeferredLoaderData;
	const [isMobile, setIsMobile] = useState<boolean>(false);

	useEffect(() => {
		// first check screen size
		const checkScreenSize = () => {
			setIsMobile(window.innerWidth < 768);
		};
		// check initial size
		checkScreenSize();

		window.addEventListener("resize", checkScreenSize);

		// cleanup function
		return () => {
			window.removeEventListener("resize", checkScreenSize);
		};
	}, []);

	return (
		<article className='flex flex-col items-center mb-20 text-right search'>
			<Suspense
				fallback={
					<div className='flex justify-center w-screen'>
						<HerzSpinner />
					</div>
				}>
				<Await
					resolve={deferredData.memories}
					errorElement={<p>Could not load memories.</p>}>
					{(loadedMemories) =>
						isMobile ? (
							<ViewMemories memories={loadedMemories} />
						) : (
							<ViewMemoriesXL memories={loadedMemories} />
						)
					}
				</Await>
			</Suspense>
		</article>
	);
};

export default Gabriella;
