// memoryUtils.ts

import { useState } from "react";

export const kidOptions = [
	{ id: "both", name: "Both" },
	{ id: "pablo", name: "Pablo" },
	{ id: "gabriella", name: "Gabriella" },
];

export const years = Array.from({ length: 101 }, (_, i) => 2000 + i);

export const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export const days = Array.from({ length: 31 }, (_, i) => i + 1);

export const useFileUpload = () => {
	const [uploadedImages, setUploadedImages] = useState<File[]>([]);
	const [uploadedAudios, setUploadedAudios] = useState<File[]>([]);
	const [uploadedVideos, setUploadedVideos] = useState<File[]>([]);
	const [imagePreviews, setImagePreviews] = useState<string[]>([]);
	const [audioPreviews, setAudioPreviews] = useState<string[]>([]);
	const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
	const [fileErrors, setFileErrors] = useState<string[]>([]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;

		if (files) {
			const validImageExtensions = ["jpeg", "jpg", "png", "gif", "svg"];
			const validAudioExtensions = ["aiff", "mpeg", "m4a", "mp3"];
			const validVideoExtensions = ["mp4", "avi", "quicktime", "mov", "mpeg"];

			const imageFiles: File[] = [];
			const audioFiles: File[] = [];
			const videoFiles: File[] = [];
			const errors: string[] = [];

			for (const file of files) {
				const fileExtension = file.name.split(".").pop()?.toLowerCase();
				if (!fileExtension) {
					errors.push(`Unable to determine file extension for ${file.name}.`);
					continue;
				}

				let maxSize = 0;

				if (validImageExtensions.includes(fileExtension)) {
					maxSize = 3 * 1024 * 1024; // 3MB for images
					imageFiles.push(file);
					setImagePreviews((prevPreviews) => [
						...prevPreviews,
						URL.createObjectURL(file),
					]);
				} else if (validAudioExtensions.includes(fileExtension)) {
					maxSize = 20 * 1024 * 1024; // 20MB for audio
					audioFiles.push(file);
					setAudioPreviews((prevPreviews) => [
						...prevPreviews,
						URL.createObjectURL(file),
					]);
				} else if (validVideoExtensions.includes(fileExtension)) {
					maxSize = 200 * 1024 * 1024; // 200MB for video
					videoFiles.push(file);
					setVideoPreviews((prevPreviews) => [
						...prevPreviews,
						URL.createObjectURL(file),
					]);
				} else {
					errors.push(`Unsupported file type: ${file.name}`);
					continue;
				}

				if (file.size > maxSize) {
					errors.push(`File too large: ${file.name}`);
				}
			}

			setUploadedImages((prevFiles) => [...prevFiles, ...imageFiles]);
			setUploadedAudios((prevFiles) => [...prevFiles, ...audioFiles]);
			setUploadedVideos((prevFiles) => [...prevFiles, ...videoFiles]);
			setFileErrors(errors);
		}
	};

	const handleRemoveFile = (
		type: "image" | "audio" | "video",
		index: number
	) => {
		let updatedFiles: File[] = [];
		let updatedPreviews: string[] = [];

		switch (type) {
			case "image":
				updatedFiles = [...uploadedImages];
				updatedFiles.splice(index, 1);
				setUploadedImages(updatedFiles);

				updatedPreviews = [...imagePreviews];
				updatedPreviews.splice(index, 1);
				setImagePreviews(updatedPreviews);
				break;
			case "audio":
				updatedFiles = [...uploadedAudios];
				updatedFiles.splice(index, 1);
				setUploadedAudios(updatedFiles);

				updatedPreviews = [...audioPreviews];
				updatedPreviews.splice(index, 1);
				setAudioPreviews(updatedPreviews);
				break;
			case "video":
				updatedFiles = [...uploadedVideos];
				updatedFiles.splice(index, 1);
				setUploadedVideos(updatedFiles);

				updatedPreviews = [...videoPreviews];
				updatedPreviews.splice(index, 1);
				setVideoPreviews(updatedPreviews);
				break;
			default:
				break;
		}
	};

	return {
		uploadedImages,
		uploadedAudios,
		uploadedVideos,
		imagePreviews,
		audioPreviews,
		videoPreviews,
		fileErrors,
		handleFileChange,
		handleRemoveFile,
	};
};
