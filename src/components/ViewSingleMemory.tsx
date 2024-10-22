import React from "react";
import { MemoryValues } from "../types/MemoryValues";
import mime from "mime";
import displayFile from "../utils/DisplayFile";
import { useTheme } from "../context/ThemeContext";
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

type Props = {
	memory: MemoryValues;
};

const ViewSingleMemory: React.FC<Props> = ({ memory }) => {
	const { enabled } = useTheme();

	return (
		<article className='flex flex-col items-end gap-6 pt-16 overflow-hidden text-gray-300 screen mx-9 font-extralight'>
			{/* Entry Header */}
			<section className='flex flex-col w-full'>
				<div className='flex justify-end mb-2'>
					<img
						className='w-10 h-10 rounded rounded-tl-xl'
						src={
							memory.user.avatar
								? `${import.meta.env.VITE_DO_SPACES_ENDPOINT}/${
										import.meta.env.VITE_DO_SPACES_BUCKET
										// eslint-disable-next-line no-mixed-spaces-and-tabs
								  }/${memory.user.avatar.avatar_path}`
								: defaultAvatar
						}
						alt={`Picture of ${memory.user.first_name} ${memory.user.last_name}`}
						onError={(e) => {
							console.error("Failed to load avatar:", e);
						}}
					/>
				</div>
				<div
					className={`flex flex-col font-light items-end w-full ${
						enabled ? "text-gray-600" : "text-black text-opacity-40"
					}`}>
					<p>{formatDate(memory.created_at)}</p>
					<p>{`By: ${memory.user.first_name} ${memory.user.last_name}`}</p>
				</div>
			</section>
			{/* Entry Body */}
			<section className=''>
				<h1
					className={`mb-2 font-sans font-medium underline text-2xl tracking-widest ${
						enabled ? "text-gray-200" : "text-black"
					}`}>
					{memory.title}
				</h1>
				<p
					className={`break-words ${enabled ? "text-gray-300" : "text-black"}`}>
					{memory.description}
				</p>
			</section>
			<div>
				<h2
					className={`font-medium tracking-widest ${
						enabled ? "text-gray-400" : "text-black text-opacity-40"
					}`}>
					Date of Memory
				</h2>
				<p className={`${enabled ? "text-white" : "text-black"}`}>
					{memory.month} <span> {memory.day},</span> {memory.year}
				</p>
			</div>
			{/* Files */}
			<div>
				<h2
					className={`font-medium -mb-2 tracking-widest ${
						enabled ? "text-gray-400" : "text-black text-opacity-40"
					}`}>
					Files
				</h2>
				<ul className='flex flex-col items-center justify-center'>
					{memory.files && memory.files.length > 0 ? (
						memory.files.map((file) => (
							<li
								className={`object-cover mt-4 ${
									mime.getType(file.file_path)?.startsWith("image/") ||
									mime.getType(file.file_path)?.startsWith("video/")
										? "h-auto max-w-96"
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
					className={`font-medium tracking-widest ${
						enabled ? "text-gray-400" : "text-black text-opacity-40"
					}`}>
					URLs
				</h2>
				<ul>
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
	);
};

export default ViewSingleMemory;
