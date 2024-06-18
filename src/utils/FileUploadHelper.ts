import React from "react";

export const handleFileUpload = (
	e: React.ChangeEvent<HTMLInputElement>,
	setUploadedFile: React.Dispatch<File | null>,
	setAvatarPreview: React.Dispatch<string | null>
) => {
	const file = e.target.files && e.target.files[0];
	if (file) {
		setUploadedFile(file);
		setAvatarPreview(URL.createObjectURL(file));
	}
};
