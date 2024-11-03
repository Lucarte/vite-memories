import mime from "mime";
import { MemoryFile } from "../types/MemoryValues";

const displayFile = (file: MemoryFile, customClass?: string) => {
	if (!file.file_path) return null;

	const mimeType = mime.getType(file.file_path);
	if (!mimeType) {
		return <p>Unsupported file type</p>;
	}

	const fileUrl = `${import.meta.env.VITE_DO_SPACES_ENDPOINT}/${
		import.meta.env.VITE_DO_SPACES_BUCKET
	}/${file.file_path}`;

	if (mimeType.startsWith("image/")) {
		return (
			<img
				src={fileUrl}
				alt={`Memory ${file.id}`}
				className={`aspect-square object-cover w-full h-full ${
					customClass || "rounded-3xl"
				}`}
			/>
		);
	} else if (mimeType.startsWith("audio/")) {
		return (
			<audio controls className={`w-full ${customClass || ""}`}>
				<source src={fileUrl} type={mimeType} />
				Your browser does not support the audio element.
			</audio>
		);
	} else {
		return <p>Unsupported file type</p>;
	}
};

export default displayFile;
