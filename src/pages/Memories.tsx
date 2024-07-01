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
import ScrollUpBtn from "../partials/ScrollUpBtn";
import DarkModeBtn from "../partials/DarkModeBtn";

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
		<article className='flex flex-col items-center gap-6 pt-6'>
			<ScrollUpBtn />
			<DarkModeBtn />
			<h1 className='pb-6 text-xl font-bold text-center uppercase'>
				A.l.l..M.e.m.o.r.i.e.s.
			</h1>
			<Suspense fallback={<LoadingSpinner />}>
				<Await
					resolve={deferredData.memories}
					errorElement={<p>Could not load memories.</p>}>
					<ViewMemories />
				</Await>
			</Suspense>
			<button
				className='flex px-3 py-1 my-10 text-black bg-red-600 rounded-md w-fit'
				type='button'>
				Delete Memory
			</button>
		</article>
	);
};

export default Memories;
