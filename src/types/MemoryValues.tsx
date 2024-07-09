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
	urls: URLs;
	category_ids: string[];
	message: string;
	user: User;
	intent: string;
};

export type MemoryFile = {
	id: number;
	file_path: string;
	file_data: string;
	preview: string;
};

export type URLs = {
	id: number;
	url_address: string;
};

export type Preview = {
	url: string;
	name: string;
};

export type User = {
	first_name: string;
	last_name: string;
	avatar: Avatar;
};

type Avatar = {
	avatar_path: string;
};

export type PatchValues = {
	id: number;
	kid: string;
	title: string;
	year: number;
	month?: string;
	day?: number;
	description: string;
	category_ids: string[];
	intent: string;
};
