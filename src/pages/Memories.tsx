/* eslint-disable react-refresh/only-export-components */
import { useState, Suspense, useEffect } from "react";
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
import EditMemories from "../components/EditMemories";
import HerzSpinner from "../components/HerzSpinner";
import ViewMemoriesXL from "../components/ViewMemoriesXL";
import classNames from "classnames";

type DeferredLoaderData = {
	memories: Promise<MemoryValues[]>;
};

export const loader: LoaderFunction = async () => {
	console.log("🔍 Loader function in memories.tsx is running!");

	const { loggedIn, isApproved } = await loggedInData();
	console.log("✅ loggedIn:", loggedIn, "isApproved:", isApproved);

	if (!loggedIn) {
		console.log("⛔ User not logged in, redirecting to login.");
		return redirect("/login");
	}

	if (!isApproved) {
		console.log("⛔ User not approved, redirecting to login.");
		return redirect("/login");
	}

	try {
		const memories = await getAllMemories();
		console.log("📜 Retrieved memories:", memories);
		return defer({ memories });
	} catch (error) {
		console.error("⚠️ Error fetching memories:", error);
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
		<article className='flex flex-col items-center gap-6 pt-6 text-right'>
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
								isMobile ? (
									<ViewMemories memories={loadedMemories} />
								) : (
									<ViewMemoriesXL memories={loadedMemories} />
								)
							) : isMobile ? (
								<EditMemories />
							) : (
								<ViewMemoriesXL memories={loadedMemories} />
							)
						}
					</Await>
				</Suspense>
			</section>
			<aside
				className={classNames(
					"flex mb-36 mt-16 items-center cursor-pointer md:hidden",
					{
						"-mt-10": view !== "edit",
						"-mt-20": view === "edit",
					}
				)}>
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
