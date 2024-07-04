import IconTrash from "./IconTrash";
import mime from "mime";
import { useTheme } from "../context/ThemeContext";
import displayFile from "../utils/DisplayFile";
import LineSpinner from "./LineSpinner";
import { Link, useFetcher } from "react-router-dom";
import { MemoryValues } from "../types/MemoryValues";

type Props = {
	memory: MemoryValues;
};

const EditSingleMemory = ({ memory }: Props) => {
	const { enabled } = useTheme();
	const fetcher = useFetcher();

	const isDeleting = fetcher.state === "submitting";
	return (
		<>
			<article
				key={memory.title}
				className='flex flex-col items-end gap-6 pt-16 overflow-hidden text-gray-300 screen mx-9 font-extralight'>
				{/* <Link to={memory.title} key={memory.title}> */}
				{/* Entry Header */}
				<section className='flex flex-col w-full'>
					<div className='flex justify-between'>
						<Link className='' to={"#"}>
							<img src='/src/media/featherEdit.png' alt='link to edit entry' />
						</Link>
						<div className=''>
							<img src='#' alt='' className='w-8 h-8 bg-white rounded' />
						</div>
					</div>
					<div className='flex flex-col items-end w-full text-gray-700'>
						<p>
							{memory.month} <span> {memory.day},</span> {memory.year}
						</p>
						<p>By: Mariana Lucht</p>
					</div>
				</section>
				{/* Entry Body */}
				<section className='w-screen'>
					<h1 className='mb-2 font-sans text-xl text-gray-200'>
						{memory.title}
					</h1>
					<p className='break-words'>{memory.description}</p>
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
									className={`object-cover w-full mt-10 ${
										(file.file_path &&
											mime.getType(file.file_path)?.startsWith("image/")) ||
										mime.getType(file.file_path)?.startsWith("video/")
											? "h-64"
											: "h-auto"
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
				{/* </Link> */}
				<div className=''>
					<h2 className='font-medium'>URLs</h2>
					{memory.urls && memory.urls.length > 0 ? (
						memory.urls.map((url) => (
							<div className='' key={url.id}>
								<a
									href={url.url_address}
									target='_blank'
									rel='noopener noreferrer'>
									{url.url_address}
								</a>
							</div>
						))
					) : (
						<p>No URLs available</p>
					)}
				</div>
				<div className=''>
					<fetcher.Form method='delete' action='/memories'>
						<input type='hidden' name='title' value={memory.title} />
						<button
							disabled={isDeleting}
							className={`rounded ${
								enabled
									? "bg-red-500 hover:bg-red-600 text-white disabled:bg-gray-400"
									: "bg-red-600 text-black hover:bg-red-500 disabled:bg-gray-400"
							}`}>
							{isDeleting ? (
								<LineSpinner />
							) : (
								<IconTrash
									className='p-1 disabled:cursor-not-allowed'
									title={`Trashcan icon for deleting memory ${memory.title}`}
								/>
							)}
						</button>
					</fetcher.Form>
				</div>
			</article>
		</>
	);
};

export default EditSingleMemory;
