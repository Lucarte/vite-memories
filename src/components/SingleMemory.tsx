/* eslint-disable react-refresh/only-export-components */
import {
	Await,
	LoaderFunction,
	defer,
	redirect,
	useLoaderData,
} from "react-router-dom";
import { MemoryValues } from "../types/MemoryValues";
import { getMemoryByTitle, loggedInData } from "../utils/api";
import ScrollUpBtn from "../partials/ScrollUpBtn";
import DarkModeBtn from "../partials/DarkModeBtn";
import { Suspense, useState } from "react";
import classNames from "classnames";
import HerzSpinner from "./HerzSpinner";
import ViewSingleMemory from "./ViewSingleMemory";
import EditSingleMemory from "./EditSingleMemory";

export const loader: LoaderFunction = async ({ params }) => {
	const { loggedIn } = await loggedInData();

	// Check if the user is logged in and is an admin
	if (!loggedIn) {
		return redirect("/login");
	}
	const { title } = params;
	if (typeof title === "string") {
		try {
			return defer({ memory: getMemoryByTitle(title) });
		} catch (error) {
			console.error(`Failed to fetch memory: ${error}`);
			throw new Response("Memory not found", { status: 404 });
		}
	}
	throw new Response("Invalid memory title", { status: 400 });
};

type DeferredLoaderData = {
	memory: Promise<MemoryValues>;
};

const SingleMemory = () => {
	const deferredData = useLoaderData() as DeferredLoaderData;
	const [view, setView] = useState<"view" | "edit">("view");

	return (
		<article className='flex flex-col items-center gap-6 pt-16 pb-24 overflow-hidden text-right text-gray-300 mx-9 font-extralight'>
			<ScrollUpBtn />
			<DarkModeBtn />
			<h1 className='pb-6 text-xl font-bold text-center'>
				S.i.N.G.L.e..M.e.M.o.R.y.
			</h1>
			<aside className='flex items-center cursor-pointer'>
				<div className='flex justify-center gap-1'>
					<button
						onClick={() => setView("view")}
						className={classNames(
							"py-1 text-sm px-3 rounded-md rounded-bl-none",
							{
								"bg-black text-white": view !== "view",
								"bg-white text-black": view === "view",
							}
						)}>
						View Memory
					</button>
					<button
						onClick={() => setView("edit")}
						className={classNames(
							"py-1 text-sm px-3 rounded-md rounded-br-none",
							{
								"bg-black border-1 border-white text-white": view !== "edit",
								"bg-white border-1 border-black text-black": view === "edit",
							}
						)}>
						Update Memory
					</button>
				</div>
			</aside>
			<section className='w-[94vw]'>
				<Suspense
					fallback={
						<div className='flex justify-center w-screen'>
							<HerzSpinner />
						</div>
					}>
					<Await
						resolve={deferredData.memory}
						errorElement={<p>Could not load memory.</p>}>
						{(memory) =>
							view === "view" ? (
								<ViewSingleMemory memory={memory} />
							) : (
								<EditSingleMemory memory={memory} />
							)
						}
					</Await>
				</Suspense>
			</section>
		</article>
	);
};

export default SingleMemory;
