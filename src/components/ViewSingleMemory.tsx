import { MemoryValues } from "../types/MemoryValues";
import mime from "mime";
import displayFile from "../utils/DisplayFile";

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

const ViewSingleMemory = ({ memory }: Props) => {
	return (
		<>
			<article className='flex flex-col items-end gap-6 pt-16 overflow-hidden text-gray-300 screen mx-9 font-extralight'>
				{/* Entry Header */}
				<section className='flex flex-col w-full'>
					<div className='flex justify-end mb-2'>
						<img
							className='w-12 h-12 rounded'
							src={
								memory.user.avatar?.avatar_path || "/media/defaultAvatar.png"
							}
							alt={`Picture of ${memory.user.first_name} ${memory.user.last_name}`}
							onError={(e) => {
								console.error("Failed to load avatar:", e);
							}}
						/>
					</div>
					<div className='flex flex-col items-end w-full text-gray-700'>
						<p>{`By: ${memory.user.first_name} ${memory.user.last_name}`}</p>
						<p>{formatDate(memory.created_at)}</p>
					</div>
				</section>
				{/* Entry Body */}
				<section className='w-screen'>
					<h1 className='mb-2 font-sans text-xl text-gray-200'>
						{memory.title}
					</h1>
					<p className='pl-20 break-words'>{memory.description}</p>
				</section>
				<div>
					<h2 className='font-medium'>Date of Memory</h2>
					<p>
						{memory.month} <span> {memory.day},</span> {memory.year}
					</p>
				</div>
				{/* Files */}
				<div className=''>
					<h2 className='font-medium'>Files</h2>
					<ul className='flex flex-col items-center justify-center'>
						{memory.files && memory.files.length > 0 ? (
							memory.files.map((file) => (
								<li
									className={`object-cover mt-10 ${
										(file.file_path &&
											mime.getType(file.file_path)?.startsWith("image/")) ||
										mime.getType(file.file_path)?.startsWith("video/")
											? "h-64"
											: "h-auto min-w-[80vw]"
									}`}
									key={file.id}>
									{displayFile(file)}
								</li>
							))
						) : (
							<p>No files available</p>
						)}
					</ul>
				</div>
				{/* URLs */}
				<div>
					<h2 className='font-medium'>URLs</h2>
					<ul>
						{memory.urls && memory.urls.length > 0 ? (
							memory.urls.map((url) => (
								<li key={url.id}>
									<a
										href={url.url_address}
										target='_blank'
										rel='noopener noreferrer'>
										{url.url_address}
									</a>
								</li>
							))
						) : (
							<p>No URLs available</p>
						)}
					</ul>
				</div>
			</article>
		</>
	);
};

export default ViewSingleMemory;
