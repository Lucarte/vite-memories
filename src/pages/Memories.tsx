import { MemoryValues } from "../types/MemoryValues";
import { getAllMemories } from "../utils/api";
import { Link, LoaderFunction, useLoaderData } from "react-router-dom";

const Memories = () => {
	const memories = useLoaderData() as MemoryValues[];

	return (
		<div className='flex flex-col gap-12'>
			<h1>Memories</h1>
			{memories ? (
				memories.map((memory) => {
					return (
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
									{memory.file_paths ? (
										memory.file_paths.map((file) => (
											<li key={file.id}>
												<img
													// href={`http://localhost/storage/${file.file_path}`}
													src={`http://localhost/api/auth/file/${file.id}`}
													// target='_blank'
													rel='noopener noreferrer'>
													{file.file_path}
												</img>
											</li>
										))
									) : (
										<p>No files available</p>
									)}
								</ul>
								{/* {memory.file_paths ? (
										memory.file_paths.map((file) => (
											<img
												key={file.id}
												// src={`http://localhost/storage/${file.file_path}`}
												alt={`Memory ${memory.title}`}
											/>
										))
									) : (
										<p>No files available</p>
									)} */}
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
					);
				})
			) : (
				<p>No Memories found.</p>
			)}
		</div>
	);
};

export default Memories;

// Memories loader
export const loader: LoaderFunction = async () => {
	return getAllMemories();
};
