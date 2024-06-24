export type MemoryValues = {
	kid: string;
	title: string;
	description: string;
	year: number;
	month?: string;
	day?: number;
	file_paths: Files[];
	urls: URLs[];
};

export type Files = {
	id: number;
	file_type: string;
	file_path: string;
};

export type URLs = {
	id: number;
	url_address: string;
};
