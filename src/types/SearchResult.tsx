export type SearchResult = {
	id: number;
	title: string;
	description: string;
	year: number;
	month?: string;
	day?: number;
	kid: string;
	user: {
		id: number;
		first_name: string;
		last_name: string;
		avatar: {
			avatar_path: string;
		};
	};
	categories: Array<{
		id: number;
		category: string;
	}>;
	files: Array<{
		id: number;
		file_path: string;
	}>;
	urls: Array<{
		id: number;
		url_address: string;
	}>;
	created_at: string;
	updated_at: string;
};
