import React from "react";
import { useNavigate } from "react-router-dom";
import { MemoryValues } from "../types/MemoryValues";
import mime from "mime";
import displayFile from "../utils/DisplayFile";
import { useTheme } from "../context/ThemeContext";
import ScrollUpBtn from "../partials/ScrollUpBtn";
import defaultAvatar from "../assets/default-avatar.jpg";
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

	// Sort memories from newest to oldest
	const sortedMemories = memories.sort(
		(a, b) =>
			new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
	);

	const getTitle = () => {
		if (location.pathname.includes("/pablo/memories")) {
			return (
				<div>
					P.A.B.L.O'.S <br /> .M.E.M.O.R.I.E.S.
				</div>
			);
		} else if (location.pathname.includes("/gabriella/memories")) {
			return (
				<div>
					G.A.B.I'.S <br /> .M.E.M.O.R.I.E.S.
				</div>
			);
		} else if (location.pathname.includes("/brunnis/memories")) {
			return (
				<div>
					B.R.U.N.N.I'.S <br /> .M.E.M.O.R.I.E.S.
				</div>
			);
		} else if (location.pathname.includes("/memories")) {
			return (
				<div>
					A.L.L <br /> .M.E.M.O.R.I.E.S.
				</div>
			);
		}
		return "M.E.M.O.R.I.E.S"; // Default title
	};

	return (
		<>
			<ScrollUpBtn />
			<h1 className='pt-4 pb-6 text-xl font-bold text-center'>
				{/* .M.e.m.o.r.i.e.S. */}
				{getTitle()}
			</h1>
			{sortedMemories.length > 0 ? (
				sortedMemories.map((memory) => (
					<div
						key={memory.title}
						onClick={() => handleMemoryLoad(memory.title)}
						className='cursor-pointer'>
						<article
							key={memory.title}
							className='flex flex-col items-end gap-6 mb-16 overflow-hidden text-gray-300 screen mx-9 font-extralight'>
							{/* Entry Header */}
							<section className='flex flex-col w-full'>
								<div className='flex justify-end mb-2'>
									<img
										className='w-10 h-10 rounded rounded-tl-xl'
										src={
											memory.user.avatar
												? `${import.meta.env.VITE_API_URL}/storage/${
														memory.user.avatar.avatar_path
														// eslint-disable-next-line no-mixed-spaces-and-tabs
												  }`
												: defaultAvatar
										}
										alt={`Picture of ${memory.user.first_name} ${memory.user.last_name}`}
										onError={(e) => {
											console.error("Failed to load avatar:", e);
										}}
									/>
								</div>
								<div
									className={`${
										enabled ? "text-gray-600" : "text-black text-opacity-40"
									} font-light w-full`}>
									<p>{formatDate(memory.created_at)}</p>
									<p>{`By: ${memory.user.first_name} ${memory.user.last_name}`}</p>
								</div>
							</section>
							{/* Entry Body */}
							<section>
								<h1
									className={`font-sans font-medium underline text-2xl tracking-widest ${
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
										enabled ? "text-gray-400" : "text-black text-opacity-40"
									} font-normal tracking-widest`}>
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
										enabled ? "text-gray-400" : "text-black text-opacity-40"
									} font-normal -mb-2 tracking-widest`}>
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
										enabled ? "text-gray-400" : "text-black text-opacity-40"
									} font-normal tracking-widest`}>
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
					</div>
				))
			) : (
				<p className='text-center text-orange-500'>No memories founD</p>
			)}
			{/* <aside
				className={classNames(
					"flex mb-36 mt-16 items-center justify-center cursor-pointer",
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
			</aside> */}
		</>
	);
};

export default ViewMemories;
