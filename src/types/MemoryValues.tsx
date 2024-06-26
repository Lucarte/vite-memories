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
	files: MemoryFile[];
	urls: { id: number; url_address: string }[];
	category_ids: string[];
	message: string;
};

export type MemoryFile = {
	id: number;
	file_path: string;
	file_data: string;
	preview: string;
};
