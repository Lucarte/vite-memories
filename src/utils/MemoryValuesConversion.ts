import { MemoryFile, MemoryValues, User } from "../types/MemoryValues";

export const formDataToMemoryValues = (formData: FormData): MemoryValues => {
	const memoryFiles = JSON.parse(
		formData.get("files") as string
	) as MemoryFile[]; // assuming `files` is a JSON string
	const urls = JSON.parse(formData.get("urls") as string) as {
		id: number;
		url_address: string;
	}[]; // assuming `urls` is a JSON string
	const user = JSON.parse(formData.get("user") as string) as User; // assuming `user` is a JSON string

	// Extract year, month, and day from formData
	const year = parseInt(formData.get("year") as string, 10);
	const month = formData.get("month") as string;
	const day = formData.get("day")
		? parseInt(formData.get("day") as string, 10)
		: undefined;

	return {
		id: parseInt(formData.get("id") as string, 10),
		kid: formData.get("kid") as string,
		title: formData.get("title") as string,
		description: formData.get("description") as string,
		year: year,
		month: month,
		day: day,
		created_at: formData.get("created_at") as string,
		updated_at: formData.get("updated_at") as string,
		user_id: parseInt(formData.get("user_id") as string, 10),
		files: memoryFiles,
		urls: urls,
		category_ids: formData.getAll("category_ids") as string[],
		message: formData.get("message") as string,
		user: user,
		intent: formData.get("intent") as string,
		// Format memory_date as YYYY-MM-DD
		memory_date: `${year}-${String(month).padStart(2, "0")}-${String(
			day
		).padStart(2, "0")}`,
	};
};
