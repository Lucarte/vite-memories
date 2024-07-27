/* eslint-disable react-refresh/only-export-components */
import { useState, Suspense } from "react";
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
	json,
	redirect,
	useLoaderData,
} from "react-router-dom";
import ViewMemories from "../components/ViewMemories";
import ScrollUpBtn from "../partials/ScrollUpBtn";
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
		return defer({ memories: [] });
	}
};

// Action - delete or update
export const action: ActionFunction = async ({ request }) => {
	const { isAdmin } = await loggedInData();

	if (!isAdmin) {
		return json(
			{
				messageError: "Admin Zone: Access denied",
			},
			{ status: 403 }
		);
	}

	const formData = await request.formData();
	const title = formData.get("title");
	const intent = formData.get("intent");

	if (intent === "delete" && typeof title === "string") {
		try {
			await deleteMemory(title);
			alert("Memory successfully deleted!");
			return json({
				successMessage: "Memory successfully deleted!",
			});
		} catch (error) {
			console.error("Error deleting memory:", error);
			alert("Error deleting memory :/");
			return json(
				{
					messageError: "Error deleting memory :/",
				},
				{ status: 500 }
			);
		}
	}

	const id = formData.get("id");
	Object.fromEntries(formData);

	if (intent === "patch") {
		const parsedId = typeof id === "string" ? parseInt(id, 10) : NaN;
		if (!isNaN(parsedId)) {
			// Convert form data to the PatchValues type
			const patchData: PatchValues = {
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
				await patchMemory(parsedId, patchData);
				return json({
					successMessage: "Memory successfully updated!",
				});
			} catch (error) {
				console.error("Error updating memory:", error);
				return json(
					{
						messageError: "Error updating memory :(",
					},
					{ status: 500 }
				);
			}
		}
	}

	return json(
		{
			messageError: "Invalid action or missing data",
		},
		{ status: 400 }
	);
};

const Memories = () => {
	const [view, setView] = useState<"view" | "edit">("view");
	const deferredData = useLoaderData() as DeferredLoaderData;

	return (
		<article className='flex flex-col items-center gap-6 pt-6 text-right'>
			<ScrollUpBtn />
			<h1 className='pt-4 pb-6 text-xl font-bold text-center'>
				.M.e.m.o.r.i.e.S.
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
				className={classNames("flex mb-36 mt-16 items-center cursor-pointer", {
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
