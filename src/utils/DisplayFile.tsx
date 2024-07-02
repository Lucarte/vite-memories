import mime from "mime";
import { MemoryFile } from "../types/MemoryValues"; // Adjust the import path as needed

const displayFile = (file: MemoryFile) => {
	if (!file.file_path || !file.file_data) return null;

	const mimeType = mime.getType(file.file_path);

	if (!mimeType) {
		return <p>Unsupported file type</p>;
	}

	if (mimeType.startsWith("image/")) {
		return (
			<img
				src={`data:${mimeType};base64,${file.file_data}`}
				alt={`Memory ${file.id}`}
				className='aspect-square object-cover w-full h-full rounded-2xl rounded-tl-[4rem]'
			/>
		);
	} else if (mimeType.startsWith("video/")) {
		return (
			<video
				controls
				className='w-full h-full rounded-2xl rounded-tl-[4rem] aspect-video object-cover'>
				<source
					src={`data:${mimeType};base64,${file.file_data}`}
					type={mimeType}
				/>
				Your browser does not support the video tag.
			</video>
		);
	} else if (mimeType.startsWith("audio/")) {
		return (
			<audio controls className='w-full'>
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

export default displayFile;
