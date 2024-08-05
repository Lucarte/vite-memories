import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import HerzSpinner from "./HerzSpinner";
import ScrollUpBtn from "../partials/ScrollUpBtn";
import { MemoryValues } from "../types/MemoryValues";
import ViewSingleMemoryXL from "./ViewSingleMemoryXL";

type DeferredLoaderData = {
	memory: Promise<MemoryValues>;
};

const SingleMemoryXL = () => {
	const deferredData = useLoaderData() as DeferredLoaderData;

	return (
		<div className='min-h-screen mx-10 text-white bg-black'>
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
									{(memory) => <ViewSingleMemoryXL memory={memory} />}
								</Await>
							</Suspense>
						</section>
					</div>
				</aside>
			</article>
		</div>
	);
};

export default SingleMemoryXL;
