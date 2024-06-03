import React from "react";

export const handleFileUpload = (
	e: React.ChangeEvent<HTMLInputElement>,
	setUploadedFile: React.Dispatch<React.SetStateAction<File | null>>,
	setAvatarURL: React.Dispatch<React.SetStateAction<string>>
) => {
	const file = e.target.files && e.target.files[0];
	if (file) {
		setUploadedFile(file);
		setAvatarURL(URL.createObjectURL(file));
	}
};
