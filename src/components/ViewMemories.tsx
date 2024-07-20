import React from "react";
import { useNavigate } from "react-router-dom";
import { MemoryValues } from "../types/MemoryValues";
import mime from "mime";
import displayFile from "../utils/DisplayFile";
import { useTheme } from "../context/ThemeContext";

// Helper function to format the date
const formatDate = (dateString: string): string => {
	const date = new Date(dateString);

	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	return date.toLocaleDateString("en-US", options);
};

// Define props for ViewMemories component to accept an array of MemoryValues
interface ViewMemoriesProps {
	memories: MemoryValues[];
}

const ViewMemories: React.FC<ViewMemoriesProps> = ({ memories }) => {
	const { enabled } = useTheme();
	const navigate = useNavigate();

	const handleMemoryLoad = (title: string) => {
		navigate(`/memories/title/${title}`);
	};

	return (
		<>
			{memories.length > 0 ? (
				memories.map((memory) => (
					<div
						key={memory.title}
						onClick={() => handleMemoryLoad(memory.title)}
						className='cursor-pointer'>
						<article
							key={memory.title}
							className='flex flex-col items-end gap-6 overflow-hidden text-gray-300 screen mx-9 font-extralight'>
							{/* Entry Header */}
							<section className='flex flex-col w-full'>
								<div className='flex justify-end mb-2'>
									<img
										className='w-10 h-10 rounded rounded-tl-xl'
										src={`http://localhost/storage/${memory.user.avatar.avatar_path}`}
										alt={`Picture of ${memory.user.first_name} ${memory.user.last_name}`}
										onError={(e) => {
											console.error("Failed to load avatar:", e);
										}}
									/>
								</div>
								<div
									className={`${
										enabled ? "text-gray-600" : "text-gray-400"
									} w-full font-medium`}>
									<p>{formatDate(memory.created_at)}</p>
									<p>{`By: ${memory.user.first_name} ${memory.user.last_name}`}</p>
								</div>
							</section>
							{/* Entry Body */}
							<section>
								<h1
									className={`font-sans underline text-2xl font-normal tracking-widest ${
										enabled ? "text-gray-200 mb-3" : "text-black mb-6"
									}`}>
									{memory.title}{" "}
								</h1>
								<p
									className={`${
										enabled ? "text-gray-300" : "text-black"
									} 'text-black break-words'`}>
									{memory.description}
								</p>
							</section>
							<div>
								<h2
									className={`${
										enabled ? "text-gray-400" : "text-gray-500"
									} font-normal underline`}>
									Date of Memory
								</h2>
								<p className={`${enabled ? "text-white" : "text-black"}`}>
									{memory.month} <span> {memory.day},</span> {memory.year}
								</p>
							</div>
							{/* Files */}
							<div className=''>
								<h2
									className={`${
										enabled ? "text-gray-400" : "text-gray-500"
									} font-normal underline`}>
									Files
								</h2>
								<ul className='flex flex-col items-center justify-center'>
									{memory.files && memory.files.length > 0 ? ( // Check for files
										memory.files.map((file) => (
											<li
												className={`object-cover mt-4 ${
													mime.getType(file.file_path)?.startsWith("image/") ||
													mime.getType(file.file_path)?.startsWith("video/")
														? "h-auto"
														: "h-auto min-w-[80vw]"
												}`}
												key={file.id}>
												{displayFile(file)}
											</li>
										))
									) : (
										<p className={`${enabled ? "text-white" : "text-black"}`}>
											No files available
										</p>
									)}
								</ul>
							</div>
							{/* URLs */}
							<div>
								<h2
									className={`${
										enabled ? "text-gray-400" : "text-gray-500"
									} font-normal underline`}>
									URLs
								</h2>
								<ul className=''>
									{memory.urls && memory.urls.length > 0 ? (
										memory.urls.map((url) => (
											<li key={url.id}>
												<a
													className={`${enabled ? "text-white" : "text-black"}`}
													href={url.url_address}
													target='_blank'
													rel='noopener noreferrer'>
													{url.url_address}
												</a>
											</li>
										))
									) : (
										<p className={`${enabled ? "text-white" : "text-black"}`}>
											No URLs available
										</p>
									)}
								</ul>
							</div>
						</article>
						{/* Custom HR Tag */}
						<hr className='h-1 mx-auto mt-20  -mb-[6rem] border-none rounded-full w-36 bg-gradient-to-r from-black via-gray-200 to-black' />
					</div>
				))
			) : (
				<p className='text-center text-orange-500'>No memories founD</p>
			)}
		</>
	);
};

export default ViewMemories;
