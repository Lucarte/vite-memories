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
import { Suspense, useEffect, useState } from "react";
import HerzSpinner from "./HerzSpinner";
import ViewSingleMemory from "./ViewSingleMemory";
import EditSingleMemory from "./EditSingleMemory";
import SingleMemoryXL from "./SingleMemoryXL";

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
	const [view] = useState<"view" | "edit">("view");
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

	return !isMobile ? (
		<SingleMemoryXL />
	) : (
		<>
			<h1 className='pb-20 mt-8 -mb-24 text-xl font-bold text-center'>
				s.i.n.g.l.e <br /> .M.e.m.o.r.Y.
			</h1>
			<article className='flex flex-col items-center gap-6 pt-8 pb-48 overflow-hidden text-right text-gray-300 font-extralight'>
				<ScrollUpBtn />
				<aside className='flex items-center cursor-pointer'>
					<div className='flex flex-col items-center gap-1'>
						<section>
							<Suspense
								fallback={
									<div className='flex justify-center w-screen -mt-16'>
										<HerzSpinner />
									</div>
								}>
								<Await
									resolve={deferredData.memory}
									errorElement={
										<p className='mt-40 text-center'>
											Could not load memory. <br /> It may have been erased
											already. <br /> Or perhaps updated! <br /> <br /> Try
											another search.
										</p>
									}>
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
					</div>
				</aside>
			</article>
		</>
	);
};

export default SingleMemory;
