export type MemoryValues = {
	id: number;
	kid: string;
	title: string;
	description: string;
	year: number;
	month?: string;
	day?: number;
	created_at: string;
	updated_at: string;
	user_id: number;
	files: File[];
	urls: { id: number; url_address: string }[];
};

export type File = {
	id: number;
	file_path: string;
	file_data: string;
};
