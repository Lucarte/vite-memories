import React from "react";
import { useNavigate } from "react-router-dom";
import { MemoryValues } from "../types/MemoryValues";
import mime from "mime";
import displayFile from "../utils/DisplayFile";
import { useTheme } from "../context/ThemeContext";

// Define props for ViewMemories component to accept an array of MemoryValues
interface ViewMemoriesProps {
	memories: MemoryValues[];
}

const ViewMemoriesXL: React.FC<ViewMemoriesProps> = ({ memories }) => {
	const { enabled } = useTheme();
	const navigate = useNavigate();

	const handleMemoryLoad = (title: string) => {
		navigate(`/memories/title/${title}`);
	};

	// Sort memories from newest to oldest
	const sortedMemories = memories.sort(
		(a, b) =>
			new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
	);

	return (
		<div className='fixed overflow-hidden text-white bg-black top-28 bottom-20 inset-x-10 dark:bg-white dark:text-black'>
			{/* Main Container with padding for margins */}
			<div className='grid h-full pr-10 pt-16 grid-cols-[auto,1fr]'>
				{/* Left Column - List of Titles */}
				<div className='sticky top-0 pl-12 pr-24 overflow-y-auto'>
					<ul className='space-y-4 text-xl lowercase list-none'>
						{sortedMemories.map((memory) => (
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
				<div className='grid grid-cols-1 overflow-auto text-justify gap-y-16 gap-x-10 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5'>
					{sortedMemories.length > 0 ? (
						sortedMemories.map((memory) => (
							<div
								key={memory.id}
								className='cursor-pointer'
								onClick={() => handleMemoryLoad(memory.title)}>
								<article className='space-y-3 shadow-md'>
									<span className='font-serif text-4xl font-bold'>
										{memory.id}.
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
