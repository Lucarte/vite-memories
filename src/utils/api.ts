import http from "./http";

// LOGIN
export const login = async (formData: FormData) => {
	const xsrfToken = await http("/sanctum/csrf-cookie");
	const res = await http.post("api/auth/login", formData, xsrfToken);
	if (res.status !== 200) throw res;
	return res.data;
};

// MEMORIES
export const getAllMemories = async () => {
	const res = await http("/api/auth/memories");

	if (res.status !== 200) throw res;

	return res.data.Memories || [];
};

// LOGIN STATUS
export const isLoggedIn = async () => {
	try {
		const res = await http("/api/auth/login/status");
		// console.log("Response from login status API:", res); // Debugging log

		const data = res.data;
		// console.log("Parsed data:", data); // Debugging log

		// Check if loggedIn is true and userId is present
		if (data && data.loggedIn && data.userId) {
			console.log("User is logged in");
			return { loggedIn: true, isAdmin: data.isAdmin };
		}

		console.log("User is not logged in");
		return { loggedIn: false, isAdmin: false };
	} catch (error) {
		console.error("Error checking login status:", error);
		return { loggedIn: false, isAdmin: false };
	}
};

// CREATE MEMORY
export const postMemory = async (formData: FormData) => {
	const res = await http.post("/api/auth/memory/create", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	if (res.status !== 201) {
		throw new Error(`Failed to create memory`);
	}

	return res.data || [];
};

export const logout = async () => {
	const res = await http.post("/api/auth/logout");

	if (res.status !== 200) throw res;

	return res.data;
};

// DELETE MEMORY
export const deleteMemory = async (title: string) => {
	await new Promise((resolve) => setTimeout(resolve, 3000));

	const res = await http.delete(`/api/auth/memories/${title}`);

	if (res.status !== 200) throw res;

	return res.data;
};
