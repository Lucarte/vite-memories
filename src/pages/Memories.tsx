import { MemoryValues } from "../types/MemoryValues";
import { getAllMemories, isLoggedIn } from "../utils/api";
import {
	Await,
	Link,
	LoaderFunction,
	defer,
	redirect,
	useLoaderData,
} from "react-router-dom";

import { Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ViewMemories from "../components/ViewMemories";

type DeferredLoaderData = {
	memories: Promise<MemoryValues[]>;
};

// Memories loader
export const loader: LoaderFunction = async () => {
	// Are we logged in? if not, redirect!
	const loggedIn = await isLoggedIn();
	if (!loggedIn) return redirect("/login");

	return defer({ memories: getAllMemories() });
};

const Memories = () => {
	const deferredData = useLoaderData() as DeferredLoaderData;

	return (
		<section className='flex flex-col gap-12'>
			<h1 className='text-xl font-bold text-center uppercase'>Memories</h1>
			<Suspense fallback={<LoadingSpinner />}>
				<Await
					resolve={deferredData.memories}
					errorElement={<p>Could not load memories.</p>}>
					<ViewMemories />
				</Await>
			</Suspense>
		</section>
	);
};

export default Memories;
