/* eslint-disable react-refresh/only-export-components */
import { MemoryValues } from "../types/MemoryValues";
import {
	deleteMemory,
	getAllMemories,
	loggedInData,
	patchMemory,
} from "../utils/api";
import {
	ActionFunction,
	Await,
	LoaderFunction,
	defer,
	redirect,
	useLoaderData,
} from "react-router-dom";

import { Suspense, useState } from "react";
import ViewMemories from "../components/ViewMemories";
import ScrollUpBtn from "../partials/ScrollUpBtn";
import DarkModeBtn from "../partials/DarkModeBtn";
import EditMemories from "../components/EditMemories";
import classNames from "classnames";
import HerzSpinner from "../components/HerzSpinner";

type DeferredLoaderData = {
	memories: Promise<MemoryValues[]>;
};

// Loader - All Memories
export const loader: LoaderFunction = async () => {
	// Are we logged in? if not, redirect!
	const { loggedIn } = await loggedInData();
	if (!loggedIn) return redirect("/login");
	return defer({ memories: getAllMemories() });
};

// Action - delete or update
export const action: ActionFunction = async ({ request }) => {
	const { loggedIn, isAdmin } = await loggedInData();

	// Check if the user is logged in and is an admin
	if (!loggedIn) {
		return redirect("/login");
	}

	if (!isAdmin) {
		console.log("Admin Zone: Access denied");
		return "Admin Zone: Access denied";
	}

	const formData = await request.formData();
	const title = formData.get("title");
	const intent = formData.get("intent");

	// Check first if there is an existing intent
	if (intent && intent === "delete") {
		if (typeof title === "string") {
			try {
				const deleteRes = await deleteMemory(title);
				return deleteRes;
			} catch (error) {
				console.error("Error deleting memory:", error);
				return { message: "Error deleting memory :/" };
			}
		}
	}

	const id = formData.get("id");
	console.log("ID from formData:", id); // Debugging statement

	if (intent && intent === "patch") {
		if (typeof id === "number") {
			try {
				const patchRes = await patchMemory(id, formData);
				return patchRes;
			} catch (error) {
				console.error("Error updating memory:", error);
				return { message: "Error updating memory :/" };
			}
		}
	}

	return null;
};

const Memories = () => {
	const [view, setView] = useState<"view" | "edit">("view");
	const deferredData = useLoaderData() as DeferredLoaderData;

	return (
		<article className='flex flex-col items-center gap-6 pt-6 text-right'>
			<ScrollUpBtn />
			<DarkModeBtn />
			<h1 className='pb-6 text-xl font-bold text-center uppercase'>
				A.l.l..M.e.m.o.r.i.e.s.
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
						View Memories
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
						Update Memories
					</button>
				</div>
			</aside>
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
						{view === "view" ? <ViewMemories /> : <EditMemories />}
					</Await>
				</Suspense>
			</section>
		</article>
	);
};

export default Memories;
