import { Link, useAsyncValue } from "react-router-dom";
import { MemoryValues, MemoryFile } from "../types/MemoryValues";
import mime from "mime";

type AsyncData = {
	memories: MemoryValues[];
};

const displayFile = (file: MemoryFile) => {
	if (!file.file_path || !file.file_data) return null;

	const mimeType = mime.getType(file.file_path); // Replace with actual function to get MIME type

	if (!mimeType) {
		return <p>Unsupported file type</p>;
	}

	if (mimeType.startsWith("image/")) {
		return (
			<img
				src={`data:${mimeType};base64,${file.file_data}`}
				alt={`Memory ${file.id}`}
			/>
		);
	} else if (mimeType.startsWith("video/")) {
		return (
			<video controls>
				<source
					src={`data:${mimeType};base64,${file.file_data}`}
					type={mimeType}
				/>
				Your browser does not support the video tag.
			</video>
		);
	} else if (mimeType.startsWith("audio/")) {
		return (
			<audio controls>
				<source
					src={`data:${mimeType};base64,${file.file_data}`}
					type={mimeType}
				/>
				Your browser does not support the audio element.
			</audio>
		);
	} else {
		return <p>Unsupported file type</p>;
	}
};

const ViewMemories = () => {
	const memories = useAsyncValue() as MemoryValues[];
	return (
		<>
			{memories ? (
				memories.map((memory) => (
					<article>
						<section>
							{/* <div className='flex content-center justify-between w-full px-9'>
								<a href='#' className=''>
									<img
										src='/src/media/featherEdit.png'
										alt='link to edit entry'
									/>
								</a>
								<div className='flex justify-center'>
									<img src='#' alt='' className='w-8 h-8 bg-white rounded' />
								</div>
							</div>
							<div className='flex flex-col items-end w-full -mt-5 text-gray-700 pr-9'>
								<p>June 15, 2021</p>
								<p>By: Mariana Lucht</p>
							</div> */}
						</section>
						<div key={memory.title}>
							<Link to={memory.title} key={memory.title}>
								<ul>
									<li>Kid: {memory.kid}</li>
									<li>Title: {memory.title}</li>
									<li>Description: {memory.description}</li>
									<li>Year: {memory.year}</li>
									<li>Month: {memory.month}</li>
									<li>Day: {memory.day}</li>
									<li>Files:</li>
								</ul>
								<ul>
									{memory.files ? (
										memory.files.map((file) => (
											<li key={file.id}>{displayFile(file)}</li>
										))
									) : (
										<p>No files available</p>
									)}
								</ul>
							</Link>
							<div>
								<strong>URLs:</strong>
								{memory.urls && memory.urls.length > 0 ? (
									memory.urls.map((url) => (
										<div key={url.id}>
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
						</div>
					</article>
				))
			) : (
				<p>No Memories found.</p>
			)}
		</>
	);
};

export default ViewMemories;
