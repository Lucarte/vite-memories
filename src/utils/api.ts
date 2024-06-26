import http from "./http";

// MEMORIES
export const getAllMemories = async () => {
	await new Promise((resolve) => setTimeout(resolve, 3000));

	try {
		const res = await http.get("/api/auth/memories");

		if (res.status !== 200) {
			throw new Error("Failed to fetch memories");
		}

		return res.data.Memories || [];
	} catch (error) {
		console.error("Error fetching memories:", error);
		throw error; // This will be caught by react-router-dom and trigger the errorElement
	}
};

// CREATE MEMORY
export const postMemory = async (formData: FormData) => {
	try {
		await new Promise((resolve) => setTimeout(resolve, 3000));

		console.log("API Formdata: ", Object.fromEntries(formData));

		const res = await http.post("/api/auth/memory/create", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		if (res.status !== 200) {
			throw new Error(`Failed to create memory: ${res.statusText}`);
		}

		return res.data || [];
	} catch (error) {
		console.error("Error creating memory:", error);
		throw error;
	}
};
