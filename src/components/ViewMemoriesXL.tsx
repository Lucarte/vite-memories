import React from "react";
import { useNavigate } from "react-router-dom";
import { MemoryValues } from "../types/MemoryValues";
import mime from "mime";
import displayFile from "../utils/DisplayFile";
import { useTheme } from "../context/ThemeContext";
import ScrollUpBtn from "../partials/ScrollUpBtn";

type ViewMemoriesProps = {
	memories: MemoryValues[];
};

const ViewMemoriesXL = ({ memories }: ViewMemoriesProps) => {
	const { enabled } = useTheme();
	const navigate = useNavigate();
	const containerRef = React.useRef<HTMLDivElement | null>(null);

	const handleMemoryLoad = (title: string) => {
		navigate(`/memories/title/${title}`);
	};

	// Sort memories from newest to oldest
	const sortedMemories = memories.sort(
		(a, b) =>
			new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
	);

	// Flatten memories, splitting those with multiple files
	const flattenedMemories = sortedMemories.flatMap((memory) =>
		memory.files.map((file, index) => ({
			...memory,
			files: [file], // Only keep the single file for this memory
			id: index === 0 ? memory.id : `${memory.id}. (cont.)`,
			title: index === 0 ? memory.title : `${memory.title} (cont.)`,
		}))
	);

	return (
		<div className='min-h-screen pb-24 mx-10 text-white bg-black'>
			{/* Main Container with padding for margins */}
			<div className='grid h-full pr-10 pt-16 grid-cols-[auto,1fr] pb-20'>
				{/* Left Column - List of Titles */}
				<div className='sticky max-h-screen pl-12 pr-24 overflow-y-auto top-16'>
					<ul className='space-y-4 text-xl text-left lowercase list-none'>
						{flattenedMemories.map((memory) => (
							<li
								key={memory.id}
								className='cursor-pointer hover:text-gray-500'
								onClick={() => handleMemoryLoad(memory.title)}>
								{memory.title}
							</li>
						))}
					</ul>
				</div>

				{/* Right Column - Memory Files */}
				<div
					ref={containerRef}
					className='grid grid-cols-1 overflow-auto text-justify gap-y-16 gap-x-10 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5'>
					<ScrollUpBtn />
					{flattenedMemories.length > 0 ? (
						flattenedMemories.map((memory) => (
							<div
								key={memory.id}
								className='cursor-pointer'
								onClick={() => handleMemoryLoad(memory.title)}>
								<article className='space-y-3 shadow-md'>
									<span className='font-serif text-4xl font-bold'>
										{memory.id}
									</span>
									<h1
										className={`font-medium text-xl pb-1 ${
											enabled ? "text-gray-200" : "text-white"
										}`}>
										{memory.title}
									</h1>
									<ul className='w-full h-auto overflow-hidden aspect-w-1 aspect-h-1'>
										{memory.files && memory.files.length > 0 ? (
											memory.files.map((file) => {
												const fileType = mime.getType(file.file_path);
												const isImageOrVideo =
													fileType?.startsWith("image/") ||
													fileType?.startsWith("video/");
												const isAudio = fileType?.startsWith("audio/");

												return (
													<li
														className={`relative overflow-hidden ${
															isImageOrVideo ? "group" : ""
														}`}
														key={file.id}>
														{/* Media item with hover effect */}
														{displayFile(
															file,
															isAudio
																? "bg-white no-rounded-corners"
																: "rounded-none"
														)}
														{/* Hover overlay for images and videos */}
														{isImageOrVideo && memory.description && (
															<div className='absolute inset-0 flex items-center justify-center text-white transition-opacity duration-300 bg-black opacity-0 group-hover:opacity-100'>
																<p className='p-4 text-sm'>
																	{memory.description}
																</p>
															</div>
														)}
														{/* Apply description below audio */}
														{isAudio && memory.description && (
															<p className='pt-4 overflow-auto max-h-72'>
																{memory.description}
															</p>
														)}
													</li>
												);
											})
										) : (
											// Display description if no files exist
											<p className='overflow-auto max-h-80'>
												{memory.description}
											</p>
										)}
									</ul>
								</article>
							</div>
						))
					) : (
						<p className='col-span-2 text-center text-orange-500'>
							No memories found
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default ViewMemoriesXL;
