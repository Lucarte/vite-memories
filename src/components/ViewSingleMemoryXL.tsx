import { MemoryValues } from "../types/MemoryValues";
import displayFile from "../utils/DisplayFile";
import mime from "mime";
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

const ViewSingleMemoryXL = ({ memory }: Props) => {
	return (
		<article className='flex flex-col gap-12 px-16 pt-12 overflow-hidden text-gray-300 screen font-extralight'>
			{/* Entry Header */}
			<section className='flex justify-center w-full'>
				<div className='flex flex-col w-full max-w-3xl gap-10'>
					<div className='flex gap-10'>
						<div className='flex flex-col items-end w-full font-light text-gray-500'>
							<p>{formatDate(memory.created_at)}</p>
							<p>{`By: ${memory.user.first_name} ${memory.user.last_name}`}</p>
						</div>
						<div className='flex justify-start w-full mb-2'>
							<img
								className='w-10 h-10 mt-1'
								src={
									memory.user.avatar
										? `${import.meta.env.VITE_API_URL}/${
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
					</div>
					{/* Entry Body (Title & Description & Url) */}
					<div className='flex items-start gap-10'>
						<div className='flex flex-col w-1/2 gap-4'>
							<div>
								<h2 className='font-medium tracking-widest text-white'>
									Description
								</h2>
								<p className='pt-1 text-gray-300 break-words'>
									{memory.description}
								</p>
							</div>
							<div>
								<h2 className='font-medium tracking-widest text-white'>
									Date of Memory
								</h2>
								<p className='text-white'>
									{memory.month} <span> {memory.day},</span> {memory.year}
								</p>
							</div>

							{/* URLs */}
							<div>
								<h2 className='font-medium tracking-widest text-white'>URLs</h2>
								<ul>
									{memory.urls && memory.urls.length > 0 ? (
										memory.urls.map((url) => (
											<li key={url.id}>
												<a
													className='text-white'
													href={url.url_address}
													target='_blank'
													rel='noopener noreferrer'>
													{url.url_address}
												</a>
											</li>
										))
									) : (
										<p className='text-white'>No URLs available</p>
									)}
								</ul>
							</div>
						</div>

						{/* Files */}
						<div className='w-1/2 space-y-1'>
							<h2 className='-mb-2 font-medium tracking-widest text-left text-white'>
								Files
							</h2>
							<ul className='flex flex-col items-start'>
								{memory.files && memory.files.length > 0 ? (
									memory.files.map((file) => (
										<li
											className={`object-cover mt-4 ${
												mime.getType(file.file_path)?.startsWith("image/") ||
												mime.getType(file.file_path)?.startsWith("video/")
													? "h-auto w-80"
													: "h-auto w-80"
											}`}
											key={file.id}>
											{displayFile(file, "rounded-none")}
										</li>
									))
								) : (
									<p className='text-white'>No files available</p>
								)}
							</ul>
						</div>
					</div>
				</div>
			</section>
		</article>
	);
};

export default ViewSingleMemoryXL;
