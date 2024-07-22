/* eslint-disable react-refresh/only-export-components */
import { MemoryValues, PatchValues } from "../types/MemoryValues";
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
	// Check if logged in
	const { loggedIn } = await loggedInData();
	if (!loggedIn) {
		return redirect("/login");
	}

	try {
		const memories = await getAllMemories();
		return defer({ memories });
	} catch (error) {
		console.error("Error fetching all memories:", error);
		return defer({ memories: [] }); // Return empty array or handle error
	}
};

// Action - delete or update
export const action: ActionFunction = async ({ request }) => {
	const { loggedIn, isAdmin } = await loggedInData();

	// Check if the user is logged in and is an admin
	if (!loggedIn) {
		return redirect("/login");
	}

	if (!isAdmin) {
		// TO DO: show this message as a modal!
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
	const data = Object.fromEntries(formData);

	if (intent && intent === "patch") {
		const parsedId = typeof id === "string" ? parseInt(id, 10) : NaN;
		if (!isNaN(parsedId)) {
			// Convert form data to the PatchValues type
			const data: PatchValues = {
				id: parsedId,
				kid: formData.get("kid") as string,
				title: formData.get("title") as string,
				description: formData.get("description") as string,
				year: parseInt(formData.get("year") as string, 10),
				month: formData.get("month") as string,
				day: formData.get("day")
					? parseInt(formData.get("day") as string, 10)
					: undefined,
				category_ids: formData.getAll("category_ids") as string[],
				intent: formData.get("intent") as string,
			};

			try {
				const patchRes = await patchMemory(parsedId, data);
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
			<h1 className='pt-4 pb-6 text-xl font-bold text-center'>
				.M.e.m.o.r.i.e.S.
				{/* a.l.l <br /> .M.e.m.o.r.i.e.S. */}
			</h1>
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
						{(loadedMemories) =>
							view === "view" ? (
								<ViewMemories memories={loadedMemories} />
							) : (
								<EditMemories />
							)
						}
					</Await>
				</Suspense>
			</section>
			<aside
				className={classNames("flex mb-36 items-center cursor-pointer", {
					"-mt-10": view !== "edit",
					"-mt-20": view === "edit",
				})}>
				<div className='flex justify-center gap-1'>
					<button
						onClick={() => setView("view")}
						className={classNames(
							"py-1 text-sm px-3 rounded-md rounded-bl-none border-2 ",
							{
								"border-black bg-black text-white": view !== "view",
								"border-black bg-white text-black": view === "view",
							}
						)}>
						View <br /> Memories
					</button>
					<button
						onClick={() => setView("edit")}
						className={classNames(
							"py-1 text-sm px-3 rounded-md rounded-br-none border-2",
							{
								"border-black bg-black text-white": view !== "edit",
								"border-black bg-white text-black": view === "edit",
							}
						)}>
						Update <br /> Memories
					</button>
				</div>
			</aside>
		</article>
	);
};

export default Memories;
